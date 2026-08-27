export class HeadlessBrowserUnavailableError extends Error {
  constructor() {
    super(
      "HTML to PDF requires a headless Chromium instance (via Playwright or " +
        "Puppeteer) to render CSS/JS faithfully — that dependency is too heavy " +
        "for a default install here. Run `npm install playwright && npx " +
        "playwright install chromium` on the processing worker to enable this " +
        "route; see README ‘Deployment’."
    );
    this.name = "HeadlessBrowserUnavailableError";
  }
}

/**
 * Renders HTML to PDF using Playwright's headless Chromium, if the optional
 * dependency has been installed on this host. Playwright is intentionally
 * NOT in package.json's default dependencies (it downloads a full Chromium
 * binary, ~300MB, which is a poor default for a template project) — install
 * it on the environment that will actually run this route.
 */
export async function htmlToPdf(html: string): Promise<Buffer> {
  let chromium: any;
  try {
    const loadOptionalModule = new Function("modulePath", "return import(modulePath)") as (modulePath: string) => Promise<any>;
    ({ chromium } = await loadOptionalModule("playwright"));
  } catch {
    throw new HeadlessBrowserUnavailableError();
  }

  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle" });
    const pdfBytes = await page.pdf({ format: "A4", printBackground: true, margin: { top: "20mm", bottom: "20mm", left: "16mm", right: "16mm" } });
    return Buffer.from(pdfBytes);
  } finally {
    await browser.close();
  }
}
