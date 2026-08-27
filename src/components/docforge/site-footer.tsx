import Link from "next/link";
import { CATEGORIES, toolsByCategory } from "@/lib/docforge/tools-config";

export function SiteFooter() {
  return (
    <footer className="border-t border-paper-200 bg-paper-100/60 dark:border-ink-700 dark:bg-ink-900/60">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map((category) => (
            <div key={category}>
              <h3 className="font-mono text-xs uppercase tracking-wider text-ink-600 dark:text-paper-200/60">{category}</h3>
              <ul className="mt-3 space-y-2">
                {toolsByCategory(category).slice(0, 6).map((tool) => (
                  <li key={tool.slug}>
                    <Link href={`/${tool.slug}`} className="text-sm text-ink-700 hover:text-forge-600 focus-ring dark:text-paper-200/80 dark:hover:text-forge-400">
                      {tool.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-paper-200 pt-6 text-xs text-ink-600 dark:border-ink-700 dark:text-paper-200/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Your files are processed securely and temporary files are automatically removed after processing.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <p>© {new Date().getFullYear()} DocForge. Not affiliated with any other document tool.</p>
            <span className="hidden sm:inline">•</span>
            <p>Made with ❤️ by Saikat</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
