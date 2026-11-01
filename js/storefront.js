window.LORYS = window.LORYS || {};

(function () {
  var LANGUAGE_KEY = "lorys-language";
  var CURRENCY_KEY = "lorys-currency";
  var RATES_KEY = "lorys-exchange-rates";
  var RATES_URL = "https://open.er-api.com/v6/latest/TWD";
  var RATES_TTL = 24 * 60 * 60 * 1000;
  var supportedCurrencies = ["TWD", "USD", "JPY", "HKD", "SGD", "MYR"];
  var messages = {
    "language.toggle": { zh: "English", en: "繁體中文" },
    "language.label": { zh: "切換語言", en: "Change language" },
    "currency.label": { zh: "選擇貨幣", en: "Choose currency" },
    "currency.updating": { zh: "正在更新匯率…", en: "Updating exchange rates…" },
    "currency.failed": { zh: "無法取得匯率，已切回新台幣。請稍後再試。", en: "Exchange rates are unavailable. Switched back to TWD; please try again later." },
    "currency.stale": { zh: "目前無法更新匯率，暫用上次取得的匯率。", en: "Rates could not be refreshed. Using the last available rates." },
    "currency.note": { zh: "外幣金額依線上匯率估算，僅供參考；實際結帳金額以新台幣計價。", en: "Foreign-currency prices are estimates for reference only. Checkout is charged in TWD." },
    "currency.attribution": { zh: "匯率資料來源：Exchange Rate API", en: "Rates by Exchange Rate API" },
    "page.homeTitle": { zh: "LORY'S — 剛剛好的素面 T 恤", en: "LORY'S — The Perfect Everyday Tee" },
    "page.homeDescription": { zh: "以優質純棉打造，陪伴日常的重磅 T 恤。簡約剪裁，舒適合身。", en: "Premium cotton tees made for everyday wear, with clean lines and a considered fit." },
    "page.productTitle": { zh: "LORY'S — 商品資訊", en: "LORY'S — Product Details" },
    "page.productDescription": { zh: "LORY'S 素面 T 恤系列，嚴選優質純棉，講究每一處剪裁。", en: "Explore LORY'S plain tees, crafted from premium cotton with considered cuts." },
    "nav.primary": { zh: "主要導覽", en: "Primary navigation" },
    "nav.home": { zh: "返回首頁", en: "Back to home" },
    "nav.new": { zh: "新品上市", en: "New Arrivals" },
    "nav.shop": { zh: "所有商品", en: "Shop All" },
    "nav.features": { zh: "商品特色", en: "Features" },
    "nav.about": { zh: "品牌故事", en: "About" },
    "nav.faq": { zh: "常見問題", en: "FAQs" },
    "search.label": { zh: "搜尋", en: "Search" },
    "search.placeholder": { zh: "搜尋商品", en: "Search products" },
    "cart.open": { zh: "開啟購物袋", en: "Open shopping bag" },
    "hero.imageAlt": { zh: "米色與灰色 LORY'S 標誌 T 恤", en: "LORY'S logo tees in cream and gray" },
    "hero.eyebrow": { zh: "LORY'S 日常基本款", en: "LORY'S EVERYDAY ESSENTIALS" },
    "hero.line1": { zh: "剛剛好的", en: "The Perfect" },
    "hero.line2": { zh: "素面 T 恤。", en: "Everyday Tee." },
    "hero.description": { zh: "嚴選重磅純棉，為日常穿著而生。簡約不繁複，只為恰到好處的版型與質感。", en: "Premium heavyweight cotton for everyday wear. A clean, considered fit with nothing unnecessary." },
    "hero.shop": { zh: "探索全系列", en: "Explore the Collection" },
    "collection.eyebrow": { zh: "精選系列", en: "THE COLLECTION" },
    "collection.title": { zh: "日常基本款", en: "Everyday Essentials" },
    "collection.description": { zh: "四種版型，三款色選。回歸純粹，耐穿、耐洗，值得珍藏。", en: "Four considered fits. Three versatile colors. Made to wear, wash, and keep." },
    "feature.cotton.title": { zh: "嚴選優質純棉", en: "PREMIUM COTTON" },
    "feature.cotton.description": { zh: "採用長纖棉，經水洗處理，觸感柔和舒適。", en: "Long-staple cotton, garment-washed for a soft, comfortable hand-feel." },
    "feature.collar.title": { zh: "耐穿不易變形領口", en: "SHAPE-RETAINING RIBBED COLLAR" },
    "feature.collar.description": { zh: "加密羅紋設計，反覆穿著依然維持俐落有型。", en: "A denser rib that keeps its shape, wear after wear." },
    "feature.weight.title": { zh: "重磅有型，不易透膚", en: "HEAVYWEIGHT, NON-SHEER COTTON" },
    "feature.weight.description": { zh: "厚實布料兼具挺度與舒適，不僵硬、不透膚。", en: "Substantial cotton with natural structure and comfort, without feeling stiff." },
    "about.eyebrow": { zh: "關於 LORY'S", en: "THE HOUSE" },
    "about.title": { zh: "布料純粹，版型歷久彌新。", en: "Quiet cloth. A lasting cut." },
    "about.description": { zh: "LORY'S 將簡約化為日常。我們以優質純棉打造俐落剪裁的素面 T 恤，不追逐標誌與季節潮流。融合自在舒適與細緻工藝，穿上後自然合身、自在無拘。", en: "LORY'S is a study in restraint. We make clean-cut tees in premium cotton, without logos or seasonal noise. Everyday ease meets considered craftsmanship in a fit that feels naturally yours." },
    "recent.eyebrow": { zh: "瀏覽紀錄", en: "BROWSING HISTORY" },
    "recent.title": { zh: "最近瀏覽", en: "Recently Viewed" },
    "recent.description": { zh: "回顧看過的款式，方便再次查看與比較。", en: "Revisit styles you have viewed and compare your favorites." },
    "newsletter.description": { zh: "訂閱 LORY'S 電子報，掌握新品、補貨與品牌近況。", en: "Sign up for notes on new arrivals, restocks, and the latest from LORY'S." },
    "newsletter.placeholder": { zh: "電子郵件地址", en: "Email address" },
    "newsletter.submit": { zh: "訂閱", en: "Subscribe" },
    "footer.care": { zh: "常見問題", en: "FAQs" },
    "footer.faq.toggle": { zh: "切換常見問題", en: "Toggle FAQs" },
    "footer.follow": { zh: "追蹤我們", en: "Follow Us" },
    "faq.returns.question": { zh: "退換貨說明", en: "Returns & Exchanges" },
    "faq.returns.answer": { zh: "商品未穿著且吊牌完整，於 14 天內可申請免費換貨。", en: "Free exchanges are available within 14 days for unworn items with tags attached." },
    "faq.dispatch.question": { zh: "出貨／配送時間", en: "Shipping & Delivery Time" },
    "faq.dispatch.answer": { zh: "台灣本島標準配送約 2 至 4 個工作天；實際出貨日依訂單安排為準。", en: "Standard delivery within Taiwan takes about 2–4 business days. Dispatch timing depends on the order." },
    "faq.shipping.question": { zh: "運費計算", en: "Shipping Fees" },
    "faq.shipping.answer": { zh: "訂單滿 NT$3,000 即享免運；未達門檻時，運費會於結帳前顯示。", en: "Enjoy free shipping on orders of NT$3,000 or more. Shipping fees for other orders are shown before checkout." },
    "faq.payment.question": { zh: "付款方式", en: "Payment Methods" },
    "faq.payment.answer": { zh: "提供信用卡、銀行轉帳、LINE Pay，以及限台灣地區的貨到付款。", en: "We accept credit cards, bank transfers, LINE Pay, and cash on delivery in Taiwan only." },
    "faq.tracking.question": { zh: "訂單進度查詢", en: "Track an Order" },
    "faq.tracking.answer": { zh: "請透過線上客服並提供訂單編號查詢；客服聯絡資訊將另行公告。", en: "Contact online support with your order number to check its status. Support contact details will be announced soon." },
    "faq.support.question": { zh: "聯絡線上客服", en: "Contact Online Support" },
    "faq.support.answer": { zh: "線上客服聯絡資訊將另行公告，敬請留意。", en: "Online support contact details will be announced soon." },
    "faq.garment.question": { zh: "衣物保養", en: "Garment Care" },
    "faq.garment.answer": { zh: "請翻面冷水洗滌，平放晾乾，避免使用烘衣機。", en: "Wash inside out in cold water. Lay flat to dry. Do not tumble dry." },
    "footer.copyright": { zh: "版權所有 © 2026 LORY'S", en: "Copyright © 2026 LORY'S. All rights reserved." },
    "product.home": { zh: "首頁", en: "Home" },
    "product.details": { zh: "商品資訊", en: "Product Details" },
    "product.size": { zh: "尺寸", en: "Size" },
    "sizeGuide.open": { zh: "查看尺寸對照表", en: "View Size Guide" },
    "sizeGuide.title": { zh: "尺寸對照表", en: "Size Guide" },
    "sizeGuide.unit": { zh: "公分 (cm)", en: "Centimeters (cm)" },
    "sizeGuide.subtitle": { zh: "平量尺寸", en: "Garment laid flat" },
    "sizeGuide.note": { zh: "以下為一般尺寸參考，並非此款商品的實際量測值。不同版型與測量方式可能造成差異，建議同時參考商品描述。", en: "These are general size references, not measurements of this specific product. Fit and measuring methods may vary; please also refer to the product description." },
    "sizeGuide.size": { zh: "尺寸", en: "Size" },
    "sizeGuide.chest": { zh: "胸寬", en: "Chest" },
    "sizeGuide.shoulder": { zh: "肩寬", en: "Shoulder" },
    "sizeGuide.length": { zh: "衣長", en: "Length" },
    "sizeGuide.sleeve": { zh: "袖長", en: "Sleeve" },
    "sizeGuide.measurement": { zh: "* 手工平量可能有 ±2 cm 誤差。胸寬為衣服平放後腋下位置的單面寬度。", en: "* Allow ±2 cm for manual flat measurements. Chest is measured flat across the garment below the armhole." },
    "sizeGuide.close": { zh: "關閉尺寸對照表", en: "Close size guide" },
    "product.color": { zh: "顏色", en: "Color" },
    "product.quantity": { zh: "數量", en: "Quantity" },
    "product.add": { zh: "加入購物車", en: "Add to Cart" },
    "product.buy": { zh: "立即購買", en: "Buy Now" },
    "product.titlePrefix": { zh: "商品資訊", en: "Product" },
    "search.noResults": { zh: "找不到符合的商品。", en: "No matching products found." },
    "quickAdd": { zh: "快速加入", en: "Quick Add" },
    "newsletter.success": { zh: "已成功訂閱電子報", en: "You are subscribed to the newsletter." },
    "cart.title": { zh: "購物袋", en: "Your Bag" },
    "cart.close": { zh: "關閉購物袋", en: "Close shopping bag" },
    "cart.empty": { zh: "購物袋目前沒有商品。", en: "Your bag is currently empty." },
    "cart.subtotal": { zh: "小計", en: "Subtotal" },
    "cart.shipping": { zh: "運費將於結帳時另行計算。", en: "Shipping is calculated at checkout." },
    "cart.checkout": { zh: "前往結帳", en: "Checkout" },
    "cart.remove": { zh: "移除商品", en: "Remove item" },
    "cart.added": { zh: "已加入購物袋", en: "Added to your bag" },
    "cart.checkoutSoon": { zh: "結帳功能即將推出", en: "Checkout is coming soon." },
    "color.black": { zh: "黑色", en: "Black" },
    "color.white": { zh: "白色", en: "White" },
    "color.earth": { zh: "大地色", en: "Earth" }
  };
  function readStorage(key) {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.warn("Unable to read storefront preferences.", error);
      return null;
    }
  }

  function writeStorage(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.warn("Unable to save storefront preferences.", error);
    }
  }

  var language = readStorage(LANGUAGE_KEY) === "en" ? "en" : "zh";
  var savedCurrency = readStorage(CURRENCY_KEY);
  var currency = supportedCurrencies.indexOf(savedCurrency) !== -1 ? savedCurrency : "TWD";
  var rates = { TWD: 1 };
  var hasLiveRates = false;
  var ratesUpdatedAt = 0;
  var request = null;
  var statusKey = "";

  function translate(key) {
    var entry = messages[key];
    return entry ? entry[language] : key;
  }

  function applyTranslations(root) {
    var scope = root || document;
    function select(selector) {
      var nodes = Array.prototype.slice.call(scope.querySelectorAll(selector));
      if (scope.matches && scope.matches(selector)) nodes.unshift(scope);
      return nodes;
    }
    select("[data-i18n]").forEach(function (node) {
      node.textContent = translate(node.getAttribute("data-i18n"));
    });
    ["placeholder", "aria-label", "content", "alt"].forEach(function (attribute) {
      select("[data-i18n-" + attribute + "]").forEach(function (node) {
        node.setAttribute(
          attribute,
          translate(node.getAttribute("data-i18n-" + attribute))
        );
      });
    });
  }

  function refreshStatus() {
    var status = document.getElementById("storefront-status");
    if (!status) return;
    status.textContent = statusKey ? translate(statusKey) : "";
    status.classList.toggle("hidden", !statusKey);
  }

  function setStatus(key) {
    statusKey = key;
    refreshStatus();
  }

  function dispatch(name) {
    document.dispatchEvent(new CustomEvent("lorys:" + name));
  }

  function setLanguage(nextLanguage) {
    if (nextLanguage !== "zh" && nextLanguage !== "en") return;
    if (language === nextLanguage) return;
    language = nextLanguage;
    writeStorage(LANGUAGE_KEY, language);
    document.documentElement.lang = language === "en" ? "en" : "zh-Hant";
    applyTranslations(document);
    refreshStatus();
    dispatch("languagechange");
  }

  function readRateCache() {
    var cached = readStorage(RATES_KEY);
    if (!cached) return null;
    try {
      var value = JSON.parse(cached);
      if (!value || !value.rates || value.rates.TWD !== 1) return null;
      if (!supportedCurrencies.every(function (code) {
        return Number.isFinite(value.rates[code]) && value.rates[code] > 0;
      })) return null;
      return value;
    } catch (error) {
      console.warn("Unable to parse cached exchange rates.", error);
      return null;
    }
  }

  function acceptRates(data) {
    if (!data || data.result !== "success" || data.base_code !== "TWD" || !data.rates) {
      throw new Error("The exchange-rate service returned an invalid response.");
    }
    var nextRates = {};
    supportedCurrencies.forEach(function (code) {
      var value = Number(data.rates[code]);
      if (!Number.isFinite(value) || value <= 0) {
        throw new Error("The exchange-rate response is missing " + code + ".");
      }
      nextRates[code] = value;
    });
    nextRates.TWD = 1;
    rates = nextRates;
    hasLiveRates = true;
    ratesUpdatedAt = Number(data.time_last_update_unix) * 1000 || Date.now();
    writeStorage(RATES_KEY, JSON.stringify({
      rates: rates,
      updatedAt: ratesUpdatedAt
    }));
    setStatus("");
    dispatch("currencychange");
  }

  function fetchRates() {
    if (request) return request;
    if (typeof fetch !== "function") {
      setStatus(hasLiveRates ? "currency.stale" : "currency.failed");
      return Promise.resolve(hasLiveRates ? rates : null);
    }
    setStatus("currency.updating");
    var controller = new AbortController();
    var timeout = setTimeout(function () {
      controller.abort();
    }, 12000);
    request = fetch(RATES_URL, {
      cache: "no-store",
      signal: controller.signal
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Exchange-rate request failed with status " + response.status + ".");
        }
        return response.json();
      })
      .then(function (data) {
        acceptRates(data);
        return rates;
      })
      .catch(function (error) {
        console.warn("Unable to update exchange rates.", error);
        setStatus(hasLiveRates ? "currency.stale" : "currency.failed");
        return hasLiveRates ? rates : null;
      })
      .then(function (result) {
        clearTimeout(timeout);
        request = null;
        if (!result && currency !== "TWD") {
          currency = "TWD";
          writeStorage(CURRENCY_KEY, currency);
          updateCurrencySelect();
        }
        return result;
      });
    return request;
  }

  function updateCurrencySelect() {
    var select = document.getElementById("currency-select");
    if (select) select.value = currency;
  }

  function chooseCurrency(nextCurrency) {
    if (supportedCurrencies.indexOf(nextCurrency) === -1) {
      return Promise.resolve(false);
    }
    if (nextCurrency === "TWD") {
      currency = nextCurrency;
      writeStorage(CURRENCY_KEY, currency);
      setStatus("");
      dispatch("currencychange");
      return Promise.resolve(true);
    }
    var ready = rates && rates[nextCurrency] ? Promise.resolve(rates) : fetchRates();
    return ready.then(function (availableRates) {
      if (!availableRates || !availableRates[nextCurrency]) {
        updateCurrencySelect();
        return false;
      }
      currency = nextCurrency;
      writeStorage(CURRENCY_KEY, currency);
      updateCurrencySelect();
      dispatch("currencychange");
      return true;
    });
  }

  function formatPrice(amount) {
    if (!rates || !rates[currency]) {
      throw new Error("Exchange rates are not available for " + currency + ".");
    }
    var convertedAmount = Number(amount) * rates[currency];
    if (currency === "TWD") {
      return "NT$" + convertedAmount.toLocaleString("en-US");
    }
    return new Intl.NumberFormat(language === "en" ? "en-US" : "zh-TW", {
      style: "currency",
      currency: currency
    }).format(convertedAmount);
  }

  LORYS.locale = {
    getLanguage: function () {
      return language;
    },
    t: translate,
    productText: function (product, field) {
      return language === "en" && product[field + "En"]
        ? product[field + "En"]
        : product[field];
    },
    setLanguage: setLanguage,
    apply: applyTranslations
  };

  LORYS.currency = {
    supported: supportedCurrencies.slice(),
    getCode: function () {
      return currency;
    },
    formatPrice: formatPrice,
    choose: chooseCurrency
  };

  var cachedRates = readRateCache();
  if (cachedRates) {
    rates = cachedRates.rates;
    ratesUpdatedAt = cachedRates.updatedAt;
    hasLiveRates = true;
  }
  var ratesAreFresh = cachedRates && Date.now() - ratesUpdatedAt < RATES_TTL;
  if (ratesAreFresh) {
    LORYS.currency.ready = Promise.resolve(rates);
  } else {
    var rateRequest = fetchRates();
    LORYS.currency.ready = currency !== "TWD" && !cachedRates
      ? rateRequest
      : Promise.resolve(rates);
  }

  document.documentElement.lang = language === "en" ? "en" : "zh-Hant";
  applyTranslations(document);
  updateCurrencySelect();

  var languageToggle = document.getElementById("language-toggle");
  if (languageToggle) {
    languageToggle.addEventListener("click", function () {
      setLanguage(language === "zh" ? "en" : "zh");
    });
  }

  var currencySelect = document.getElementById("currency-select");
  if (currencySelect) {
    currencySelect.value = currency;
    currencySelect.addEventListener("change", function () {
      currencySelect.disabled = true;
      chooseCurrency(currencySelect.value).then(function (success) {
        currencySelect.disabled = false;
        if (!success) updateCurrencySelect();
      });
    });
  }

  document.addEventListener("lorys:languagechange", refreshStatus);

  document.querySelectorAll("[data-faq-toggle]").forEach(function (button) {
    var panel = document.getElementById(button.getAttribute("aria-controls"));
    if (!panel) {
      throw new Error("Customer service FAQ panel was not found.");
    }
    var arrow = button.querySelector("[data-faq-arrow]");
    button.addEventListener("click", function () {
      var expanded = button.getAttribute("aria-expanded") !== "true";
      button.setAttribute("aria-expanded", String(expanded));
      panel.hidden = !expanded;
      if (arrow) arrow.classList.toggle("rotate-180", expanded);
    });
  });

  function openFaqForHash() {
    if (window.location.hash !== "#customer-service") return;
    var button = document.querySelector("[data-faq-toggle]");
    if (!button) return;
    var panel = document.getElementById(button.getAttribute("aria-controls"));
    var arrow = button.querySelector("[data-faq-arrow]");
    button.setAttribute("aria-expanded", "true");
    panel.hidden = false;
    if (arrow) arrow.classList.add("rotate-180");
    window.requestAnimationFrame(function () {
      var section = document.getElementById("customer-service");
      if (section) section.scrollIntoView();
    });
  }

  window.addEventListener("hashchange", openFaqForHash);
  openFaqForHash();
})();
