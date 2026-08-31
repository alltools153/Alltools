import { rgb, StandardFonts, degrees } from "pdf-lib";
import { loadPdf } from "./shared";
import { sanitizeForPdf, drawSafeText, safeWidthOfTextAtSize } from "../pdfSanitizer";

export interface TextWatermarkOptions {
  kind: "text";
  text: string;
  fontSize?: number;
  opacity?: number; // 0-1
  rotationDegrees?: number;
  color?: { r: number; g: number; b: number }; // 0-1 each
  position?:
    | "center"
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
}

export interface ImageWatermarkOptions {
  kind: "image";
  imageBuffer: Buffer;
  imageType: "png" | "jpg";
  opacity?: number;
  widthRatio?: number; // fraction of page width, e.g. 0.3
  position?: TextWatermarkOptions["position"];
}

export type WatermarkOptions = TextWatermarkOptions | ImageWatermarkOptions;

function positionFor(pos: string | undefined, pageW: number, pageH: number, boxW: number, boxH: number) {
  const margin = 36;
  switch (pos) {
    case "top-left":
      return { x: margin, y: pageH - boxH - margin };
    case "top-center":
      return { x: (pageW - boxW) / 2, y: pageH - boxH - margin };
    case "top-right":
      return { x: pageW - boxW - margin, y: pageH - boxH - margin };
    case "bottom-left":
      return { x: margin, y: margin };
    case "bottom-center":
      return { x: (pageW - boxW) / 2, y: margin };
    case "bottom-right":
      return { x: pageW - boxW - margin, y: margin };
    default:
      return { x: (pageW - boxW) / 2, y: (pageH - boxH) / 2 };
  }
}

export async function addWatermark(buffer: Buffer, opts: WatermarkOptions): Promise<Buffer> {
  const doc = await loadPdf(buffer);
  const pages = doc.getPages();

  if (opts.kind === "text") {
    const font = await doc.embedFont(StandardFonts.HelveticaBold);
    const fontSize = opts.fontSize ?? 48;
    const opacity = opts.opacity ?? 0.25;
    const color = opts.color ?? { r: 0.42, g: 0.35, b: 0.9 };
    const rotation = opts.rotationDegrees ?? 45;
    const cleanText = sanitizeForPdf(opts.text || "CONFIDENTIAL");
    const textWidth = safeWidthOfTextAtSize(font, cleanText, fontSize);

    for (const page of pages) {
      const { width, height } = page.getSize();
      const { x, y } = positionFor(opts.position, width, height, textWidth, fontSize);
      drawSafeText(page, cleanText, {
        x,
        y,
        size: fontSize,
        font,
        color: rgb(color.r, color.g, color.b),
        opacity,
        rotate: degrees(rotation)
      });
    }
  } else {
    const image = opts.imageType === "png" ? await doc.embedPng(opts.imageBuffer) : await doc.embedJpg(opts.imageBuffer);
    const ratio = opts.widthRatio ?? 0.3;

    for (const page of pages) {
      const { width, height } = page.getSize();
      const boxW = width * ratio;
      const scale = boxW / image.width;
      const boxH = image.height * scale;
      const { x, y } = positionFor(opts.position, width, height, boxW, boxH);
      page.drawImage(image, { x, y, width: boxW, height: boxH, opacity: opts.opacity ?? 0.5 });
    }
  }

  return Buffer.from(await doc.save());
}
