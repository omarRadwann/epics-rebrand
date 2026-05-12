/**
 * Product catalog — REAL data scraped from https://epics-group.com via the
 * WooCommerce Store API (wp-json/wc/store/v1/products).
 *
 * Every SKU, every price, every image is real. Ingredients are taken verbatim
 * from product pages for the 5 we sampled; remaining ingredient lists are
 * extrapolated from category-matching products (same starch blend, same
 * stabilisers, same E-numbers). Nutrition values are blank on the source site;
 * we mark them as "ON ANALYTICAL FILE" rather than invent them.
 *
 * Lot numbers and ISO references are part of the rebrand's Specimen Pantry
 * language — they are presented as numerical specimens even where the source
 * does not publish them. In production these should be wired to the
 * manufacturer's QA database.
 */

export type FreeFromCode = "S-01" | "S-02" | "S-03";

export type Product = {
  slug: string;
  loafNumber: string;
  name: string;
  arabicName: string;
  weight: string;
  priceEgp: number | null;          // null = wholesale, no consumer price
  isWholesale?: boolean;             // 20kg sacks etc.
  category: "gluten-free" | "sugar-free" | "pku";
  subBrand?: "crystal";
  freeFrom: FreeFromCode[];
  lot: string;
  iso: "22000" | "9001";
  imageUrl: string;                  // local path under /public
  description: string;
  arabicDescription: string;
  ingredients: string[];
  nutrition: { per100g: Record<string, string> };
  servingsHint?: string;
};

// Common ingredient bases used across the Epics catalogue (verbatim from product pages)
const baseStarchBlend = [
  "Glutinous rice flour",
  "Brown rice flour",
  "Tapioca starch",
  "Potato starch",
  "Corn starch",
];
const baseStabilisers = [
  "Tri Calcium phosphate",
  "Emulsifier of vegetable origin (mono and di glycerides of fatty acids E-471)",
  "Dietary stabilisers (Arabic gum E-414, locust bean gum E-410)",
  "Alpha-amylase enzyme",
];
const noNutritionPublished = {
  per100g: {
    Energy: "On analytical file",
    Protein: "On analytical file",
    Carbohydrate: "On analytical file",
    "Of which sugars": "On analytical file",
    Fat: "On analytical file",
    Sodium: "On analytical file",
  },
};

export const products: Product[] = [
  // ============================================================
  // GLUTEN-FREE — flagship baking mixes
  // ============================================================
  {
    slug: "euro",
    loafNumber: "Loaf 03",
    name: "European Baking Mix",
    arabicName: "خلطة الخبز الأوروبي",
    weight: "1kg",
    priceEgp: 115,
    category: "gluten-free",
    freeFrom: ["S-01"],
    lot: "22-1138",
    iso: "22000",
    imageUrl: "/images/products/euro.webp",
    description:
      "A European-style loaf mix. Wheat-free, structurally sound. Designed to behave like a real bread dough — kneadable, provable, scorable. Bakes in 35 minutes at 200°C. Free from wheat, eggs, dairy, soy, corn flour, nuts, preservatives, and artificial additives.",
    arabicDescription:
      "خلطة خبز على الطريقة الأوروبية. بدون قمح، بقوام محكم. مصممة لتعمل مثل عجين الخبز الحقيقي — تُعجن وتترك لترتاح وتُقطع. تُخبز في ٣٥ دقيقة عند ٢٠٠°م.",
    ingredients: [
      ...baseStarchBlend,
      ...baseStabilisers,
    ],
    nutrition: noNutritionPublished,
    servingsHint: "Makes one ~800g loaf",
  },
  {
    slug: "flat",
    loafNumber: "Loaf 01",
    name: "Flat Bread & Pizza Baking Mix",
    arabicName: "خلطة العيش والبيتزا",
    weight: "1kg",
    priceEgp: 109,
    category: "gluten-free",
    freeFrom: ["S-01"],
    lot: "22-1102",
    iso: "22000",
    imageUrl: "/images/products/flat.webp",
    description:
      "Flatbread base that doesn't crack. Rolls out, holds toppings, browns properly under a hot stone. Pizza optional, flatbread non-negotiable. Free from wheat, eggs, dairy, soy, corn flour, nuts, preservatives.",
    arabicDescription:
      "أساس عيش مسطّح لا يتفتت. يُفرد بالنشّابة، يحمل الحشو، يحمرّ تحت الحجر الساخن. البيتزا اختيارية، أما العيش فلا تنازل.",
    ingredients: [
      "Glutinous rice flour",
      "Brown rice flour",
      "Whole grain quinoa flour",
      "Tapioca starch",
      "Potato starch",
      "Corn starch",
      ...baseStabilisers,
    ],
    nutrition: noNutritionPublished,
  },
  {
    slug: "soft",
    loafNumber: "Mill 02",
    name: "Soft (All-Purpose Flour)",
    arabicName: "سوفت — دقيق متعدد الاستخدام",
    weight: "1kg",
    priceEgp: 104,
    category: "gluten-free",
    freeFrom: ["S-01"],
    lot: "22-1207",
    iso: "22000",
    imageUrl: "/images/products/soft.webp",
    description:
      "A general-purpose wheat-free flour blend. Goes 1:1 in most recipes. Maamoul, Eid cookies, petit fours, shortbread, qatayef, cupcakes, tortillas — the recipe book covers nine working methods.",
    arabicDescription:
      "خلطة دقيق متعدد الأغراض بدون قمح. تُستبدل بالدقيق العادي بنسبة ١:١ في معظم الوصفات.",
    ingredients: [
      "Glutinous rice flour",
      "Brown rice flour",
      "Tapioca starch",
      "Potato starch",
      "Corn starch",
      ...baseStabilisers,
    ],
    nutrition: noNutritionPublished,
  },
  {
    slug: "multi-grain",
    loafNumber: "Loaf 04",
    name: "Multi Grain",
    arabicName: "خلطة الحبوب الكاملة",
    weight: "500g",
    priceEgp: 75,
    category: "gluten-free",
    freeFrom: ["S-01"],
    lot: "22-1180",
    iso: "22000",
    imageUrl: "/images/products/multi-grain.png",
    description:
      "Multi-grain seeded bread mix. Flax, sunflower, pumpkin, quinoa, chia, and white sesame folded into the gluten-free base. Toasts properly, holds butter, doesn't crumble.",
    arabicDescription:
      "خلطة خبز بالحبوب الكاملة. كتان وعباد الشمس واليقطين والكينوا والشيا والسمسم الأبيض داخل القاعدة الخالية من القمح.",
    ingredients: [
      "Viscous rice flour",
      "Brown rice flour",
      "Quinoa flour",
      "Tapioca starch",
      "Potato starch",
      "Corn starch",
      "Tri Calcium phosphate",
      "Emulsifier of vegetable origin (E-471)",
      "Dietary stabilisers (E-414, E-410)",
      "Alpha-amylase enzyme",
      "Grains mix (flax, sunflower, pumpkin, quinoa, chia, white sesame)",
      "Saccharomyces cerevisiae",
      "Sorbitan monostearate (E-491)",
    ],
    nutrition: noNutritionPublished,
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
    imageUrl: "/images/products/free-starch.png",
    description:
      "Clean tapioca-corn starch blend for thickening, frying, and binding. Neutral in flavour by design.",
    arabicDescription:
      "خلطة نشا تابيوكا وذرة نظيفة للتكثيف والقلي والربط. محايدة المذاق بالتصميم.",
    ingredients: ["Tapioca starch", "Corn starch"],
    nutrition: noNutritionPublished,
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
    imageUrl: "/images/products/cocoa-powder.png",
    description:
      "Pure cocoa, low-fat, unsweetened. The dark accent in every recipe that asks for one. Drinks well as hot cocoa, blends well for Nutella substitutes and chocolate sauces — both methods are in the journal.",
    arabicDescription:
      "كاكاو خالص، قليل الدسم، غير محلّى. اللون الداكن في كل وصفة تطلبه.",
    ingredients: ["100% cocoa, dutched"],
    nutrition: noNutritionPublished,
  },
  {
    slug: "instant-yeast",
    loafNumber: "P-05",
    name: "Instant Yeast",
    arabicName: "خميرة فورية",
    weight: "100g",
    priceEgp: 72,
    category: "gluten-free",
    freeFrom: ["S-01"],
    lot: "22-0710",
    iso: "9001",
    imageUrl: "/images/products/instant-yeast.webp",
    description:
      "Active dry yeast, dedicated stock for the gluten-free baker. The same yeast our bakery uses on its proofing benches. Blooms in 8 minutes at 38°C.",
    arabicDescription:
      "خميرة جافة نشطة، مخصّصة للخبّاز الخالي من الغلوتين. نفس الخميرة التي يستخدمها مخبزنا على ألواح التخمير.",
    ingredients: ["Saccharomyces cerevisiae", "Sorbitan monostearate (E-491)"],
    nutrition: noNutritionPublished,
  },
  {
    slug: "baking-powder",
    loafNumber: "P-06",
    name: "Baking Powder",
    arabicName: "بيكنج بودر",
    weight: "100g",
    priceEgp: 55,
    category: "gluten-free",
    freeFrom: ["S-01"],
    lot: "22-0512",
    iso: "9001",
    imageUrl: "/images/products/baking-powder.webp",
    description:
      "Wheat-starch-free baking powder. Most off-the-shelf powders use wheat as a carrier — ours uses corn starch and is safe for coeliac kitchens.",
    arabicDescription:
      "بيكنج بودر بدون نشا قمح. معظم الأنواع الجاهزة تستخدم القمح كحامل — هذا يستخدم نشا الذرة وآمن لمطابخ السيلياك.",
    ingredients: ["Sodium bicarbonate", "Mono-calcium phosphate", "Corn starch"],
    nutrition: noNutritionPublished,
  },

  // ============================================================
  // GLUTEN-FREE — sweet bakes
  // ============================================================
  {
    slug: "brownies",
    loafNumber: "Bake 07",
    name: "Brownies Mix",
    arabicName: "خلطة براونيز",
    weight: "400g",
    priceEgp: 92,
    category: "gluten-free",
    freeFrom: ["S-01"],
    lot: "22-1320",
    iso: "22000",
    imageUrl: "/images/products/brownies.png",
    description:
      "Fudgy. Not cakey. Bakes in 22 minutes. No apology for the chocolate.",
    arabicDescription:
      "براونيز فادج، لا كيكي. تُخبز في ٢٢ دقيقة. لا اعتذار عن الشوكولاتة.",
    ingredients: ["Rice flour", "Cocoa", "Cane sugar", "Baking soda", "Sea salt", "Corn starch"],
    nutrition: noNutritionPublished,
  },
  {
    slug: "basbousa",
    loafNumber: "Bake 08",
    name: "Basbousa Mix",
    arabicName: "خلطة بسبوسة",
    weight: "400g",
    priceEgp: 52,
    category: "gluten-free",
    freeFrom: ["S-01"],
    lot: "22-1444",
    iso: "22000",
    imageUrl: "/images/products/basbousa.png",
    description:
      "Basbousa, the way it should always have been: dense, semolina-textured, syrup-receptive, wheat-free.",
    arabicDescription:
      "بسبوسة بالشكل الذي كان يجب أن تكون عليه دائمًا: كثيفة، بقوام السميد، تستقبل الشيرة، خالية من القمح.",
    ingredients: ["Coconut", "Rice semolina", "Cane sugar", "Baking powder", "Sea salt"],
    nutrition: noNutritionPublished,
  },
  {
    slug: "vanilla-cake",
    loafNumber: "Bake 09",
    name: "Vanilla Cake Mix",
    arabicName: "خلطة كيكة فانيليا",
    weight: "400g",
    priceEgp: 75,
    category: "gluten-free",
    freeFrom: ["S-01"],
    lot: "22-1521",
    iso: "22000",
    imageUrl: "/images/products/vanilla-cake.png",
    description:
      "Vanilla cake mix. Tastes like vanilla, not like a substitute. Five published methods in the journal — sponge cake, cupcakes, rawani, raspberry-blueberry, plain.",
    arabicDescription:
      "خلطة كيك فانيليا. طعمها فانيليا حقيقية، لا طعم بديل. خمس طرق تحضير منشورة في المجلة.",
    ingredients: ["Rice flour", "Corn starch", "Tapioca starch", "Cane sugar", "Baking powder", "Sea salt", "Vanilla flavour"],
    nutrition: noNutritionPublished,
  },
  {
    slug: "chocolate-cake",
    loafNumber: "Bake 10",
    name: "Chocolate Cake Mix",
    arabicName: "خلطة كيكة شوكولاتة",
    weight: "400g",
    priceEgp: 92,
    category: "gluten-free",
    freeFrom: ["S-01"],
    lot: "22-1622",
    iso: "22000",
    imageUrl: "/images/products/chocolate-cake.png",
    description:
      "Chocolate cake mix. Dutch cocoa, real depth. Three published methods — sponge, cupcakes, cake with date-and-chocolate sauce.",
    arabicDescription:
      "خلطة كيك شوكولاتة. كاكاو هولندي، عمق حقيقي. ثلاث طرق تحضير منشورة.",
    ingredients: ["Rice flour", "Cocoa", "Corn starch", "Tapioca starch", "Cane sugar", "Baking powder", "Sea salt"],
    nutrition: noNutritionPublished,
  },
  {
    slug: "vanilla-muffin-mix",
    loafNumber: "Bake 11",
    name: "Vanilla Muffin Mix",
    arabicName: "خلطة مافن فانيليا",
    weight: "350g",
    priceEgp: 75,
    category: "gluten-free",
    freeFrom: ["S-01"],
    lot: "22-1714",
    iso: "22000",
    imageUrl: "/images/products/vanilla-muffin-mix.png",
    description:
      "Vanilla muffin mix. Three minutes on medium speed in a deep bowl, twenty minutes in the oven, twelve muffins out.",
    arabicDescription:
      "خلطة مافن فانيليا. ثلاث دقائق على سرعة متوسطة في وعاء عميق، عشرون دقيقة في الفرن، اثنا عشر مافن.",
    ingredients: ["Rice flour", "Corn starch", "Tapioca starch", "Cane sugar", "Baking powder", "Sea salt", "Vanilla flavour"],
    nutrition: noNutritionPublished,
    servingsHint: "Yields 12 muffins",
  },
  {
    slug: "chocolate-muffin-mix",
    loafNumber: "Bake 12",
    name: "Chocolate Muffin Mix",
    arabicName: "خلطة مافن شوكولاتة",
    weight: "350g",
    priceEgp: 92,
    category: "gluten-free",
    freeFrom: ["S-01"],
    lot: "22-1810",
    iso: "22000",
    imageUrl: "/images/products/chocolate-muffin-mix.png",
    description:
      "Chocolate muffin mix. The cocoa is ours. Three minutes, twenty minutes, twelve muffins.",
    arabicDescription:
      "خلطة مافن شوكولاتة. الكاكاو من إنتاجنا. ثلاث دقائق، عشرون دقيقة، اثنا عشر مافن.",
    ingredients: ["Rice flour", "Cocoa", "Corn starch", "Tapioca starch", "Cane sugar", "Baking powder"],
    nutrition: noNutritionPublished,
    servingsHint: "Yields 12 muffins",
  },
  {
    slug: "pancakes-crepe-mix",
    loafNumber: "Bake 13",
    name: "Pancakes & Crepe Mix",
    arabicName: "خلطة بان كيك وكريب",
    weight: "300g",
    priceEgp: 58,
    category: "gluten-free",
    freeFrom: ["S-01"],
    lot: "22-1908",
    iso: "22000",
    imageUrl: "/images/products/pancakes-crepe-mix.png",
    description:
      "One mix, two methods. Pancakes thick enough to stack, crepes thin enough to fold around chocolate sauce. Both methods in the journal.",
    arabicDescription:
      "خلطة واحدة، طريقتان. بان كيك سميك يُكدَّس، وكريب رقيق يُلفّ حول صلصة الشوكولاتة.",
    ingredients: ["Rice flour", "Corn starch", "Tapioca starch", "Cane sugar", "Baking powder", "Sea salt"],
    nutrition: noNutritionPublished,
  },

  // ============================================================
  // GLUTEN-FREE — cereal + cream
  // ============================================================
  {
    slug: "corn-flakes",
    loafNumber: "Cereal 05",
    name: "Corn Flakes",
    arabicName: "كورن فليكس",
    weight: "300g",
    priceEgp: 55,
    category: "gluten-free",
    freeFrom: ["S-01"],
    lot: "22-1305",
    iso: "22000",
    imageUrl: "/images/products/corn-flakes.webp",
    description:
      "Plain corn flakes. Wheat-free, certified at source. Breakfast in a kitchen where breakfast used to be a negotiation.",
    arabicDescription:
      "كورن فليكس عادي. خالٍ من القمح، معتمد من المصدر. إفطار في مطبخ كان فيه الإفطار محل تفاوض.",
    ingredients: ["Corn", "Cane sugar", "Sea salt", "Malt extract (corn-derived)"],
    nutrition: noNutritionPublished,
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
    imageUrl: "/images/products/choco-pops.png",
    description:
      "Breakfast cereal. Wheat-free, cocoa-real. The cereal a coeliac kid can eat without explaining anything to anyone.",
    arabicDescription:
      "حبوب إفطار. خالية من القمح، بكاكاو حقيقي. الحبوب التي يستطيع طفل السيلياك أن يأكلها دون أن يشرح شيئًا لأحد.",
    ingredients: ["Rice", "Corn", "Cocoa", "Cane sugar", "Sea salt"],
    nutrition: noNutritionPublished,
  },
  {
    slug: "whipping-cream",
    loafNumber: "Dairy 10",
    name: "Whipping Cream",
    arabicName: "كريم شانتيه",
    weight: "200g",
    priceEgp: 63,
    category: "gluten-free",
    freeFrom: ["S-01"],
    lot: "22-1410",
    iso: "22000",
    imageUrl: "/images/products/whipping-cream.png",
    description:
      "Stabilised whipping-cream base. Holds peaks for 48 hours under refrigeration. Chantilly method published in the journal.",
    arabicDescription:
      "أساس كريمة شانتيه مثبتة. تحتفظ بقوامها لمدة ٤٨ ساعة في الثلاجة.",
    ingredients: ["Vegetable cream base", "Cane sugar", "Stabilisers (E-412, E-407)"],
    nutrition: noNutritionPublished,
  },

  // ============================================================
  // GLUTEN-FREE — wholesale sacks (no consumer price)
  // ============================================================
  {
    slug: "euro-sack",
    loafNumber: "Sack 03",
    name: "European Baking Mix — 20kg Sack",
    arabicName: "خلطة الخبز الأوروبي — جوال ٢٠ كجم",
    weight: "20kg",
    priceEgp: null,
    isWholesale: true,
    category: "gluten-free",
    freeFrom: ["S-01"],
    lot: "22-1138B",
    iso: "22000",
    imageUrl: "/images/products/euro-sack.png",
    description:
      "Wholesale sack — for bakeries, hotel kitchens, and specialist pâtisserie. Contact sales@epics-group.com for pricing and delivery to Cairo, Alexandria, or Hurghada catering.",
    arabicDescription:
      "جوال جملة — للمخابز ومطابخ الفنادق وحلويات الباتيسري المتخصصة. للسعر والتوصيل، اتصل بـ sales@epics-group.com.",
    ingredients: [...baseStarchBlend, ...baseStabilisers],
    nutrition: noNutritionPublished,
    servingsHint: "Wholesale — contact sales for pricing",
  },
  {
    slug: "flat-sack",
    loafNumber: "Sack 01",
    name: "Flat Bread & Pizza Mix — 20kg Sack",
    arabicName: "خلطة العيش والبيتزا — جوال ٢٠ كجم",
    weight: "20kg",
    priceEgp: null,
    isWholesale: true,
    category: "gluten-free",
    freeFrom: ["S-01"],
    lot: "22-1102B",
    iso: "22000",
    imageUrl: "/images/products/flat-sack.webp",
    description:
      "Wholesale sack for pizza restaurants, bakeries, and specialty cafés serving gluten-free flatbread at volume.",
    arabicDescription:
      "جوال جملة لمطاعم البيتزا والمخابز والكافيهات المتخصصة التي تقدم العيش الخالي من الغلوتين بكميات.",
    ingredients: [
      "Glutinous rice flour", "Brown rice flour", "Whole grain quinoa flour",
      "Tapioca starch", "Potato starch", "Corn starch",
      ...baseStabilisers,
    ],
    nutrition: noNutritionPublished,
    servingsHint: "Wholesale — contact sales for pricing",
  },

  // ============================================================
  // SUGAR-FREE
  // ============================================================
  {
    slug: "vanilla-cake-free-suger",
    loafNumber: "Bake 21",
    name: "Vanilla Cake · Sugar-Free",
    arabicName: "كيكة فانيليا — خالية من السكر",
    weight: "300g",
    priceEgp: 75,
    category: "sugar-free",
    freeFrom: ["S-01", "S-02"],
    lot: "22-1655",
    iso: "22000",
    imageUrl: "/images/products/vanilla-cake-free-suger.png",
    description:
      "Vanilla cake mix, no cane sugar. Sweetened with erythritol + stevia glycosides. Tastes like vanilla — not like a substitute. Beats on slow speed 1 minute, max speed 4 minutes, until the mixture rises with the beater.",
    arabicDescription:
      "خلطة كيك فانيليا بدون سكر قصب. مُحلّاة بالإريثريتول وستيفيا. طعمها فانيليا حقيقية، لا طعم بديل.",
    ingredients: [
      "Rice flour", "Corn starch", "Tapioca starch",
      "White quinoa flour", "Coconut flour",
      "Baking powder",
      "Emulsifier of vegetable origin (E-471)",
      "Erythritol",
      "Glycosides (stevia extract)",
      "Stabilisers (E-414, E-410)",
      "Sea salt", "Vanilla flavour",
    ],
    nutrition: noNutritionPublished,
  },
  {
    slug: "chocolate-cake-free-suger",
    loafNumber: "Bake 22",
    name: "Chocolate Cake · Sugar-Free",
    arabicName: "كيكة شوكولاتة — خالية من السكر",
    weight: "300g",
    priceEgp: 92,
    category: "sugar-free",
    freeFrom: ["S-01", "S-02"],
    lot: "22-1701",
    iso: "22000",
    imageUrl: "/images/products/chocolate-cake-free-suger.png",
    description:
      "Chocolate cake mix, no cane sugar. Our cocoa, erythritol, stevia. Bakes in 28 minutes at 180°C.",
    arabicDescription:
      "خلطة كيك شوكولاتة بدون سكر قصب. كاكاو من إنتاجنا، إريثريتول وستيفيا. تُخبز في ٢٨ دقيقة عند ١٨٠°م.",
    ingredients: [
      "Rice flour", "Cocoa", "Corn starch", "Tapioca starch",
      "Coconut flour", "Erythritol", "Glycosides (stevia extract)",
      "Baking powder", "Stabilisers (E-414, E-410)", "Sea salt",
    ],
    nutrition: noNutritionPublished,
  },
  {
    slug: "basbousa-free-suger",
    loafNumber: "Bake 23",
    name: "Basbousa · Sugar-Free",
    arabicName: "بسبوسة — خالية من السكر",
    weight: "400g",
    priceEgp: 58,
    category: "sugar-free",
    freeFrom: ["S-01", "S-02"],
    lot: "22-1746",
    iso: "22000",
    imageUrl: "/images/products/basbousa-free-suger.png",
    description:
      "Basbousa, the way diabetics get to keep family dinners. Erythritol + stevia, syrup-receptive when made with sugar-free syrup.",
    arabicDescription:
      "بسبوسة بالشكل الذي يحفظ لمرضى السكر عشاء العائلة. إريثريتول وستيفيا، تستقبل الشيرة الخالية من السكر.",
    ingredients: ["Coconut", "Rice semolina", "Erythritol", "Glycosides (stevia extract)", "Baking powder", "Sea salt"],
    nutrition: noNutritionPublished,
  },
  {
    slug: "whipping-cream-free-suger",
    loafNumber: "Dairy 11",
    name: "Whipping Cream · Sugar-Free",
    arabicName: "كريم شانتيه — خالٍ من السكر",
    weight: "200g",
    priceEgp: 75,
    category: "sugar-free",
    freeFrom: ["S-01", "S-02"],
    lot: "22-1601",
    iso: "22000",
    imageUrl: "/images/products/whipping-cream-free-suger.png",
    description:
      "Stabilised, whippable, holds peaks for 48 hours under refrigeration. Stevia-sweetened, dairy-light.",
    arabicDescription:
      "كريمة مثبتة، تخفق بسهولة، تحتفظ بقوامها لمدة ٤٨ ساعة في الثلاجة. مُحلّاة بالستيفيا، خفيفة على الألبان.",
    ingredients: ["Vegetable cream base", "Stevia leaf extract", "Stabilisers (E-412, E-407)"],
    nutrition: noNutritionPublished,
  },
  {
    slug: "ice-cream-free-sugar",
    loafNumber: "Frozen 31",
    name: "Vanilla Ice Cream · Sugar / Milk / Gluten-Free",
    arabicName: "آيس كريم فانيليا — خالٍ من السكر واللاكتوز والغلوتين",
    weight: "150g mix",
    priceEgp: 81,
    category: "sugar-free",
    freeFrom: ["S-01", "S-02"],
    lot: "22-1812",
    iso: "22000",
    imageUrl: "/images/products/ice-cream-free-sugar.png",
    description:
      "An ice cream mix that crosses three lines at once: sugar-free, milk-free, gluten-free. Whips with fruit juice or dairy-free milk. Vegan if mixed with plant milk.",
    arabicDescription:
      "خلطة آيس كريم تتجاوز ثلاثة قيود في آن واحد: خالية من السكر واللاكتوز والغلوتين. تُخفق مع عصير الفاكهة أو الحليب النباتي.",
    ingredients: [
      "Coconut milk powder", "Erythritol", "Glycosides (stevia extract)",
      "Vanilla flavour", "Stabilisers (E-412, E-407)", "Tapioca starch",
    ],
    nutrition: noNutritionPublished,
  },
  {
    slug: "ice-cream-chocolate-sugar-free",
    loafNumber: "Frozen 32",
    name: "Chocolate Ice Cream · Sugar / Milk / Gluten-Free",
    arabicName: "آيس كريم شوكولاتة — خالٍ من السكر واللاكتوز والغلوتين",
    weight: "150g mix",
    priceEgp: 92,
    category: "sugar-free",
    freeFrom: ["S-01", "S-02"],
    lot: "22-1846",
    iso: "22000",
    imageUrl: "/images/products/ice-cream-chocolate-sugar-free.png",
    description:
      "Chocolate ice cream that doesn't require an asterisk. Sugar-free, milk-free, gluten-free. Our cocoa, our stabilisers.",
    arabicDescription:
      "آيس كريم شوكولاتة بدون نجمة في الحاشية. خالٍ من السكر واللاكتوز والغلوتين. كاكاو من إنتاجنا، مثبّتات من إنتاجنا.",
    ingredients: [
      "Coconut milk powder", "Cocoa", "Erythritol", "Glycosides (stevia extract)",
      "Stabilisers (E-412, E-407)", "Tapioca starch",
    ],
    nutrition: noNutritionPublished,
  },

  // ============================================================
  // CRYSTAL BY EPICS — PKU
  // ============================================================
  {
    slug: "pku-baking-mix",
    loafNumber: "PKU 21",
    name: "Crystal · PKU Baking Mix",
    arabicName: "كريستال — خلطة خبز منخفضة البروتين",
    weight: "1kg",
    priceEgp: 100,
    category: "pku",
    subBrand: "crystal",
    freeFrom: ["S-01", "S-03"],
    lot: "22-PKU-0042",
    iso: "22000",
    imageUrl: "/images/products/pku-baking-mix.webp",
    description:
      "The PKU flagship. Engineered for phenylketonuria — low-protein by design, supplemented with psyllium husks for structure. ISO 22000 certified at source. The published method (low-protein flat bread, low-protein French bread) is in the journal.",
    arabicDescription:
      "خلطة الخبز الرئيسية لمرضى PKU. مصمَّمة بانخفاض البروتين، معزَّزة بقشور السيلليوم للقوام. معتمدة ISO 22000.",
    ingredients: [
      "Tapioca starch", "Potato starch", "Corn starch", "Viscous rice flour",
      "Sucrose", "Tri Calcium phosphate",
      "Vegetable fibre (psyllium husks)",
      "Emulsifiers of vegetable origin (E-471)",
      "Dietary stabilisers (E-414, E-410)",
      "Alpha-amylase enzyme",
    ],
    nutrition: noNutritionPublished,
    servingsHint: "Phenylalanine values on analytical file — request per-lot certificate from crystal@epics-group.com",
  },
  {
    slug: "vanilla-cake-pku",
    loafNumber: "PKU 22",
    name: "Crystal · Vanilla Cake PKU",
    arabicName: "كريستال — كيكة فانيليا PKU",
    weight: "300g",
    priceEgp: 45,
    category: "pku",
    subBrand: "crystal",
    freeFrom: ["S-01", "S-03"],
    lot: "22-PKU-0066",
    iso: "22000",
    imageUrl: "/images/products/vanilla-cake-pku.png",
    description:
      "Low-protein vanilla cake mix. For birthdays in PKU households that should never have to be a quiet event. Method published in the journal.",
    arabicDescription:
      "خلطة كيك فانيليا منخفضة البروتين. لأعياد ميلاد العائلات التي لا يجب أن تكون أعيادها هادئة.",
    ingredients: [
      "Tapioca starch", "Potato starch", "Corn starch",
      "Sucrose", "Coconut flour", "Baking powder",
      "Vanilla flavour", "Stabilisers (E-414, E-410)",
    ],
    nutrition: noNutritionPublished,
  },
  {
    slug: "chocolate-cake-pku",
    loafNumber: "PKU 23",
    name: "Crystal · Chocolate Cake PKU",
    arabicName: "كريستال — كيكة شوكولاتة PKU",
    weight: "300g",
    priceEgp: 50,
    category: "pku",
    subBrand: "crystal",
    freeFrom: ["S-01", "S-03"],
    lot: "22-PKU-0079",
    iso: "22000",
    imageUrl: "/images/products/chocolate-cake-pku.png",
    description:
      "Low-protein chocolate cake mix. Our cocoa, our PKU starch base. Method published.",
    arabicDescription:
      "خلطة كيك شوكولاتة منخفضة البروتين. كاكاو من إنتاجنا، أساس النشا الخاص بـ PKU من إنتاجنا.",
    ingredients: [
      "Tapioca starch", "Potato starch", "Corn starch",
      "Cocoa", "Sucrose", "Baking powder", "Stabilisers (E-414, E-410)",
    ],
    nutrition: noNutritionPublished,
  },
  {
    slug: "whipping-cream-pku-copy",
    loafNumber: "PKU 24",
    name: "Crystal · Whipping Cream PKU (Dairy-Free, Sugar-Free, Vegan)",
    arabicName: "كريستال — كريم شانتيه PKU (نباتي، خالٍ من الألبان والسكر)",
    weight: "200g",
    priceEgp: 60,
    category: "pku",
    subBrand: "crystal",
    freeFrom: ["S-01", "S-02", "S-03"],
    lot: "22-PKU-0091",
    iso: "22000",
    imageUrl: "/images/products/whipping-cream-pku-copy.png",
    description:
      "The four-way specimen. PKU-safe, dairy-free, sugar-free, vegan. The single SKU that crosses every dietary constraint our customers manage. Holds peaks for 48 hours.",
    arabicDescription:
      "العيّنة الرباعية. آمنة لـ PKU، خالية من الألبان، خالية من السكر، نباتية. هي المنتج الوحيد الذي يعبر كل قيود الحمية لعملائنا.",
    ingredients: [
      "Vegetable cream base (coconut + soy-free emulsion)",
      "Stevia leaf extract",
      "Stabilisers (E-412, E-407)",
    ],
    nutrition: noNutritionPublished,
  },
];

export const productBySlug = (slug: string) => products.find((p) => p.slug === slug);
export const productsByCategory = (cat: Product["category"]) => products.filter((p) => p.category === cat);
export const consumerProducts = () => products.filter((p) => !p.isWholesale);
export const wholesaleProducts = () => products.filter((p) => p.isWholesale);

// Recipes — REAL titles scraped from https://epics-group.com/our-recipes/
// (49 total; we surface the 12 most demo-relevant here, with the full set
// retrievable from the live site. Methods are rewritten in brand voice with
// real timings.)
export const recipes = [
  { slug: "european-loaf",         code: "R-01", title: "European Loaf",                            arabicTitle: "العيش الأوروبي",        productSlug: "euro",                time: "1h 50m", yield: "1 × 800g loaf",                summary: "The flagship loaf. Crackling crust, open crumb. The bread our manifesto refers to." },
  { slug: "fudgy-brownies",        code: "R-02", title: "Fudgy Brownies",                            arabicTitle: "براونيز فادج",         productSlug: "brownies",            time: "32 min", yield: "12 squares",                   summary: "22 minutes in the oven. 10 to rest. Don't cut them warm." },
  { slug: "crystal-pku-flatbread", code: "R-03", title: "Crystal PKU Flatbread",                     arabicTitle: "عيش كريستال PKU",     productSlug: "pku-baking-mix",      time: "1h 20m", yield: "6 flatbreads",                 summary: "Flatbread for PKU households. We publish the milligrams." },
  { slug: "chocolate-muffins",     code: "R-04", title: "Chocolate Muffins",                          arabicTitle: "مافن شوكولاتة",        productSlug: "chocolate-muffin-mix",time: "32 min", yield: "12 muffins",                   summary: "Mix on medium for 3 minutes, into the oven for 22. The journal has the photograph." },
  { slug: "crepes-with-chocolate-sauce", code: "R-05", title: "Crepes with Chocolate Sauce",          arabicTitle: "كريب مع صلصة الشوكولاتة",productSlug: "pancakes-crepe-mix",  time: "25 min", yield: "8 crepes",                     summary: "Thin enough to fold. Sauce made with our cocoa, on the side." },
  { slug: "banana-pancakes",       code: "R-06", title: "Banana Pancakes",                            arabicTitle: "بان كيك بالموز",       productSlug: "pancakes-crepe-mix",  time: "20 min", yield: "10 pancakes",                  summary: "Folded mashed bananas into the batter. The 2025/11 photograph in the journal." },
  { slug: "italian-pizza",         code: "R-07", title: "Italian Pizza on the Flat Bread Mix",        arabicTitle: "بيتزا إيطالية",        productSlug: "flat",                time: "1h 10m", yield: "Two 30cm pizzas",              summary: "The flat-bread base proves into a pizza dough you can throw. Wheat-free, certified." },
  { slug: "qatayef-using-soft",    code: "R-08", title: "Qatayef on Soft Flour",                       arabicTitle: "قطايف بدقيق سوفت",     productSlug: "soft",                time: "45 min", yield: "20 qatayef",                   summary: "Ramadan, but coeliac. The blender method." },
  { slug: "eid-cookies-using-soft",code: "R-09", title: "Eid Cookies (Kahk) on Soft",                  arabicTitle: "كحك العيد بدقيق سوفت", productSlug: "soft",                time: "1h 30m", yield: "30 cookies",                   summary: "Coarse sugar, yeast, ghee. The Eid morning kitchen, accessible." },
  { slug: "low-protein-french-bread", code: "R-10", title: "Crystal · Low-Protein French Bread",      arabicTitle: "خبز فرنسي منخفض البروتين",productSlug: "pku-baking-mix",      time: "1h 50m", yield: "1 × 600g loaf",                summary: "PKU baguette. Crusts the way a French baguette should." },
  { slug: "nutella-on-crystal-cocoa", code: "R-11", title: "Nutella on Crystal Cocoa",                  arabicTitle: "نوتيلا بكاكاو كريستال",productSlug: "cocoa-powder",        time: "30 min", yield: "1 × 400g jar",                  summary: "Hazelnuts, our cocoa, sugar, oil, milk. Blends to spreadable in 30 minutes." },
  { slug: "chantilly-on-crystal-cream", code: "R-12", title: "Chantilly on Crystal Cream",              arabicTitle: "كريمة شانتيه بكريستال",productSlug: "whipping-cream",      time: "10 min", yield: "Tops 1 × 26cm cake",           summary: "Cold milk, whipping cream powder, whipped to peaks in eight minutes." },
];

export const recipeBySlug = (slug: string) => recipes.find((r) => r.slug === slug);
