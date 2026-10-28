window.LORYS = window.LORYS || {};

LORYS.products = [
  {
    id: "daily-crewneck",
    code: "01",
    name: "The Daily Crewneck",
    tagline: "5.6oz Classic",
    price: 480,
    description:
      "A restrained everyday crewneck cut from mid-weight combed cotton. Clean shoulder line, set-in sleeve, and a rib that holds its shape. Designed to disappear into a wardrobe — and still feel considered.",
    fabric: "100% combed cotton, 5.6oz / 190gsm",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&w=1400&q=80"
    ]
  },
  {
    id: "heavyweight-boxy",
    code: "02",
    name: "The Heavyweight Boxy Tee",
    tagline: "7.1oz Heavy",
    price: 580,
    description:
      "A boxy, architectural silhouette in dense 7.1oz cotton. The drape is firm, the hand-feel substantial. Made for those who prefer presence without print.",
    fabric: "100% heavy cotton, 7.1oz / 240gsm",
    images: [
      "https://images.unsplash.com/photo-1618517351616-67eaed001786?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1400&q=80"
    ]
  },
  {
    id: "luxury-supima",
    code: "03",
    name: "The Luxury Supima Tee",
    tagline: "Silky Finish",
    price: 780,
    description:
      "Long-staple Supima cotton with a quietly luminous finish. Fine gauge, refined collar, and a length that sits cleanly at the hip. Luxury, without announcement.",
    fabric: "100% Supima cotton, silky compact knit",
    images: [
      "https://images.unsplash.com/photo-1622445275576-721325763afe?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&w=1400&q=80"
    ]
  },
  {
    id: "oversized-drop",
    code: "04",
    name: "The Oversized Drop-Shoulder",
    tagline: "Relaxed Line",
    price: 650,
    description:
      "An elongated drop-shoulder with ease through the body. Weighted enough to fall, never cling. The silhouette of ease — still tailored at the neckline.",
    fabric: "100% cotton jersey, mid-heavy weight",
    images: [
      "https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1400&q=80"
    ]
  }
];

LORYS.colors = [
  { id: "black", label: "Black", hex: "#1A1A1A" },
  { id: "white", label: "White", hex: "#FFFFFF" },
  { id: "earth", label: "Earth", hex: "#C4B09A" }
];

LORYS.sizes = ["S", "M", "L", "XL"];

LORYS.formatPrice = function (n) {
  return "NT$" + Number(n).toLocaleString("en-US");
};

LORYS.getProduct = function (id) {
  return LORYS.products.find(function (p) {
    return p.id === id;
  });
};
