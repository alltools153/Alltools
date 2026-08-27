import { NextRequest, NextResponse } from "next/server";
import archiver from "archiver";
import { PassThrough } from "stream";
import { createJob, writeJobFile } from "../files/temporary-storage";
import { withJobCleanup } from "../files/cleanup";
import { ValidationError, validateBatchSize, validateUpload } from "../files/validation";

export interface ProcessedFile {
  filename: string;
  bytes: Buffer;
  contentType: string;
}

export type OperationHandler = (ctx: {
  files: Array<{ buffer: Buffer; name: string }>;
  fields: Record<string, string>;
}) => Promise<ProcessedFile | ProcessedFile[]>;

export interface RouteOptions {
  accept: string[]; // e.g. ["pdf"]
  multiple?: boolean;
}

const CONTENT_TYPES: Record<string, string> = {
  pdf: "application/pdf",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  txt: "text/plain; charset=utf-8",
  jpg: "image/jpeg",
  png: "image/png",
  zip: "application/zip",
  html: "text/html; charset=utf-8"
};

export function contentTypeFor(ext: string): string {
  return CONTENT_TYPES[ext.toLowerCase()] || "application/octet-stream";
}

/**
 * Wraps a single processing operation with: multipart parsing, upload
 * validation, a job-scoped temp directory that's always cleaned up, uniform
 * error responses, and (when the handler returns more than one file)
 * automatic zipping. Individual /api/**\/route.ts files stay tiny and just
 * describe *what* they accept and *which* lib function does the work.
 */
export function createFileHandler(operation: OperationHandler, options: RouteOptions) {
  return async function POST(req: NextRequest) {
    const job = await createJob();
    return withJobCleanup(job, async () => {
      try {
        const form = await req.formData();
        const uploads = form.getAll("files").filter((v): v is File => v instanceof File);

        if (!options.multiple && uploads.length > 1) {
          throw new ValidationError("This tool accepts a single file.");
        }
        validateBatchSize(uploads.length);

        const files: Array<{ buffer: Buffer; name: string }> = [];
        for (const upload of uploads) {
          const validated = await validateUpload(upload, options.accept as any);
          await writeJobFile(job, upload.name, validated.buffer);
          files.push({ buffer: validated.buffer, name: upload.name });
        }

        const fields: Record<string, string> = {};
        for (const [key, value] of Array.from(form.entries())) {
          if (typeof value === "string") fields[key] = value;
        }

        const result = await operation({ files, fields });
        const outputs = Array.isArray(result) ? result : [result];

        if (outputs.length === 0) {
          return jsonError("The operation produced no output file.", 500);
        }

        if (outputs.length === 1) {
          const [file] = outputs;
          return new NextResponse(file.bytes as unknown as BodyInit, {
            status: 200,
            headers: {
              "Content-Type": file.contentType,
              "Content-Disposition": `attachment; filename="${encodeURIComponent(file.filename)}"`,
              "X-DocForge-Retention": "temporary-deleted-after-response"
            }
          });
        }

        const zipBuffer = await zipFiles(outputs);
        return new NextResponse(zipBuffer as unknown as BodyInit, {
          status: 200,
          headers: {
            "Content-Type": "application/zip",
            "Content-Disposition": `attachment; filename="docforge-output.zip"`,
            "X-DocForge-Retention": "temporary-deleted-after-response"
          }
        });
      } catch (err) {
        return errorToResponse(err);
      }
    });
  };
}

function errorToResponse(err: unknown): NextResponse {
  if (err instanceof ValidationError) {
    return jsonError(err.message, 400);
  }
  if (err instanceof Error) {
    // Known, user-facing operational errors (wrong password, missing native
    // binary, corrupted file, etc.) — message is already safe to show.
    return jsonError(err.message, 422);
  }
  return jsonError("The document could not be processed.", 500);
}

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

async function zipFiles(files: ProcessedFile[]): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const archive = archiver("zip", { zlib: { level: 9 } });
    const stream = new PassThrough();
    const chunks: Buffer[] = [];

    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    archive.on("error", reject);

    archive.pipe(stream);
    for (const file of files) {
      archive.append(file.bytes, { name: file.filename });
    }
    archive.finalize();
  });
}
