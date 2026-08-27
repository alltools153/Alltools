export const runtime = "nodejs";
import { createFileHandler, contentTypeFor } from "@/lib/docforge/api/handler";
import { protectPdf } from "@/lib/docforge/pdf/protect";

export const POST = createFileHandler(
  async ({ files, fields }) => {
    const bytes = await protectPdf(files[0].buffer, {
      openPassword: fields.openPassword || undefined,
      permissionPassword: fields.permissionPassword || undefined,
      disallowPrinting: fields.disallowPrinting === "true",
      disallowCopying: fields.disallowCopying === "true",
      disallowModification: fields.disallowModification === "true"
    });
    return { filename: "protected.pdf", bytes, contentType: contentTypeFor("pdf") };
  },
  { accept: ["pdf"], multiple: false }
);
