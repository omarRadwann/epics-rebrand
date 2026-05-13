/**
 * SpecimenHeader — typographic ribbon at the top of every product/recipe page.
 * Mono, UPPERCASE, +12% tracking, hairline rules above and below.
 *
 * Fields are key-value pairs displayed inline with dot separators.
 */
interface SpecimenField {
  label: string;
  value: string;
}

interface Props {
  fields: SpecimenField[];
  className?: string;
}

export function SpecimenHeader({ fields, className = "" }: Props) {
  return (
    <div
      className={`border-y border-ink/40 py-3 ${className}`}
      role="note"
      aria-label="Specimen header"
    >
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-x-6 gap-y-1 px-6 sm:px-12 lg:px-24">
        {fields.map((f, i) => (
          <span key={i} className="specimen-lot">
            <span className="opacity-60">{f.label.toUpperCase()}</span>{" "}
            <span>{f.value.toUpperCase()}</span>
            {i < fields.length - 1 && <span className="ml-6 opacity-40">·</span>}
          </span>
        ))}
      </div>
    </div>
  );
}
