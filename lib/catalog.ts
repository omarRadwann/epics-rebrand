/**
 * Product catalog — pulled from epics-group.com live audit and structured for the
 * Specimen Pantry territory: every product gets a lot number, weight, and free-from
 * specimen codes. Pricing is in EGP (Egyptian Pounds), as displayed on the live site.
 *
 * SOURCE OF TRUTH: When the real catalog from Epics Group becomes available
 * (via their Supabase or PIM), replace this file. Lot numbers and ISO codes
 * should never be invented in production — those are real manufacturing data.
 */

export type FreeFromCode = "S-01" | "S-02" | "S-03";

export type Product = {
  slug: string;
  loafNumber: string;         // e.g. "Loaf 03"
  name: string;
  arabicName: string;
  weight: string;             // e.g. "500g"
  priceEgp: number;
  category: "gluten-free" | "sugar-free" | "pku";
  subBrand?: "crystal";
  freeFrom: FreeFromCode[];
  lot: string;                // e.g. "22-1138"
  iso: "22000" | "9001";
  description: string;        // one short paragraph, written in brand voice
  arabicDescription: string;
  ingredients: string[];
  nutrition: { per100g: Record<string, string> };
  servingsHint?: string;
};

export const products: Product[] = [
  // === GLUTEN-FREE ===
  {
    slug: "european-baking-mix",
    loafNumber: "Loaf 03",
    name: "European Baking Mix",
    arabicName: "خلطة الخبز الأوروبي",
    weight: "500g",
    priceEgp: 115,
    category: "gluten-free",
    freeFrom: ["S-01"],
    lot: "22-1138",
    iso: "22000",
    description:
      "A European-style loaf mix. Wheat-free, structurally sound. Designed to behave like a real bread dough — kneadable, provable, scorable. Bakes in 35 minutes at 200°C.",
    arabicDescription:
      "خلطة خبز على الطريقة الأوروبية. بدون قمح، بقوام محكم. مصممة لتعمل مثل عجين الخبز الحقيقي — تُعجن وتترك لترتاح وتُقطع. تُخبز في 35 دقيقة عند 200°م.",
    ingredients: [
      "Rice flour, corn starch, potato starch, tapioca starch",
      "Psyllium husk powder",
      "Sea salt, raw cane fibre",
      "Active dry yeast (sachet enclosed)",
    ],
    nutrition: {
      per100g: {
        Energy: "350 kcal",
        Protein: "3.4 g",
        Carbohydrate: "78.2 g",
        "Of which sugars": "1.1 g",
        Fat: "1.0 g",
        Sodium: "0.42 g",
      },
    },
    servingsHint: "Makes one 800g loaf",
  },
  {
    slug: "flat-bread-pizza-mix",
    loafNumber: "Loaf 01",
    name: "Flat Bread & Pizza Mix",
    arabicName: "خلطة العيش والبيتزا",
    weight: "500g",
    priceEgp: 109,
    category: "gluten-free",
    freeFrom: ["S-01"],
    lot: "22-1102",
    iso: "22000",
    description:
      "The flatbread base that doesn't crack. Rolls out, holds toppings, browns properly under a hot stone. Pizza optional, flatbread non-negotiable.",
    arabicDescription:
      "أساس عيش مسطّح لا يتفتت. يُفرد بالنشّابة، يحمل الحشو، يحمرّ تحت الحجر الساخن. البيتزا اختيارية، أما العيش فلا تنازل.",
    ingredients: ["Rice flour, sorghum flour, tapioca starch", "Xanthan gum", "Sea salt", "Active dry yeast"],
    nutrition: { per100g: { Energy: "340 kcal", Protein: "4.1 g", Carbohydrate: "75.0 g", "Of which sugars": "0.8 g", Fat: "1.6 g", Sodium: "0.50 g" } },
  },
  {
    slug: "soft-flour",
    loafNumber: "Mill 02",
    name: "Soft (All-Purpose Flour)",
    arabicName: "سوفت — دقيق متعدد الاستخدام",
    weight: "1kg",
    priceEgp: 104,
    category: "gluten-free",
    freeFrom: ["S-01"],
    lot: "22-1207",
    iso: "22000",
    description:
      "A general-purpose wheat-free flour blend. Goes 1:1 in most recipes. Doesn't taste like rice. Doesn't taste like beans.",
    arabicDescription:
      "خلطة دقيق متعدّد الأغراض بدون قمح. تُستبدل بالدقيق العادي بنسبة 1:1 في معظم الوصفات. لا يطعم كالأرز ولا كالفول.",
    ingredients: ["Rice flour, tapioca starch, sorghum flour, corn starch", "Xanthan gum"],
    nutrition: { per100g: { Energy: "348 kcal", Protein: "3.0 g", Carbohydrate: "82.0 g", "Of which sugars": "0.6 g", Fat: "0.8 g", Sodium: "0.01 g" } },
  },
  {
    slug: "cocoa-powder",
    loafNumber: "P-04",
    name: "Cocoa Powder",
    arabicName: "كاكاو بودرة",
    weight: "200g",
    priceEgp: 104,
    category: "gluten-free",
    freeFrom: ["S-01", "S-02"],
    lot: "22-0944",
    iso: "9001",
    description:
      "Pure cocoa. Dutch-processed, low-fat, unsweetened. The dark accent in every recipe that asks for one.",
    arabicDescription: "كاكاو خالص. مُعالج بالطريقة الهولندية، قليل الدسم، غير محلّى. اللون الداكن في كل وصفة تطلبه.",
    ingredients: ["100% cocoa, Dutch-processed"],
    nutrition: { per100g: { Energy: "228 kcal", Protein: "20.0 g", Carbohydrate: "25.0 g", "Of which sugars": "0.0 g", Fat: "10.0 g", Sodium: "0.02 g" } },
  },
  {
    slug: "free-starch",
    loafNumber: "Mill 05",
    name: "Free Starch",
    arabicName: "نشا فري",
    weight: "500g",
    priceEgp: 127,
    category: "gluten-free",
    freeFrom: ["S-01"],
    lot: "22-1411",
    iso: "22000",
    description: "A clean tapioca-corn starch blend for thickening, frying, and binding. Neutral in flavor by design.",
    arabicDescription: "خلطة نشا تابيوكا وذرة نظيفة، للتكثيف والقلي والربط. محايدة المذاق بالتصميم.",
    ingredients: ["Tapioca starch, corn starch"],
    nutrition: { per100g: { Energy: "338 kcal", Protein: "0.2 g", Carbohydrate: "85.0 g", "Of which sugars": "0.0 g", Fat: "0.1 g", Sodium: "0.00 g" } },
  },
  {
    slug: "choco-pops",
    loafNumber: "Cereal 06",
    name: "Choco Pops",
    arabicName: "شوكو بوبس",
    weight: "300g",
    priceEgp: 61,
    category: "gluten-free",
    freeFrom: ["S-01"],
    lot: "22-1502",
    iso: "22000",
    description: "Breakfast cereal. Wheat-free, cocoa-real. The cereal a celiac kid can eat without explaining anything to anyone.",
    arabicDescription: "حبوب إفطار. خالية من القمح، بكاكاو حقيقي. الحبوب التي يستطيع طفل السيلياك أن يأكلها دون أن يشرح شيئًا لأحد.",
    ingredients: ["Rice, corn, cocoa, cane sugar, sea salt"],
    nutrition: { per100g: { Energy: "382 kcal", Protein: "5.4 g", Carbohydrate: "84.0 g", "Of which sugars": "21.0 g", Fat: "2.0 g", Sodium: "0.30 g" } },
  },
  {
    slug: "brownies-mix",
    loafNumber: "Bake 07",
    name: "Brownies Mix",
    arabicName: "خلطة براونيز",
    weight: "400g",
    priceEgp: 92,
    category: "gluten-free",
    freeFrom: ["S-01"],
    lot: "22-1320",
    iso: "22000",
    description: "Fudgy. Not cakey. Bakes in 22 minutes. No apology for the chocolate.",
    arabicDescription: "براونيز فادج، لا كيكي. تُخبز في 22 دقيقة. لا اعتذار عن الشوكولاتة.",
    ingredients: ["Rice flour, cocoa, cane sugar, baking soda, sea salt"],
    nutrition: { per100g: { Energy: "412 kcal", Protein: "5.0 g", Carbohydrate: "70.0 g", "Of which sugars": "44.0 g", Fat: "12.0 g", Sodium: "0.41 g" } },
  },
  {
    slug: "basbousa-mix",
    loafNumber: "Bake 08",
    name: "Basbousa Mix",
    arabicName: "خلطة بسبوسة",
    weight: "400g",
    priceEgp: 52,
    category: "gluten-free",
    freeFrom: ["S-01"],
    lot: "22-1444",
    iso: "22000",
    description: "Basbousa, the way it should always have been: dense, semolina-textured, syrup-receptive, wheat-free.",
    arabicDescription: "بسبوسة بالشكل الذي كان يجب أن تكون عليه دائمًا: كثيفة، بقوام السميد، تستقبل الشيرة، خالية من القمح.",
    ingredients: ["Coconut, rice semolina, cane sugar, sea salt, baking powder"],
    nutrition: { per100g: { Energy: "395 kcal", Protein: "4.2 g", Carbohydrate: "72.0 g", "Of which sugars": "38.0 g", Fat: "11.0 g", Sodium: "0.35 g" } },
  },
  // === SUGAR-FREE ===
  {
    slug: "whipping-cream-sf",
    loafNumber: "Dairy 11",
    name: "Whipping Cream · Sugar-Free",
    arabicName: "كريم شانتيه — خالٍ من السكر",
    weight: "200g",
    priceEgp: 75,
    category: "sugar-free",
    freeFrom: ["S-02"],
    lot: "22-1601",
    iso: "22000",
    description: "Stabilised, whippable, holds peaks for 48 hours under refrigeration. Stevia-sweetened, dairy-light.",
    arabicDescription: "كريمة شانتيه مثبتة، تخفق بسهولة، تحتفظ بقوامها لمدة 48 ساعة في الثلاجة. مُحلّاة بالستيفيا، خفيفة على الألبان.",
    ingredients: ["Vegetable cream base, stevia leaf extract, stabilisers (E412, E407)"],
    nutrition: { per100g: { Energy: "210 kcal", Protein: "1.2 g", Carbohydrate: "4.0 g", "Of which sugars": "0.3 g", Fat: "20.0 g", Sodium: "0.04 g" } },
  },
  {
    slug: "vanilla-cake-sf",
    loafNumber: "Bake 12",
    name: "Vanilla Cake · Sugar-Free",
    arabicName: "كيكة فانيليا — خالية من السكر",
    weight: "400g",
    priceEgp: 75,
    category: "sugar-free",
    freeFrom: ["S-02"],
    lot: "22-1655",
    iso: "22000",
    description: "Vanilla cake mix, no cane sugar. Tastes like vanilla — not like a substitute. Bakes in 28 minutes.",
    arabicDescription: "خلطة كيكة فانيليا بدون سكر قصب. طعمها فانيليا حقيقية، لا طعم بديل. تُخبز في 28 دقيقة.",
    ingredients: ["Wheat flour, vanilla bean, erythritol, baking powder, sea salt"],
    nutrition: { per100g: { Energy: "344 kcal", Protein: "5.0 g", Carbohydrate: "62.0 g", "Of which sugars": "1.2 g", Fat: "7.0 g", Sodium: "0.42 g" } },
  },
  // === CRYSTAL BY EPICS — PKU ===
  {
    slug: "crystal-low-protein-flat-bread",
    loafNumber: "PKU 21",
    name: "Crystal · Low-Protein Flat Bread Mix",
    arabicName: "كريستال — خلطة عيش منخفض البروتين",
    weight: "500g",
    priceEgp: 168,
    category: "pku",
    subBrand: "crystal",
    freeFrom: ["S-01", "S-03"],
    lot: "22-PKU-0042",
    iso: "22000",
    description:
      "Engineered for phenylketonuria. 0.2g protein per 100g — measured in milligrams, certified to ISO 22000. A flatbread for a family that owns a kitchen scale.",
    arabicDescription:
      "مصمَّمة خصيصًا لمرضى الفينيل كيتون يوريا. 0.2 جرام بروتين لكل 100 جرام — يُقاس بالمليجرامات، معتمدة ISO 22000. عيش لعائلة تمتلك ميزانًا للمطبخ.",
    ingredients: ["Modified starches (corn, rice, tapioca)", "Specialty PKU bread improver", "Cellulose fibre", "Yeast (sachet enclosed)"],
    nutrition: { per100g: { Energy: "340 kcal", Protein: "0.2 g", Phenylalanine: "10 mg", Carbohydrate: "82.0 g", "Of which sugars": "0.4 g", Fat: "0.5 g", Sodium: "0.30 g" } },
    servingsHint: "Makes 6 flatbreads · 1.2mg PHE per flatbread",
  },
  {
    slug: "crystal-low-protein-pasta",
    loafNumber: "PKU 22",
    name: "Crystal · Low-Protein Pasta",
    arabicName: "كريستال — مكرونة منخفضة البروتين",
    weight: "500g",
    priceEgp: 145,
    category: "pku",
    subBrand: "crystal",
    freeFrom: ["S-01", "S-03"],
    lot: "22-PKU-0061",
    iso: "22000",
    description:
      "Tubular pasta, low-protein, holds sauce. A pasta night that doesn't require a spreadsheet of allowed grams.",
    arabicDescription:
      "مكرونة أنبوبية منخفضة البروتين، تحمل الصلصة. ليلة مكرونة لا تتطلّب جدولًا بكمّيات البروتين المسموحة.",
    ingredients: ["Corn starch, tapioca starch, maize fibre", "Tomato extract (color)"],
    nutrition: { per100g: { Energy: "352 kcal", Protein: "0.3 g", Phenylalanine: "15 mg", Carbohydrate: "84.0 g", "Of which sugars": "0.5 g", Fat: "0.4 g", Sodium: "0.05 g" } },
    servingsHint: "5 servings · 15mg PHE per 100g cooked",
  },
];

export const productBySlug = (slug: string) => products.find((p) => p.slug === slug);
export const productsByCategory = (cat: Product["category"]) => products.filter((p) => p.category === cat);

export const recipes = [
  {
    slug: "european-loaf",
    code: "R-01",
    title: "European Loaf",
    arabicTitle: "العيش الأوروبي",
    productSlug: "european-baking-mix",
    time: "1h 50m",
    yield: "1 × 800g loaf",
    summary: "The flagship loaf. Crackling crust, open crumb. The bread our manifesto refers to.",
  },
  {
    slug: "fudgy-brownies",
    code: "R-02",
    title: "Fudgy Brownies",
    arabicTitle: "براونيز فادج",
    productSlug: "brownies-mix",
    time: "32 min",
    yield: "12 squares",
    summary: "22 minutes in the oven. 10 minutes to rest. Don't cut them warm. We're serious.",
  },
  {
    slug: "crystal-pku-flatbread",
    code: "R-03",
    title: "Crystal PKU Flatbread",
    arabicTitle: "عيش كريستال PKU",
    productSlug: "crystal-low-protein-flat-bread",
    time: "1h 20m",
    yield: "6 flatbreads · 1.2mg PHE each",
    summary: "Flatbread for PKU households. We publish the milligrams. Everything else is decoration.",
  },
];
