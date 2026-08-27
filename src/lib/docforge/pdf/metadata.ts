import { loadPdf } from "./shared";

export interface PdfInfo {
  pageCount: number;
  title: string | null;
  author: string | null;
  subject: string | null;
  keywords: string | null;
  creator: string | null;
  producer: string | null;
  creationDate: string | null;
  modificationDate: string | null;
  fileSizeBytes: number;
  isEncrypted: boolean;
  pageSizes: Array<{ width: number; height: number }>;
}

export async function readPdfInfo(buffer: Buffer): Promise<PdfInfo> {
  const doc = await loadPdf(buffer);
  const pages = doc.getPages();
  return {
    pageCount: pages.length,
    title: doc.getTitle() ?? null,
    author: doc.getAuthor() ?? null,
    subject: doc.getSubject() ?? null,
    keywords: doc.getKeywords() ?? null,
    creator: doc.getCreator() ?? null,
    producer: doc.getProducer() ?? null,
    creationDate: doc.getCreationDate()?.toISOString() ?? null,
    modificationDate: doc.getModificationDate()?.toISOString() ?? null,
    fileSizeBytes: buffer.byteLength,
    isEncrypted: doc.isEncrypted,
    pageSizes: pages.map((p) => ({ width: p.getWidth(), height: p.getHeight() }))
  };
}

/** Strips identifying metadata from a PDF. */
export async function removeMetadata(buffer: Buffer): Promise<Buffer> {
  const doc = await loadPdf(buffer);
  doc.setTitle("");
  doc.setAuthor("");
  doc.setSubject("");
  doc.setKeywords([]);
  doc.setProducer("");
  doc.setCreator("");
  return Buffer.from(await doc.save());
}
