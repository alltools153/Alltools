"use client";

import type { OptionField } from "@/lib/docforge/tool-options";

interface Props {
  fields: OptionField[];
  values: Record<string, string>;
  onChange: (name: string, value: string) => void;
}

/** Renders whatever option fields a tool declares (see lib/tool-options.ts). */
export function SettingsPanel({ fields, values, onChange }: Props) {
  if (fields.length === 0) return null;

  return (
    <div className="space-y-4 rounded-2xl border border-paper-200 bg-white p-5 dark:border-ink-700 dark:bg-ink-800">
      <h3 className="font-medium text-ink-900 dark:text-paper-50">Options</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {fields.map((field) => (
          <FieldControl key={field.name} field={field} value={values[field.name]} onChange={(v) => onChange(field.name, v)} />
        ))}
      </div>
    </div>
  );
}

function FieldControl({ field, value, onChange }: { field: OptionField; value: string | undefined; onChange: (v: string) => void }) {
  const labelId = `field-${field.name}`;

  if (field.type === "checkbox") {
    return (
      <label className="flex items-center gap-2 text-sm text-ink-800 dark:text-paper-100">
        <input
          type="checkbox"
          checked={value === "true"}
          onChange={(e) => onChange(String(e.target.checked))}
          className="h-4 w-4 rounded border-ink-900/20 text-forge-600 focus-ring"
        />
        {field.label}
      </label>
    );
  }

  if (field.type === "select") {
    return (
      <div>
        <label htmlFor={labelId} className="mb-1 block text-sm text-ink-700 dark:text-paper-200/80">{field.label}</label>
        <select
          id={labelId}
          value={value ?? field.defaultValue}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-ink-900/15 bg-white px-3 py-2 text-sm text-ink-900 focus-ring dark:border-paper-100/15 dark:bg-ink-900 dark:text-paper-50"
        >
          {field.options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    );
  }

  if (field.type === "page-range") {
    return (
      <div className="sm:col-span-2">
        <label htmlFor={labelId} className="mb-1 block text-sm text-ink-700 dark:text-paper-200/80">{field.label}</label>
        <input
          id={labelId}
          type="text"
          inputMode="text"
          placeholder="e.g. 1,2,5-8"
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-ink-900/15 bg-white px-3 py-2 font-mono text-sm text-ink-900 focus-ring dark:border-paper-100/15 dark:bg-ink-900 dark:text-paper-50"
        />
        {field.help && <p className="mt-1 text-xs text-ink-600 dark:text-paper-200/50">{field.help}</p>}
      </div>
    );
  }

  if (field.type === "password") {
    return (
      <div>
        <label htmlFor={labelId} className="mb-1 block text-sm text-ink-700 dark:text-paper-200/80">{field.label}</label>
        <input
          id={labelId}
          type="password"
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          autoComplete="new-password"
          className="w-full rounded-lg border border-ink-900/15 bg-white px-3 py-2 text-sm text-ink-900 focus-ring dark:border-paper-100/15 dark:bg-ink-900 dark:text-paper-50"
        />
        {field.help && <p className="mt-1 text-xs text-ink-600 dark:text-paper-200/50">{field.help}</p>}
      </div>
    );
  }

  if (field.type === "number") {
    return (
      <div>
        <label htmlFor={labelId} className="mb-1 block text-sm text-ink-700 dark:text-paper-200/80">{field.label}</label>
        <input
          id={labelId}
          type="number"
          min={field.min}
          max={field.max}
          value={value ?? String(field.defaultValue ?? "")}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-ink-900/15 bg-white px-3 py-2 font-mono text-sm text-ink-900 focus-ring dark:border-paper-100/15 dark:bg-ink-900 dark:text-paper-50"
        />
      </div>
    );
  }

  return (
    <div>
      <label htmlFor={labelId} className="mb-1 block text-sm text-ink-700 dark:text-paper-200/80">{field.label}</label>
      <input
        id={labelId}
        type="text"
        placeholder={field.placeholder}
        value={value ?? field.defaultValue ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-ink-900/15 bg-white px-3 py-2 text-sm text-ink-900 focus-ring dark:border-paper-100/15 dark:bg-ink-900 dark:text-paper-50"
      />
      {field.help && <p className="mt-1 text-xs text-ink-600 dark:text-paper-200/50">{field.help}</p>}
    </div>
  );
}
