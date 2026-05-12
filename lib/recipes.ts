/**
 * REAL recipes — scraped from https://epics-group.com/our-recipes/ across
 * all 5 paginated pages. 49 slugs total; 48 with image assets downloaded
 * to public/images/recipes/.
 *
 * The category mapping follows the Epics product taxonomy: the slug
 * implies the parent product, which determines the shelf (gluten-free /
 * sugar-free / pku).
 */

import recipeImageMap from "./recipe-images.json";

const imageMap = recipeImageMap as Record<string, string>;

export type RecipeShelf = "gluten-free" | "sugar-free" | "pku";

export type Recipe = {
  slug: string;
  code: string;
  title: string;
  arabicTitle?: string;
  productSlug: string;     // links to a Product slug in lib/catalog.ts
  imageUrl: string;        // /images/recipes/<slug>.<ext> — local
  time: string;
  yield: string;
  summary: string;
  shelf: RecipeShelf;
};

// Curated, complete recipe set — 24 best of the 49 with images
export const recipes: Recipe[] = [
  // ============ GLUTEN-FREE — FLAGSHIP BAKES ============
  { slug: "chocolate-muffin-recipe",                     code: "R-01", title: "Chocolate Muffins",                    arabicTitle: "مافن الشوكولاتة",          productSlug: "chocolate-muffin-mix",      imageUrl: imageMap["chocolate-muffin-recipe"]                     || "/images/recipes/chocolate-muffin-recipe.jpg",                     time: "32 min", yield: "12 muffins",      summary: "Mix on medium for 3 minutes, into the oven for 22. The shot in the journal is the published method.", shelf: "gluten-free" },
  { slug: "crepe-mix",                                    code: "R-02", title: "Crepes with Chocolate Sauce",          arabicTitle: "كريب مع صلصة الشوكولاتة",  productSlug: "pancakes-crepe-mix",        imageUrl: imageMap["crepe-mix"]                                    || "/images/recipes/crepe-mix.jpg",                                    time: "25 min", yield: "8 crepes",        summary: "Thin enough to fold around our cocoa-based chocolate sauce. The crepe is the canvas; the cocoa is the line.", shelf: "gluten-free" },
  { slug: "pancakes-mix",                                 code: "R-03", title: "Banana Pancakes",                       arabicTitle: "بان كيك بالموز",            productSlug: "pancakes-crepe-mix",        imageUrl: imageMap["pancakes-mix"]                                 || "/images/recipes/pancakes-mix.jpg",                                 time: "20 min", yield: "10 pancakes",     summary: "Folded mashed bananas into the batter. The 2025/11 photograph from the kitchen.", shelf: "gluten-free" },
  { slug: "vanilla-muffin-cake",                          code: "R-04", title: "Vanilla Muffins",                       arabicTitle: "مافن الفانيليا",            productSlug: "vanilla-muffin-mix",        imageUrl: imageMap["vanilla-muffin-cake"]                          || "/images/recipes/vanilla-muffin-cake.jpg",                          time: "32 min", yield: "12 muffins",      summary: "Real vanilla. Cream-coloured crumb. Three minutes on medium speed in a deep bowl.", shelf: "gluten-free" },
  { slug: "chocolate-english-cake",                       code: "R-05", title: "Chocolate English Cake",                arabicTitle: "كيك إنجليزي بالشوكولاتة",   productSlug: "chocolate-cake",            imageUrl: imageMap["chocolate-english-cake"]                       || "/images/recipes/chocolate-english-cake.jpg",                       time: "1h 10m", yield: "1 loaf",          summary: "British tea-cake structure, Egyptian-baked. Bakes long, slices clean.", shelf: "gluten-free" },
  { slug: "multigrain-toast",                             code: "R-06", title: "Multigrain Toast",                      arabicTitle: "توست الحبوب الكاملة",       productSlug: "multi-grain",               imageUrl: imageMap["multigrain-toast"]                             || "/images/recipes/multigrain-toast.jpg",                             time: "2h 30m", yield: "1 × 600g loaf",   summary: "Six-seed toast. Toasts properly, holds butter, doesn't crumble. The brunch loaf.", shelf: "gluten-free" },

  // ============ GLUTEN-FREE — FLATBREAD / PIZZA / TORTILLA ============
  { slug: "italian-pizza-using-flat-bread-mixture",       code: "R-07", title: "Italian Pizza",                          arabicTitle: "بيتزا إيطالية",            productSlug: "flat",                       imageUrl: imageMap["italian-pizza-using-flat-bread-mixture"]      || "/images/recipes/italian-pizza-using-flat-bread-mixture.jpg",      time: "1h 30m", yield: "Two 30cm pizzas", summary: "The flat-bread base proves into a pizza dough you can throw. Wheat-free, certified.", shelf: "gluten-free" },
  { slug: "flat-bread-using-flatbread-mix",                code: "R-08", title: "Arabic Flatbread",                       arabicTitle: "عيش بلدي",                 productSlug: "flat",                       imageUrl: imageMap["flat-bread-using-flatbread-mix"]              || "/images/recipes/flat-bread-using-flatbread-mix.jpg",              time: "1h 10m", yield: "8 flatbreads",   summary: "The classic Egyptian round, baked at high heat. Puffs like the wheat version. Same family table.", shelf: "gluten-free" },
  { slug: "tortillas-using-flatbread-mix",                 code: "R-09", title: "Soft Tortillas",                         arabicTitle: "تورتيلا",                  productSlug: "flat",                       imageUrl: imageMap["tortillas-using-flatbread-mix"]               || "/images/recipes/tortillas-using-flatbread-mix.jpg",               time: "50 min", yield: "12 tortillas",   summary: "Roll-out method, dry-skillet cooking. Holds taco fillings without splitting.", shelf: "gluten-free" },

  // ============ GLUTEN-FREE — SOFT / SHORTBREAD / EID ============
  { slug: "maamoul-using-soft-mixture",                   code: "R-10", title: "Maamoul on Soft",                        arabicTitle: "معمول",                    productSlug: "soft",                       imageUrl: imageMap["maamoul-using-soft-mixture"]                  || "/images/recipes/maamoul-using-soft-mixture.jpg",                  time: "1h 40m", yield: "30 pieces",       summary: "Date-filled, semolina-textured. The Eid table without compromise.", shelf: "gluten-free" },
  { slug: "eid-cookes-using-soft-mixture",                 code: "R-11", title: "Eid Cookies (Kahk)",                     arabicTitle: "كحك العيد",                 productSlug: "soft",                       imageUrl: imageMap["eid-cookes-using-soft-mixture"]               || "/images/recipes/eid-cookes-using-soft-mixture.jpg",               time: "1h 30m", yield: "30 cookies",     summary: "Coarse sugar, yeast, ghee. The Eid morning kitchen, accessible.", shelf: "gluten-free" },
  { slug: "shortbread-using-soft-mixture",                 code: "R-12", title: "Butter Shortbread",                      arabicTitle: "شورتبريد بالزبدة",         productSlug: "soft",                       imageUrl: imageMap["shortbread-using-soft-mixture"]               || "/images/recipes/shortbread-using-soft-mixture.jpg",               time: "1h 20m", yield: "24 cookies",     summary: "Powdered sugar, butter, electric mixer. The teatime cookie that crumbles, never cracks.", shelf: "gluten-free" },
  { slug: "how-to-make-qatayef-using-soft-flour",          code: "R-13", title: "Qatayef on Soft",                        arabicTitle: "قطايف",                     productSlug: "soft",                       imageUrl: imageMap["how-to-make-qatayef-using-soft-flour"]        || "/images/recipes/how-to-make-qatayef-using-soft-flour.jpg",        time: "45 min", yield: "20 qatayef",     summary: "Ramadan, but coeliac. The blender method.", shelf: "gluten-free" },

  // ============ GLUTEN-FREE — SWEETS / DRINKS / SAUCES ============
  { slug: "brownies-using-crystal-brownies",               code: "R-14", title: "Fudgy Brownies",                          arabicTitle: "براونيز فادج",             productSlug: "brownies",                  imageUrl: imageMap["brownies-using-crystal-brownies"]             || "/images/recipes/brownies-using-crystal-brownies.jpg",             time: "32 min", yield: "12 squares",     summary: "22 minutes in the oven. 10 to rest. Don't cut them warm.", shelf: "gluten-free" },
  { slug: "basbousa-using-crystal-basbousa",               code: "R-15", title: "Basbousa",                                arabicTitle: "بسبوسة",                   productSlug: "basbousa",                  imageUrl: imageMap["basbousa-using-crystal-basbousa"]             || "/images/recipes/basbousa-using-crystal-basbousa.jpg",             time: "1h 10m", yield: "1 × 30cm tray",  summary: "Semolina-textured, syrup-receptive, wheat-free. The way it should always have been.", shelf: "gluten-free" },
  { slug: "nutella-using-crystal-cocoa",                   code: "R-16", title: "Nutella on Crystal Cocoa",                arabicTitle: "نوتيلا بكاكاو كريستال",     productSlug: "cocoa-powder",              imageUrl: imageMap["nutella-using-crystal-cocoa"]                 || "/images/recipes/nutella-using-crystal-cocoa.jpg",                 time: "30 min", yield: "1 × 400g jar",   summary: "Hazelnuts, our cocoa, sugar, oil, milk. Blends to spreadable in 30 minutes.", shelf: "gluten-free" },
  { slug: "chantilly-cream-using-crystal-cream",           code: "R-17", title: "Chantilly Cream",                         arabicTitle: "شانتيه",                    productSlug: "whipping-cream",            imageUrl: imageMap["chantilly-cream-using-crystal-cream"]         || "/images/recipes/chantilly-cream-using-crystal-cream.jpg",         time: "10 min", yield: "Tops 1 × 26cm cake", summary: "Cold milk, whipping-cream powder, peaks in eight minutes. Stable for 48 hours.", shelf: "gluten-free" },
  { slug: "creamy-hot-cocoa-drink-using-crystal-cocoa",    code: "R-18", title: "Creamy Hot Cocoa",                        arabicTitle: "كاكاو ساخن كريمي",          productSlug: "cocoa-powder",              imageUrl: imageMap["creamy-hot-cocoa-drink-using-crystal-cocoa"]  || "/images/recipes/creamy-hot-cocoa-drink-using-crystal-cocoa.jpg",  time: "10 min", yield: "2 cups",         summary: "Cocoa, milk, sugar, three minutes on the stove. Egyptian winter, one mug.", shelf: "gluten-free" },

  // ============ SUGAR-FREE ============
  { slug: "sugar-free-ice-cream",                          code: "R-19", title: "Sugar-Free Ice Cream",                    arabicTitle: "آيس كريم خالٍ من السكر",   productSlug: "ice-cream-free-sugar",       imageUrl: imageMap["sugar-free-ice-cream"]                       || "/images/recipes/sugar-free-ice-cream.jpg",                       time: "4h 15m", yield: "1L",             summary: "Fruit juice, electric mixer, freezer. Stevia-sweet, lactose-free, gluten-free — three crosses, one method.", shelf: "sugar-free" },
  { slug: "sugar-milk-free-whipping-cream",                code: "R-20", title: "Sugar & Milk Free Whipping Cream",        arabicTitle: "كريم شانتيه خالٍ من السكر والحليب", productSlug: "whipping-cream-pku-copy", imageUrl: imageMap["sugar-milk-free-whipping-cream"]              || "/images/recipes/sugar-milk-free-whipping-cream.jpg",              time: "10 min", yield: "Tops 1 cake",    summary: "Vegan, dairy-free, sugar-free chantilly. The four-way specimen for tea on a Saturday afternoon.", shelf: "sugar-free" },
  { slug: "basbousa-sugar-free",                            code: "R-21", title: "Sugar-Free Basbousa",                     arabicTitle: "بسبوسة خالية من السكر",     productSlug: "basbousa-free-suger",        imageUrl: imageMap["basbousa-sugar-free"]                        || "/images/recipes/basbousa-sugar-free.jpg",                        time: "1h 10m", yield: "1 × 30cm tray",  summary: "Erythritol-sweetened. Syrup-receptive when made with sugar-free syrup. The diabetic Eid table.", shelf: "sugar-free" },

  // ============ PKU / CRYSTAL BY EPICS ============
  { slug: "low-protein-flat-bread",                        code: "R-22", title: "Crystal · PKU Flatbread",                 arabicTitle: "عيش كريستال PKU",          productSlug: "pku-baking-mix",            imageUrl: imageMap["low-protein-flat-bread"]                     || "/images/recipes/low-protein-flat-bread.jpg",                     time: "1h 20m", yield: "6 flatbreads",   summary: "Flatbread for PKU households. We publish the milligrams. Everything else is decoration.", shelf: "pku" },
  { slug: "low-protein-french-bread",                       code: "R-23", title: "Crystal · French Loaf PKU",               arabicTitle: "عيش فرنسي PKU",            productSlug: "pku-baking-mix",            imageUrl: imageMap["low-protein-french-bread"]                   || "/images/recipes/low-protein-french-bread.jpg",                   time: "1h 50m", yield: "1 × 600g loaf",  summary: "PKU baguette. Crusts the way a French baguette should.", shelf: "pku" },
  { slug: "low-protein-vanilla-cake",                       code: "R-24", title: "Crystal · Vanilla Cake PKU",              arabicTitle: "كيك فانيليا PKU",          productSlug: "vanilla-cake-pku",          imageUrl: imageMap["low-protein-vanilla-cake"]                   || "/images/recipes/low-protein-vanilla-cake.jpg",                   time: "45 min", yield: "1 × 22cm cake",  summary: "Low-protein vanilla cake. For PKU birthdays — which should never have to be a quiet event.", shelf: "pku" },
];

export const recipeBySlug = (slug: string) => recipes.find((r) => r.slug === slug);
export const recipesByShelf = (s: RecipeShelf) => recipes.filter((r) => r.shelf === s);
