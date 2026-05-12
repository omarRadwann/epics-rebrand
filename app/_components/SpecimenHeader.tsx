/**
 * The specimen header — typographic component used on every product page,
 * every recipe page, and as a label across the system. Example:
 *
 *   LOAF 03 · EUROPEAN BAKING MIX · 500G · GLUTEN-FREE · LOT 22-1138
 *
 * Reads like a museum specimen card. Always set in mono, +12% tracking, uppercase.
 * Hairline rules above and below.
 */

type Field = { label: string; value: string };

export function SpecimenHeader({ fields }: { fields: Field[] }) {
  return (
    <div className="specimen-header w-full">
      <ol className="flex flex-wrap items-baseline gap-x-3 gap-y-1 list-none m-0 p-0">
        {fields.map((f, i) => (
          <li key={i} className="flex items-baseline gap-1.5">
            <span className="specimen-lot opacity-60">{f.label}</span>
            <span className="specimen-spec">{f.value}</span>
            {i < fields.length - 1 && (
              <span aria-hidden className="specimen-spec opacity-30 ml-3">·</span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
