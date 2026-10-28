window.LORYS = window.LORYS || {};

LORYS.products = [
  {
    id: "daily-crewneck",
    code: "01",
    name: "日常圓領 T 恤",
    tagline: "5.6 盎司・經典版",
    price: 1480,
    description:
      "以中磅精梳棉打造的日常圓領 T 恤。俐落肩線、合身袖型，搭配耐穿不易鬆垮的羅紋領口。簡約百搭，細節依然講究。",
    fabric: "100% 精梳棉，5.6 盎司 / 190 克/平方公尺",
    images: ["assets/daily-crewneck-lorys.jpg"],
    colorImages: {
      black: "assets/daily-crewneck-black.jpg?v=2",
      white: "assets/daily-crewneck-white.jpg?v=2",
      earth: "assets/daily-crewneck-lorys.jpg"
    }
  },
  {
    id: "heavyweight-boxy",
    code: "02",
    name: "重磅寬版 T 恤",
    tagline: "7.1 盎司・重磅版",
    price: 1580,
    description:
      "以厚實 7.1 盎司純棉呈現俐落寬版輪廓。布料挺而有份量，穿著舒適有型，適合喜愛低調質感的你。",
    fabric: "100% 重磅純棉，7.1 盎司 / 240 克/平方公尺",
    images: [
      "https://images.unsplash.com/photo-1618517351616-67eaed001786?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1400&q=80"
    ]
  },
  {
    id: "luxury-supima",
    code: "03",
    name: "Supima 頂級棉 T 恤",
    tagline: "絲滑細緻觸感",
    price: 1780,
    description:
      "採用長纖 Supima 棉，帶有細緻柔和的光澤。細密織法、精緻領口與恰到好處的衣長，呈現不張揚的舒適質感。",
    fabric: "100% Supima 長纖棉，絲滑細密針織",
    images: [
      "https://images.unsplash.com/photo-1622445275576-721325763afe?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&w=1400&q=80"
    ]
  },
  {
    id: "oversized-drop",
    code: "04",
    name: "落肩寬鬆 T 恤",
    tagline: "自在寬鬆版型",
    price: 1650,
    description:
      "加長落肩剪裁，身形自在不拘束。布料垂墜有份量、不貼身，領口仍保有俐落線條，展現輕鬆從容的輪廓。",
    fabric: "100% 純棉針織布，中重磅",
    images: [
      "https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1400&q=80"
    ]
  }
];

LORYS.colors = [
  { id: "black", label: "黑色", hex: "#1A1A1A" },
  { id: "white", label: "白色", hex: "#FFFFFF" },
  { id: "earth", label: "大地色", hex: "#C4B09A" }
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
