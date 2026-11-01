window.LORYS = window.LORYS || {};

(function () {
  var RECENTLY_VIEWED_KEY = "lorys-recently-viewed";
  var MAX_RECENTLY_VIEWED = 4;

  function getProductImage(product, color, index) {
    if (index === 0 && product.colorImages && product.colorImages[color]) {
      return product.colorImages[color];
    }
    return product.images[index] || product.images[0];
  }

  function productText(product, field) {
    return LORYS.locale.productText(product, field);
  }

  function refreshPrices() {
    document.querySelectorAll("[data-price-twd]").forEach(function (node) {
      node.textContent = LORYS.formatPrice(
        Number(node.getAttribute("data-price-twd"))
      );
    });
  }

  var sizeGuideDialog = document.getElementById("size-guide-dialog");
  if (sizeGuideDialog) {
    document.addEventListener("click", function (event) {
      var target = event.target;
      var openButton =
        target instanceof Element ? target.closest("[data-open-size-guide]") : null;
      if (openButton) {
        sizeGuideDialog.showModal();
      }
    });

    var closeButton = sizeGuideDialog.querySelector("[data-close-size-guide]");
    if (closeButton) {
      closeButton.addEventListener("click", function () {
        sizeGuideDialog.close();
      });
    }

    sizeGuideDialog.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && sizeGuideDialog.open) {
        event.preventDefault();
        sizeGuideDialog.close();
      }
    });

    sizeGuideDialog.addEventListener("click", function (event) {
      if (event.target === sizeGuideDialog) sizeGuideDialog.close();
    });
  }

  function getRecentlyViewedIds() {
    try {
      var ids = JSON.parse(localStorage.getItem(RECENTLY_VIEWED_KEY)) || [];
      if (!Array.isArray(ids)) return [];
      return ids.filter(function (id) {
        return typeof id === "string" && LORYS.getProduct(id);
      });
    } catch (error) {
      console.warn("無法讀取最近瀏覽紀錄。", error);
      return [];
    }
  }

  function recordRecentlyViewed(product) {
    var ids = getRecentlyViewedIds().filter(function (id) {
      return id !== product.id;
    });
    ids.unshift(product.id);
    try {
      localStorage.setItem(
        RECENTLY_VIEWED_KEY,
        JSON.stringify(ids.slice(0, MAX_RECENTLY_VIEWED))
      );
    } catch (error) {
      console.warn("無法儲存最近瀏覽紀錄。", error);
    }
  }

  function renderRecentlyViewed() {
    var section = document.getElementById("recently-viewed");
    var grid = document.getElementById("recently-viewed-grid");
    if (!section || !grid) return;

    var products = getRecentlyViewedIds()
      .map(function (id) {
        return LORYS.getProduct(id);
      })
      .filter(Boolean);
    if (!products.length) return;

    section.classList.remove("hidden");
    grid.innerHTML = products
      .map(function (product) {
        return (
          '<article class="product-card group">' +
          '<a href="product-detail.html?id=' +
          product.id +
          '" class="block overflow-hidden bg-[#F9F9F9]">' +
          '<img src="' +
          getProductImage(product, "black", 0) +
          '" alt="' +
          productText(product, "name") +
          '" class="aspect-[3/4] w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04] group-hover:opacity-80">' +
          "</a>" +
          '<a href="product-detail.html?id=' +
          product.id +
          '" class="mt-4 block">' +
          '<p class="text-[11px] tracking-[0.2em] text-neutral-500">' +
          product.code +
          " / " +
          productText(product, "tagline") +
          "</p>" +
          '<h3 class="mt-1 text-sm tracking-wide">' +
          productText(product, "name") +
          "</h3>" +
          '<p class="mt-1 text-sm" data-price-twd="' +
          product.price +
          '">' +
          LORYS.formatPrice(product.price) +
          "</p>" +
          "</a>" +
          "</article>"
        );
      })
      .join("");
  }

  function bindChrome() {
    var menuBtn = document.getElementById("menu-toggle");
    var menu = document.getElementById("mobile-menu");
    if (menuBtn && menu) {
      menuBtn.addEventListener("click", function () {
        var open = menu.classList.toggle("is-open");
        menuBtn.setAttribute("aria-expanded", String(open));
      });
    }

    document.querySelectorAll("[data-open-cart]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        LORYS.ui.openCart();
      });
    });

    var searchToggle = document.getElementById("search-toggle");
    var searchPanel = document.getElementById("search-panel");
    var searchInput = document.getElementById("search-input");
    var searchResults = document.getElementById("search-results");

    if (searchToggle && searchPanel) {
      searchToggle.addEventListener("click", function () {
        searchPanel.classList.toggle("is-open");
        if (searchPanel.classList.contains("is-open") && searchInput) {
          setTimeout(function () {
            searchInput.focus();
          }, 50);
        }
      });
    }

    if (searchInput && searchResults) {
      searchInput.addEventListener("input", function () {
        var q = searchInput.value.trim().toLowerCase();
        if (!q) {
          searchResults.innerHTML = "";
          return;
        }
        var matches = LORYS.products.filter(function (p) {
          return (
            p.name +
            " " +
            p.nameEn +
            " " +
            p.tagline +
            " " +
            p.taglineEn
          ).toLowerCase().indexOf(q) !== -1;
        });
        searchResults.innerHTML = matches.length
          ? matches
              .map(function (p) {
                return (
                  '<a class="block border-b border-neutral-100 py-3 text-sm hover:text-neutral-500" href="product-detail.html?id=' +
                  p.id +
                  '">' +
                  p.code +
                  " / " +
                  productText(p, "name") +
                  "</a>"
                );
              })
              .join("")
          : '<p class="py-3 text-sm text-neutral-500">' +
            LORYS.locale.t("search.noResults") +
            "</p>";
      });
    }

    var form = document.getElementById("newsletter-form");
    if (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        var input = form.querySelector("input[type='email']");
        if (!input.value) return;
        input.value = "";
        LORYS.ui.toast(
          LORYS.locale.t("newsletter.success"),
          "newsletter.success"
        );
      });
    }
  }

  function renderHomeGrid() {
    var grid = document.getElementById("product-grid");
    if (!grid) return;

    grid.innerHTML = LORYS.products
      .map(function (p) {
        return (
          '<article class="product-card group">' +
          '<div class="relative overflow-hidden bg-[#F9F9F9]">' +
          '<a href="product-detail.html?id=' +
          p.id +
          '" class="block aspect-[3/4]">' +
          '<img src="' +
          getProductImage(p, "black", 0) +
          '" alt="' +
          productText(p, "name") +
          '" class="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04] group-hover:opacity-80">' +
          "</a>" +
          '<button type="button" data-quick-add="' +
          p.id +
          '" class="quick-add absolute bottom-4 left-4 right-4 bg-[#1A1A1A] py-3 text-[11px] tracking-[0.22em] text-white transition hover:bg-neutral-600">' +
          LORYS.locale.t("quickAdd") +
          "</button>" +
          "</div>" +
          '<a href="product-detail.html?id=' +
          p.id +
          '" class="mt-4 block">' +
          '<p class="text-[11px] tracking-[0.2em] text-neutral-500">' +
          p.code +
          " / " +
          productText(p, "tagline") +
          "</p>" +
          '<h3 class="mt-1 text-sm tracking-wide">' +
          productText(p, "name") +
          "</h3>" +
          '<p class="mt-1 text-sm" data-price-twd="' +
          p.price +
          '">' +
          LORYS.formatPrice(p.price) +
          "</p>" +
          "</a>" +
          "</article>"
        );
      })
      .join("");

    if (!grid.dataset.quickAddBound) {
      grid.dataset.quickAddBound = "true";
      grid.addEventListener("click", function (event) {
        var btn = event.target.closest("[data-quick-add]");
        if (!btn) return;
        event.preventDefault();
        var product = LORYS.getProduct(btn.getAttribute("data-quick-add"));
        LORYS.cart.add({
          id: product.id,
          name: productText(product, "name"),
          tagline: productText(product, "tagline"),
          price: product.price,
          image: getProductImage(product, "black", 0),
          size: "M",
          color: "black",
          qty: 1
        });
      });
    }
  }

  var repaintProductPage = null;

  function renderProductPage() {
    var root = document.getElementById("product-detail");
    if (!root) return;

    var params = new URLSearchParams(window.location.search);
    var product = LORYS.getProduct(params.get("id")) || LORYS.products[0];
    recordRecentlyViewed(product);
    var state = { size: "M", color: "black", qty: 1, image: 0 };

    function paint() {
      document.title =
        "LORY'S — " + productText(product, "name");
      root.innerHTML =
        '<div class="grid gap-10 lg:grid-cols-2 lg:gap-16">' +
        '<div>' +
        '<div class="overflow-hidden bg-[#F9F9F9]">' +
        '<img id="product-main-image" src="' +
        getProductImage(product, state.color, state.image) +
        '" alt="' +
        productText(product, "name") +
        '" class="aspect-[4/5] w-full object-cover object-center">' +
        "</div>" +
        (product.images.length > 1
          ? '<div class="mt-3 grid grid-cols-3 gap-3">' +
            product.images
              .map(function (src, i) {
                return (
                  '<button type="button" data-thumb="' +
                  i +
                  '" class="overflow-hidden bg-[#F9F9F9] ' +
                  (i === state.image ? "ring-1 ring-[#1A1A1A] ring-offset-2" : "opacity-70 hover:opacity-100") +
                  '">' +
                  '<img src="' +
                  getProductImage(product, state.color, i) +
                  '" alt="" class="aspect-square w-full object-cover">' +
                  "</button>"
                );
              })
              .join("") +
            "</div>"
          : "") +
        "</div>" +
        '<div class="lg:pt-6">' +
        '<p class="text-[11px] tracking-[0.22em] text-neutral-500">' +
        product.code +
        " / " +
        productText(product, "tagline") +
        "</p>" +
        '<h1 class="mt-3 font-display text-3xl font-bold tracking-wide md:text-4xl">' +
        productText(product, "name") +
        "</h1>" +
        '<p class="mt-4 text-lg" data-price-twd="' +
        product.price +
        '">' +
        LORYS.formatPrice(product.price) +
        "</p>" +
        '<p class="mt-6 max-w-md text-sm leading-7 text-neutral-600">' +
        productText(product, "description") +
        "</p>" +
        '<p class="mt-3 text-xs tracking-wide text-neutral-500">' +
        productText(product, "fabric") +
        "</p>" +
        '<div class="mt-8">' +
        '<p class="mb-3 text-[11px] tracking-[0.2em]">' +
        LORYS.locale.t("product.size") +
        " — " +
        state.size +
        "</p>" +
        '<div class="flex gap-2">' +
        LORYS.sizes
          .map(function (size) {
            return (
              '<button type="button" data-size="' +
              size +
              '" class="size-btn h-11 w-11 border border-neutral-300 text-xs tracking-wider ' +
              (state.size === size ? "is-active bg-[#1A1A1A] text-white" : "hover:border-[#1A1A1A]") +
              '">' +
              size +
              "</button>"
            );
          })
          .join("") +
        "</div>" +
        '<button type="button" class="mt-4 text-sm font-medium text-[#8A5A44] underline decoration-[#8A5A44]/50 underline-offset-4 transition hover:text-[#6F4433] hover:decoration-[#6F4433]" data-open-size-guide aria-haspopup="dialog" aria-label="' +
        LORYS.locale.t("sizeGuide.open") +
        '">' +
        LORYS.locale.t("sizeGuide.open") +
        "</button>" +
        "</div>" +
        '<div class="mt-8">' +
        '<p class="mb-3 text-[11px] tracking-[0.2em]">' +
        LORYS.locale.t("product.color") +
        " — " +
        colorLabel(state.color) +
        "</p>" +
        '<div class="flex gap-3">' +
        LORYS.colors
          .map(function (c) {
            return (
              '<button type="button" data-color="' +
              c.id +
              '" aria-label="' +
              colorLabel(c.id) +
              '" class="swatch h-7 w-7 rounded-full ' +
              (state.color === c.id ? "is-active" : "") +
              '" style="background:' +
              c.hex +
              '"></button>'
            );
          })
          .join("") +
        "</div>" +
        "</div>" +
        '<div class="mt-8">' +
        '<p class="mb-3 text-[11px] tracking-[0.2em]">' +
        LORYS.locale.t("product.quantity") +
        "</p>" +
        '<div class="inline-flex items-center border border-neutral-300">' +
        '<button type="button" id="qty-minus" class="h-11 w-11">−</button>' +
        '<span class="w-10 text-center text-sm">' +
        state.qty +
        "</span>" +
        '<button type="button" id="qty-plus" class="h-11 w-11">+</button>' +
        "</div>" +
        "</div>" +
        '<div class="mt-10 space-y-3">' +
        '<button type="button" id="add-to-cart" class="w-full bg-[#1A1A1A] py-4 text-xs tracking-[0.22em] text-white transition hover:bg-neutral-600">' +
        LORYS.locale.t("product.add") +
        "</button>" +
        '<button type="button" id="buy-now" class="w-full border border-[#1A1A1A] py-4 text-xs tracking-[0.22em] transition hover:bg-[#1A1A1A] hover:text-white">' +
        LORYS.locale.t("product.buy") +
        "</button>" +
        "</div>" +
        "</div>" +
        "</div>";

      root.querySelectorAll("[data-thumb]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          state.image = Number(btn.getAttribute("data-thumb"));
          paint();
        });
      });
      root.querySelectorAll("[data-size]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          state.size = btn.getAttribute("data-size");
          paint();
        });
      });
      root.querySelectorAll("[data-color]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          state.color = btn.getAttribute("data-color");
          paint();
        });
      });
      document.getElementById("qty-minus").addEventListener("click", function () {
        state.qty = Math.max(1, state.qty - 1);
        paint();
      });
      document.getElementById("qty-plus").addEventListener("click", function () {
        state.qty += 1;
        paint();
      });
      document.getElementById("add-to-cart").addEventListener("click", add);
      document.getElementById("buy-now").addEventListener("click", function () {
        add();
      });
    }

    function colorLabel(id) {
      var found = LORYS.colors.find(function (c) {
        return c.id === id;
      });
      return found
        ? LORYS.locale.getLanguage() === "en" && found.labelEn
          ? found.labelEn
          : found.label
        : id;
    }

    function add() {
      LORYS.cart.add({
        id: product.id,
        name: productText(product, "name"),
        tagline: productText(product, "tagline"),
        price: product.price,
        image: getProductImage(product, state.color, 0),
        size: state.size,
        color: state.color,
        qty: state.qty
      });
    }

    paint();
    repaintProductPage = paint;
  }

  document.addEventListener("lorys:currencychange", refreshPrices);
  document.addEventListener("lorys:languagechange", function () {
    renderHomeGrid();
    renderRecentlyViewed();
    if (repaintProductPage) repaintProductPage();
    var searchInput = document.getElementById("search-input");
    if (searchInput && searchInput.value) {
      searchInput.dispatchEvent(new Event("input", { bubbles: true }));
    }
  });

  document.addEventListener("DOMContentLoaded", function () {
    LORYS.currency.ready.then(function () {
      bindChrome();
      renderHomeGrid();
      renderProductPage();
      renderRecentlyViewed();
      refreshPrices();
    });
  });
})();
