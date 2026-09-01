export type OptionField =
  | { type: "text"; name: string; label: string; placeholder?: string; defaultValue?: string; help?: string }
  | { type: "password"; name: string; label: string; help?: string }
  | { type: "number"; name: string; label: string; defaultValue?: number; min?: number; max?: number }
  | { type: "select"; name: string; label: string; options: Array<{ value: string; label: string }>; defaultValue?: string }
  | { type: "checkbox"; name: string; label: string; defaultValue?: boolean }
  | { type: "page-range"; name: string; label: string; help?: string };

/**
 * Declarative per-tool option schema. The generic <SettingsPanel> renders
 * whatever fields a tool declares here and reports their values back as a
 * flat string map that gets appended to the upload FormData — this is what
 * lets every tool page share one workspace component instead of hand-built
 * forms per tool (see project brief §7, "Reusable Tool System").
 */
export const TOOL_OPTIONS: Record<string, OptionField[]> = {
  "rotate-pdf": [
    { type: "select", name: "amount", label: "Rotate", defaultValue: "90", options: [
      { value: "90", label: "90° clockwise" },
      { value: "-90", label: "90° counter-clockwise" },
      { value: "180", label: "180°" }
    ]},
    { type: "page-range", name: "pages", label: "Pages (leave blank for all)" }
  ],
  "crop-pdf": [
    { type: "number", name: "top", label: "Top margin (pt)", defaultValue: 0, min: 0 },
    { type: "number", name: "right", label: "Right margin (pt)", defaultValue: 0, min: 0 },
    { type: "number", name: "bottom", label: "Bottom margin (pt)", defaultValue: 0, min: 0 },
    { type: "number", name: "left", label: "Left margin (pt)", defaultValue: 0, min: 0 },
    { type: "page-range", name: "pages", label: "Pages (leave blank for all)" }
  ],
  "extract-pages": [{ type: "page-range", name: "pages", label: "Pages to extract", help: "e.g. 1,2,5-8" }],
  "delete-pages": [{ type: "page-range", name: "pages", label: "Pages to delete", help: "e.g. 1,2,5-8" }],
  "watermark-pdf": [
    { type: "select", name: "kind", label: "Watermark type", defaultValue: "text", options: [
      { value: "text", label: "Text" },
      { value: "image", label: "Image (upload a second file below)" }
    ]},
    { type: "text", name: "text", label: "Text", defaultValue: "CONFIDENTIAL" },
    { type: "number", name: "fontSize", label: "Font size", defaultValue: 48, min: 8, max: 200 },
    { type: "number", name: "opacity", label: "Opacity (0–1)", defaultValue: 0.25, min: 0.05, max: 1 },
    { type: "number", name: "rotation", label: "Rotation (degrees)", defaultValue: 45, min: -180, max: 180 },
    { type: "select", name: "position", label: "Position", defaultValue: "center", options: [
      { value: "center", label: "Center" },
      { value: "top-left", label: "Top left" },
      { value: "top-center", label: "Top center" },
      { value: "top-right", label: "Top right" },
      { value: "bottom-left", label: "Bottom left" },
      { value: "bottom-center", label: "Bottom center" },
      { value: "bottom-right", label: "Bottom right" }
    ]}
  ],
  "add-page-numbers": [
    { type: "select", name: "position", label: "Position", defaultValue: "bottom-center", options: [
      { value: "top-left", label: "Top left" }, { value: "top-center", label: "Top center" }, { value: "top-right", label: "Top right" },
      { value: "bottom-left", label: "Bottom left" }, { value: "bottom-center", label: "Bottom center" }, { value: "bottom-right", label: "Bottom right" }
    ]},
    { type: "number", name: "startAt", label: "Starting number", defaultValue: 1, min: 1 },
    { type: "select", name: "format", label: "Format", defaultValue: "number", options: [
      { value: "number", label: "1" },
      { value: "page-n", label: "Page 1" },
      { value: "page-n-of-total", label: "Page 1 of 10" }
    ]}
  ],
  "protect-pdf": [
    { type: "password", name: "openPassword", label: "Open password", help: "Required to open the file" },
    { type: "password", name: "permissionPassword", label: "Permission password", help: "Optional — controls printing/copying/editing" },
    { type: "checkbox", name: "disallowPrinting", label: "Disallow printing" },
    { type: "checkbox", name: "disallowCopying", label: "Disallow copying text/images" },
    { type: "checkbox", name: "disallowModification", label: "Disallow editing" }
  ],
  "unlock-pdf": [{ type: "password", name: "password", label: "Current password" }],
  "reorder-pages": [{ type: "text", name: "order", label: "New page order", placeholder: "1,3,2,4", help: "Use 1-based page numbers in the order you want" }],
  "compress-pdf": [
    { type: "select", name: "mode", label: "Compression", defaultValue: "recommended", options: [
      { value: "recommended", label: "Recommended" },
      { value: "strong", label: "Strong compression" },
      { value: "maximum", label: "Maximum compression" }
    ]}
  ],
  "pdf-to-jpg": [{ type: "page-range", name: "pages", label: "Pages (leave blank for all)" }],
  "pdf-to-png": [{ type: "page-range", name: "pages", label: "Pages (leave blank for all)" }],
  "ocr-pdf": [
    { type: "select", name: "language", label: "Language", defaultValue: "eng", options: [
      { value: "eng", label: "English" }, { value: "hin", label: "Hindi" }, { value: "ben", label: "Bengali" }
    ]},
    { type: "select", name: "outputFormat", label: "Output", defaultValue: "pdf", options: [
      { value: "pdf", label: "Searchable PDF" }, { value: "txt", label: "TXT" }, { value: "docx", label: "Word" }
    ]}
  ],
  "image-to-text": [{ type: "select", name: "language", label: "Language", defaultValue: "eng", options: [
    { value: "eng", label: "English" }, { value: "hin", label: "Hindi" }, { value: "ben", label: "Bengali" }
  ]}],
  "scan-to-pdf": [{ type: "select", name: "language", label: "OCR language", defaultValue: "eng", options: [
    { value: "eng", label: "English" }, { value: "hin", label: "Hindi" }, { value: "ben", label: "Bengali" }
  ]}]
};

export function optionsForTool(slug: string): OptionField[] {
  return TOOL_OPTIONS[slug] || [];
}
