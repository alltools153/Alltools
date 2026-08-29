import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
import "pdfjs-dist/legacy/build/pdf.worker.mjs";

export type ImageFormat = "jpg" | "png";

export interface PageImage {
  page: number;
  bytes: Buffer;
}

/**
 * Rasterizes selected pages to JPG/PNG. Rendering (as opposed to text
 * extraction) needs an actual 2D canvas, so this pulls in the `canvas`
 * package — a native binary that must be installed for the platform it's
 * deployed on. It works fine on a normal Node server or Docker image; on
 * Vercel serverless it depends on their current bundled-binary support for
 * `canvas`, so treat this route as a candidate to move to the dedicated
 * processing worker described in the README if it becomes unreliable there.
 */
export async function renderPdfPagesToImages(
  buffer: Buffer,
  pageNumbers: number[],
  format: ImageFormat,
  scale = 2
): Promise<PageImage[]> {
  let createCanvas: any;
  try {
    const loadOptionalModule = new Function("modulePath", "return import(modulePath)") as (modulePath: string) => Promise<any>;
    ({ createCanvas } = await loadOptionalModule("canvas"));
  } catch {
    throw new Error(
      "Page rendering requires the `canvas` native package on the server. " +
        "See README ‘Deployment’ for install instructions."
    );
  }

  const doc = await getDocument({ data: new Uint8Array(buffer) }).promise;
  const results: PageImage[] = [];

  for (const pageNum of pageNumbers) {
    if (pageNum < 1 || pageNum > doc.numPages) continue;
    const page = await doc.getPage(pageNum);
    const viewport = page.getViewport({ scale });
    const canvas = createCanvas(viewport.width, viewport.height);
    const context = canvas.getContext("2d");

    await page.render({ canvasContext: context as any, viewport }).promise;

    const bytes = format === "png" ? canvas.toBuffer("image/png") : canvas.toBuffer("image/jpeg", { quality: 0.92 });
    results.push({ page: pageNum, bytes });
  }

  return results;
}

export async function getPdfPageCount(buffer: Buffer): Promise<number> {
  const doc = await getDocument({ data: new Uint8Array(buffer) }).promise;
  return doc.numPages;
}
