/**
 * Editorial journal — long-form pieces published at /journal/[slug].
 * Voice: precise, archival, never decorative. Numbers up front when relevant.
 *
 * Format: a code (J-NNN), a title, a date, a read time, a one-line dek,
 * the byline, and the body as an ordered list of paragraphs and pull-quotes.
 */

export type JournalBlock =
  | { kind: "p"; text: string }
  | { kind: "pull"; text: string; attr?: string }
  | { kind: "h"; text: string }
  | { kind: "list"; items: string[] };

export type JournalEntry = {
  slug: string;
  code: string;
  title: string;
  dek: string;
  date: string;
  read: string;
  byline: string;
  category: "PKU" | "Process" | "Certification" | "Design";
  body: JournalBlock[];
};

export const journal: JournalEntry[] = [
  {
    slug: "phenylalanine-in-milligrams",
    code: "J-001",
    title: "Why we list phenylalanine in milligrams.",
    dek: "On the difference between a chemist's unit and an operative one.",
    date: "12 OCT 2026",
    read: "4 min",
    byline: "EPICS · METHOD BOOK",
    category: "PKU",
    body: [
      {
        kind: "p",
        text: "The standard convention on a nutrition label is to publish protein in grams, and where relevant, phenylalanine as a percentage of total protein or in milligrams per 100 grams of product. This is the chemist's unit. It is the unit a regulatory body wants, and it is the unit a factory laboratory measures.",
      },
      {
        kind: "p",
        text: "It is not the unit a parent uses at 6:30 in the morning, packing a school lunch for an eight-year-old whose daily allowance is 280 milligrams of phenylalanine.",
      },
      {
        kind: "pull",
        text: "A parent rations by piece. The chemist's label rations by mass. The translation is not difficult, but it is the kind of translation that happens at 6:30 in the morning under fluorescent lights, and that is exactly the time it is most likely to go wrong.",
      },
      {
        kind: "p",
        text: "So we publish two columns. Phenylalanine per 100 grams of product (the chemist's column, which we are obliged to publish and which we publish accurately), and phenylalanine per piece — per flatbread, per cookie, per ladle of pasta cooked from one full sachet.",
      },
      {
        kind: "p",
        text: "The per-piece value is the worst-case for the lot. We measure phenylalanine across multiple samples from the same production batch and we publish the highest single value, not the mean. If the lot tests at 0.9, 1.0, 1.0, 1.1, and 1.2 milligrams per flatbread, we print 1.2 on the package. A parent rationing against an allowance does not want to discover the mean was generous.",
      },
      {
        kind: "h",
        text: "On rounding.",
      },
      {
        kind: "p",
        text: "We round up to one decimal place. We do not round phenylalanine values to whole numbers and we do not round down under any circumstance. A 0.6 milligram value is printed as 0.6. A 1.18 value is printed as 1.2.",
      },
      {
        kind: "p",
        text: "This is not standard. We adopted it after a conversation with a metabolic dietitian at Cairo University Hospital who showed us a household spreadsheet a mother was keeping — fifteen columns, ten rows of weekly menus, totals at the bottom — and pointed out, mildly, that every entry on it was a whole number because that was what the packaging gave her.",
      },
      {
        kind: "p",
        text: "She was rounding her child's daily allowance to a whole number, against packaging that had already been rounded to a whole number. The compounded inaccuracy was, on a bad week, 11 milligrams. Which is a slice of bread.",
      },
      {
        kind: "p",
        text: "We changed our labels the next month.",
      },
    ],
  },
  {
    slug: "the-lot-number-is-the-warranty",
    code: "J-002",
    title: "The lot number is the warranty.",
    dek: "What an eight-character code on the back of a paper bag actually does.",
    date: "28 SEP 2026",
    read: "3 min",
    byline: "EPICS · METHOD BOOK",
    category: "Process",
    body: [
      {
        kind: "p",
        text: "Every package that leaves our factory carries a lot number, printed in monospaced type on the back panel. It is eight characters long. The first two are the production week. The middle two are the year. The last four identify the run.",
      },
      {
        kind: "p",
        text: "If you photograph the lot number and email it to us, we can tell you the mill batch the flour came from, the date the package was filled, the line operator who signed off, and the result of the post-production phenylalanine assay if you bought a Crystal product.",
      },
      {
        kind: "pull",
        text: "A lot number is a warranty written in the only language we will both trust later — yours, in our handwriting.",
      },
      {
        kind: "p",
        text: "If a lot is recalled — which has happened twice in our history, both times for taste, never for safety — we recall by lot number, not by SKU. Customers who bought a different lot of the same product are not asked to return anything.",
      },
      {
        kind: "p",
        text: "The lot number is the warranty. The package is what carries it. The rest is decoration.",
      },
    ],
  },
  {
    slug: "what-the-iso-audit-involves",
    code: "J-003",
    title: "What the ISO audit actually involves.",
    dek: "Three days of a stranger going through every binder in the building.",
    date: "14 SEP 2026",
    read: "6 min",
    byline: "EPICS · CERTIFICATION DESK",
    category: "Certification",
    body: [
      {
        kind: "p",
        text: "ISO 22000 certification is not a sticker. It is a relationship with an external auditor, renewed annually, and the audit itself is three working days during which a stranger from Bureau Veritas Egypt comes to our factory in 6th of October City and goes through every binder in the building.",
      },
      {
        kind: "h",
        text: "Day one.",
      },
      {
        kind: "p",
        text: "Documentation review. The auditor sits in our conference room and reads. Our food safety policy. Our hazard analysis and critical control point (HACCP) plan. Our prerequisite programmes — pest control, supplier approval, sanitation, allergen management, training. The shift logs from the last twelve months. The corrective action register. The internal audit reports.",
      },
      {
        kind: "p",
        text: "She asks questions. We answer. She writes things down.",
      },
      {
        kind: "h",
        text: "Day two.",
      },
      {
        kind: "p",
        text: "Floor walk. The auditor enters the production area, gowned and capped like everyone else, and we walk her through the process from receiving to packaging. She stops at every critical control point and asks the line operator — not the manager, the operator — to describe the control, the monitoring procedure, and what happens if the value goes out of spec.",
      },
      {
        kind: "p",
        text: "She pulls a random package from the warehouse and asks us to traceback. We pull up the lot record on a screen. Mill batch, supplier, milling date, intake QC results, filling date, operator, post-filling QC. Eighteen seconds.",
      },
      {
        kind: "pull",
        text: "Eighteen seconds is the metric we are most proud of. It used to be forty minutes. We re-engineered the lot tracking after our first ISO audit failed on traceability speed.",
      },
      {
        kind: "h",
        text: "Day three.",
      },
      {
        kind: "p",
        text: "Findings and exit meeting. The auditor presents observations — minor non-conformances, major non-conformances, and recommendations for improvement. We sign them. We have thirty days to submit a corrective action plan for each non-conformance.",
      },
      {
        kind: "p",
        text: "Our 2024 audit produced four minor non-conformances and no majors. The findings were: a labelling typo on a translation, two missed signatures in the cleaning log from a single weekend in March, and a temperature probe whose calibration certificate had expired by eleven days.",
      },
      {
        kind: "p",
        text: "We will publish the 2025 audit findings here in March, on whatever they turn out to be. We do not pre-edit them.",
      },
    ],
  },
  {
    slug: "no-wooden-boards",
    code: "J-004",
    title: "On not photographing food on wooden boards.",
    dek: "A small editorial decision that compounds into a brand.",
    date: "01 SEP 2026",
    read: "2 min",
    byline: "EPICS · DESIGN DESK",
    category: "Design",
    body: [
      {
        kind: "p",
        text: "When we shoot product photography for this site and for our packaging, we do not use wooden cutting boards as a background surface. We do not use marble. We do not use linen draped artfully across the corner of the frame.",
      },
      {
        kind: "p",
        text: "These are the surfaces every other food brand uses, and the reason every other food brand uses them is that they read as warm, hand-crafted, artisanal — three adjectives we are actively trying to be the opposite of.",
      },
      {
        kind: "pull",
        text: "We are a manufacturer with a laboratory. We engineer food for bodies that don't negotiate. A wooden board is the wrong opening sentence.",
      },
      {
        kind: "p",
        text: "Our products are photographed on cream-coloured paper plinths — unfinished medium-density fibreboard, sometimes a sheet of linen-textured stoneware. One side-light at thirty degrees. One soft shadow. No props. No hands in the frame.",
      },
      {
        kind: "p",
        text: "The surface texture is visible. Flour dust on the plinth. A scatter of cocoa around a tin. Crumb on cream paper. The treatment reads as documentary — a specimen photographed on a museum bench, lit so you can see what it is.",
      },
      {
        kind: "p",
        text: "We are not the rustic option. We are not the artisanal option. We are the option that publishes its lot number on the back panel and means it.",
      },
    ],
  },
];

export const journalBySlug = (slug: string) => journal.find((j) => j.slug === slug);
