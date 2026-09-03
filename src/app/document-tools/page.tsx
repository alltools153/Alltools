import { ToolSearch } from "@/components/docforge/tool-search";
import { QuickUploadPicker } from "@/components/docforge/quick-upload-picker";
import { ToolGrid } from "@/components/docforge/tool-grid";
import ToolSeoFooter from "@/components/seo/ToolSeoFooter";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink-950">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(60% 50% at 15% 10%, rgba(109,90,230,0.35), transparent), radial-gradient(45% 40% at 90% 30%, rgba(51,194,169,0.20), transparent)"
          }}
        />
        {/* Signature: a faint blueprint grid + a stack of "pages" the hero copy sits inside — the one bold move on the page. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }}
        />

        <div className="relative mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 sm:py-32 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-paper-50/15 px-3 py-1 font-mono text-xs uppercase tracking-wider text-paper-100/70">
            No account. No stored files.
          </span>
          <h1 className="mt-6 text-balance font-display text-4xl font-medium italic text-paper-50 sm:text-6xl">
            Everything you need for PDFs.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-balance text-lg text-paper-100/75">
            Convert, compress, merge, split, edit, and manage your documents in one place.
          </p>

          <div className="mx-auto mt-9 max-w-xl">
            <ToolSearch />
          </div>

          <QuickUploadPicker />

          <p className="mt-6 text-center text-sm text-paper-100/50">
            or pick a tool below, then drag &amp; drop your file
          </p>

          <p className="mt-10 text-xs text-paper-100/45">
            Your files are processed securely and temporary files are automatically removed after processing.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-12">
        <ToolGrid />
        <ToolSeoFooter toolSlug="compress-pdf" />
      </section>
    </>
  );
}
