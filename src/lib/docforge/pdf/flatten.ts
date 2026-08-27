import { loadPdf } from "./shared";

/** Flattens form fields (and their appearances) into static page content. */
export async function flattenPdf(buffer: Buffer): Promise<Buffer> {
  const doc = await loadPdf(buffer);
  const form = doc.getForm();
  form.flatten();
  return Buffer.from(await doc.save());
}
