export type ToolCategory = "Convert" | "Organize" | "Optimize" | "Edit" | "Security" | "OCR";

export interface ToolConfig {
  slug: string;
  name: string;
  shortName?: string;
  category: ToolCategory;
  tagline: string;
  description: string;
  apiPath: string; // e.g. /api/pdf/merge
  accept: string[]; // input kinds, drives the dropzone's accept attr
  multiple: boolean; // can accept more than one file
  outputExt: string; // primary output extension, for the download button label
  keywords: string[]; // extra search terms beyond name/tagline
  requiresNativeBinary?: string; // if set, shown as an infra note on the tool page
}

export const TOOLS: ToolConfig[] = [
  // Convert — to PDF
  { slug: "jpg-to-pdf", name: "JPG to PDF", category: "Convert", tagline: "Turn JPG images into a PDF.", description: "Combine one or more JPG photos or scans into a single, ready-to-share PDF.", apiPath: "/api/convert/image-to-pdf", accept: [".jpg", ".jpeg"], multiple: true, outputExt: "pdf", keywords: ["image", "photo", "picture"] },
  { slug: "png-to-pdf", name: "PNG to PDF", category: "Convert", tagline: "Turn PNG images into a PDF.", description: "Combine one or more PNG images into a single, ready-to-share PDF.", apiPath: "/api/convert/image-to-pdf", accept: [".png"], multiple: true, outputExt: "pdf", keywords: ["image", "screenshot"] },
  { slug: "word-to-pdf", name: "Word to PDF", category: "Convert", tagline: "Convert DOCX files to PDF.", description: "Turn a Word document into a PDF that looks the same on every device.", apiPath: "/api/convert/word-to-pdf", accept: [".docx"], multiple: false, outputExt: "pdf", keywords: ["docx", "document"], requiresNativeBinary: "LibreOffice (soffice)" },
  { slug: "excel-to-pdf", name: "Excel to PDF", category: "Convert", tagline: "Convert XLSX spreadsheets to PDF.", description: "Turn a spreadsheet into a paginated, print-ready PDF.", apiPath: "/api/convert/excel-to-pdf", accept: [".xlsx"], multiple: false, outputExt: "pdf", keywords: ["xlsx", "spreadsheet"], requiresNativeBinary: "LibreOffice (soffice)" },
  { slug: "powerpoint-to-pdf", name: "PowerPoint to PDF", category: "Convert", tagline: "Convert PPTX slides to PDF.", description: "Turn a slide deck into a PDF for sharing or printing.", apiPath: "/api/convert/powerpoint-to-pdf", accept: [".pptx"], multiple: false, outputExt: "pdf", keywords: ["pptx", "slides", "deck", "presentation"], requiresNativeBinary: "LibreOffice (soffice)" },
  { slug: "txt-to-pdf", name: "TXT to PDF", category: "Convert", tagline: "Convert plain text to PDF.", description: "Lay out a plain-text file onto clean, paginated PDF pages.", apiPath: "/api/convert/txt-to-pdf", accept: [".txt"], multiple: false, outputExt: "pdf", keywords: ["text", "notes"] },
  { slug: "html-to-pdf", name: "HTML to PDF", category: "Convert", tagline: "Render an HTML file as PDF.", description: "Render an HTML document (with its CSS) to a print-ready PDF.", apiPath: "/api/convert/html-to-pdf", accept: [".html", ".htm"], multiple: false, outputExt: "pdf", keywords: ["webpage", "web page"], requiresNativeBinary: "Headless Chromium (Playwright)" },
  { slug: "file-converter", name: "File Converter", category: "Convert", tagline: "Convert supported files to PDF.", description: "Convert PDF, Office, image, and text files to PDF in one place.", apiPath: "/api/convert/file-converter", accept: [".pdf", ".docx", ".xlsx", ".pptx", ".jpg", ".png", ".txt"], multiple: false, outputExt: "pdf", keywords: ["convert", "format", "transform", "file"] },

  // Convert — from PDF
  { slug: "pdf-to-word", name: "PDF to Word", category: "Convert", tagline: "Convert PDF to an editable DOCX.", description: "Turn a PDF's text and structure into an editable Word document.", apiPath: "/api/convert/pdf-to-word", accept: [".pdf"], multiple: false, outputExt: "docx", keywords: ["docx", "editable"] },
  { slug: "pdf-to-excel", name: "PDF to Excel", category: "Convert", tagline: "Convert PDF tables to XLSX.", description: "Pull tabular data out of a PDF and into a spreadsheet.", apiPath: "/api/convert/pdf-to-excel", accept: [".pdf"], multiple: false, outputExt: "xlsx", keywords: ["xlsx", "spreadsheet", "table"] },
  { slug: "pdf-to-powerpoint", name: "PDF to PowerPoint", category: "Convert", tagline: "Convert PDF pages to slides.", description: "Turn each page of a PDF into a slide in a PPTX deck.", apiPath: "/api/convert/pdf-to-ppt", accept: [".pdf"], multiple: false, outputExt: "pptx", keywords: ["pptx", "slides", "deck"], requiresNativeBinary: "canvas (image rendering)" },
  { slug: "pdf-to-jpg", name: "PDF to JPG", category: "Convert", tagline: "Export PDF pages as JPG images.", description: "Turn any or all pages of a PDF into JPG images.", apiPath: "/api/convert/pdf-to-jpg", accept: [".pdf"], multiple: false, outputExt: "jpg", keywords: ["image", "export", "picture"], requiresNativeBinary: "canvas (image rendering)" },
  { slug: "pdf-to-png", name: "PDF to PNG", category: "Convert", tagline: "Export PDF pages as PNG images.", description: "Turn any or all pages of a PDF into PNG images.", apiPath: "/api/convert/pdf-to-png", accept: [".pdf"], multiple: false, outputExt: "png", keywords: ["image", "export", "picture"], requiresNativeBinary: "canvas (image rendering)" },
  { slug: "pdf-to-text", name: "PDF to TXT", category: "Convert", tagline: "Extract plain text from a PDF.", description: "Pull the selectable text out of a PDF into a plain .txt file.", apiPath: "/api/convert/pdf-to-text", accept: [".pdf"], multiple: false, outputExt: "txt", keywords: ["text", "extract"] },

  // Organize
  { slug: "merge-pdf", name: "Merge PDF", category: "Organize", tagline: "Combine PDFs into one file.", description: "Combine multiple PDFs into a single document, in the order you choose.", apiPath: "/api/pdf/merge", accept: [".pdf"], multiple: true, outputExt: "pdf", keywords: ["combine", "join", "concatenate"] },
  { slug: "split-pdf", name: "Split PDF", category: "Organize", tagline: "Split a PDF into multiple files.", description: "Split a PDF by page ranges, or pull out every page as its own file.", apiPath: "/api/pdf/split", accept: [".pdf"], multiple: false, outputExt: "zip", keywords: ["separate", "divide"] },
  { slug: "delete-pages", name: "Delete Pages", category: "Organize", tagline: "Remove pages from a PDF.", description: "Remove specific pages from a PDF and keep the rest.", apiPath: "/api/pdf/delete-pages", accept: [".pdf"], multiple: false, outputExt: "pdf", keywords: ["remove"] },
  { slug: "extract-pages", name: "Extract Pages", category: "Organize", tagline: "Pull specific pages into a new PDF.", description: "Save a subset of pages from a PDF as a new document.", apiPath: "/api/pdf/extract", accept: [".pdf"], multiple: false, outputExt: "pdf", keywords: ["pull", "save pages"] },
  { slug: "reorder-pages", name: "Reorder Pages", category: "Organize", tagline: "Change the order of PDF pages.", description: "Drag pages into a new order and save the result.", apiPath: "/api/pdf/reorder", accept: [".pdf"], multiple: false, outputExt: "pdf", keywords: ["rearrange", "order"] },
  { slug: "rotate-pdf", name: "Rotate PDF", category: "Organize", tagline: "Rotate all or selected pages.", description: "Rotate a PDF's pages 90°, 180°, or 270° — all at once or just the ones you pick.", apiPath: "/api/pdf/rotate", accept: [".pdf"], multiple: false, outputExt: "pdf", keywords: ["turn", "orientation"] },

  // Optimize
  { slug: "compress-pdf", name: "Compress PDF", category: "Optimize", tagline: "Reduce PDF file size.", description: "Shrink a PDF's file size for easier sharing and storage.", apiPath: "/api/pdf/compress", accept: [".pdf"], multiple: false, outputExt: "pdf", keywords: ["shrink", "reduce size", "optimize"], requiresNativeBinary: "Ghostscript (image recompression; falls back to structural compression without it)" },
  { slug: "repair-pdf", name: "Repair PDF", category: "Optimize", tagline: "Fix a damaged PDF.", description: "Attempt to fix a PDF that won't open correctly elsewhere.", apiPath: "/api/pdf/repair", accept: [".pdf"], multiple: false, outputExt: "pdf", keywords: ["fix", "corrupted", "broken"] },
  { slug: "flatten-pdf", name: "Flatten PDF", category: "Optimize", tagline: "Flatten form fields into page content.", description: "Turn fillable form fields into permanent, non-editable page content.", apiPath: "/api/pdf/flatten", accept: [".pdf"], multiple: false, outputExt: "pdf", keywords: ["form", "fillable"] },

  // Edit
  { slug: "watermark-pdf", name: "Watermark PDF", category: "Edit", tagline: "Add a text or image watermark.", description: "Stamp a text or image watermark across every page.", apiPath: "/api/pdf/watermark", accept: [".pdf"], multiple: false, outputExt: "pdf", keywords: ["stamp", "brand"] },
  { slug: "add-page-numbers", name: "Add Page Numbers", category: "Edit", tagline: "Number your PDF's pages.", description: "Add page numbers in the position, format, and starting number you choose.", apiPath: "/api/pdf/page-numbers", accept: [".pdf"], multiple: false, outputExt: "pdf", keywords: ["numbering", "pagination"] },
  { slug: "crop-pdf", name: "Crop PDF", category: "Edit", tagline: "Trim margins from PDF pages.", description: "Trim margins from all or selected pages.", apiPath: "/api/pdf/crop", accept: [".pdf"], multiple: false, outputExt: "pdf", keywords: ["trim", "margins"] },

  // Security
  { slug: "protect-pdf", name: "Protect PDF", category: "Security", tagline: "Add a password to a PDF.", description: "Add an open password and/or restrict printing, copying, and editing.", apiPath: "/api/pdf/protect", accept: [".pdf"], multiple: false, outputExt: "pdf", keywords: ["password", "encrypt", "lock"], requiresNativeBinary: "qpdf" },
  { slug: "unlock-pdf", name: "Unlock PDF", category: "Security", tagline: "Remove a password you know.", description: "Remove password protection from a PDF you're authorized to access.", apiPath: "/api/pdf/unlock", accept: [".pdf"], multiple: false, outputExt: "pdf", keywords: ["decrypt", "remove password"], requiresNativeBinary: "qpdf" },
  { slug: "remove-metadata", name: "Remove Metadata", category: "Security", tagline: "Strip a PDF's document properties.", description: "Clear the title, author, and other identifying document properties.", apiPath: "/api/pdf/remove-metadata", accept: [".pdf"], multiple: false, outputExt: "pdf", keywords: ["privacy", "author", "properties"] },

  // OCR
  { slug: "ocr-pdf", name: "OCR PDF", category: "OCR", tagline: "Make a scanned PDF searchable.", description: "Recognize text in a scanned PDF and get a searchable PDF, TXT, or Word file back.", apiPath: "/api/ocr/pdf", accept: [".pdf"], multiple: false, outputExt: "pdf", keywords: ["scan", "searchable", "text recognition"] },
  { slug: "image-to-text", name: "Image to Text", category: "OCR", tagline: "Extract text from an image.", description: "Recognize and extract text from a photo or scanned image.", apiPath: "/api/ocr/image", accept: [".jpg", ".jpeg", ".png"], multiple: false, outputExt: "txt", keywords: ["scan", "photo", "recognition"] },
  { slug: "scan-to-pdf", name: "Scan to PDF", category: "OCR", tagline: "Turn scanned photos into a searchable PDF.", description: "Combine one or more scanned photos into a single searchable PDF, with OCR applied.", apiPath: "/api/ocr/scan-to-pdf", accept: [".jpg", ".jpeg", ".png"], multiple: true, outputExt: "pdf", keywords: ["scan", "camera", "searchable"] }
];

export const CATEGORIES: ToolCategory[] = ["Convert", "Organize", "Optimize", "Edit", "Security", "OCR"];

export function getToolBySlug(slug: string): ToolConfig | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

export function toolsByCategory(category: ToolCategory): ToolConfig[] {
  return TOOLS.filter((t) => t.category === category);
}

export function searchTools(query: string): ToolConfig[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/);
  return TOOLS
    .map((tool) => {
      const haystack = [tool.name, tool.tagline, tool.category, ...tool.keywords].join(" ").toLowerCase();
      const score = terms.reduce((acc, term) => acc + (haystack.includes(term) ? 1 : 0), 0);
      return { tool, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.tool);
}
