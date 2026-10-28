window.LORYS = window.LORYS || {};

(function () {
  function el(html) {
    var wrap = document.createElement("div");
    wrap.innerHTML = html.trim();
    return wrap.firstElementChild;
  }

  function colorLabel(id) {
    var found = LORYS.colors.find(function (c) {
      return c.id === id;
    });
    return found ? found.label : id;
  }

  LORYS.ui = {
    openCart: function () {
      document.getElementById("cart-drawer").classList.add("is-open");
      document.getElementById("cart-scrim").classList.add("is-open");
      document.body.classList.add("overflow-hidden");
    },

    closeCart: function () {
      document.getElementById("cart-drawer").classList.remove("is-open");
      document.getElementById("cart-scrim").classList.remove("is-open");
      document.body.classList.remove("overflow-hidden");
    },

    toast: function (message) {
      var node = document.getElementById("lorys-toast");
      node.textContent = message;
      node.classList.add("is-visible");
      clearTimeout(this._toastTimer);
      this._toastTimer = setTimeout(function () {
        node.classList.remove("is-visible");
      }, 1800);
    },

    sync: function () {
      var count = LORYS.cart.count();
      document.querySelectorAll("[data-cart-count]").forEach(function (badge) {
        badge.textContent = count;
        badge.classList.toggle("hidden", count === 0);
      });
      this.renderCart();
    },

    renderCart: function () {
      var list = document.getElementById("cart-items");
      var empty = document.getElementById("cart-empty");
      var footer = document.getElementById("cart-footer");
      var items = LORYS.cart.items;

      document.getElementById("cart-subtotal").textContent = LORYS.formatPrice(
        LORYS.cart.subtotal()
      );

      if (!items.length) {
        list.innerHTML = "";
        empty.classList.remove("hidden");
        footer.classList.add("hidden");
        return;
      }

      empty.classList.add("hidden");
      footer.classList.remove("hidden");
      list.innerHTML = items
        .map(function (item, index) {
          return (
            '<article class="flex gap-4 py-5 border-b border-neutral-200">' +
            '<a href="product-detail.html?id=' +
            item.id +
            '" class="block h-24 w-20 shrink-0 overflow-hidden bg-[#F9F9F9]">' +
            '<img src="' +
            item.image +
            '" alt="" class="h-full w-full object-cover">' +
            "</a>" +
            '<div class="min-w-0 flex-1">' +
            '<div class="flex items-start justify-between gap-3">' +
            '<div>' +
            '<p class="font-sans text-[11px] tracking-[0.18em] text-neutral-500">' +
            item.tagline +
            "</p>" +
            '<h3 class="mt-1 font-sans text-sm tracking-wide">' +
            item.name +
            "</h3>" +
            '<p class="mt-1 text-xs text-neutral-500">' +
            item.size +
            " / " +
            colorLabel(item.color) +
            "</p>" +
            "</div>" +
            '<button type="button" data-remove="' +
            index +
            '" class="text-neutral-400 hover:text-[#1A1A1A] text-lg leading-none" aria-label="Remove">×</button>' +
            "</div>" +
            '<div class="mt-3 flex items-center justify-between">' +
            '<div class="inline-flex items-center border border-neutral-300">' +
            '<button type="button" data-qty="' +
            index +
            '" data-delta="-1" class="h-8 w-8 text-sm">−</button>' +
            '<span class="w-8 text-center text-xs">' +
            item.qty +
            "</span>" +
            '<button type="button" data-qty="' +
            index +
            '" data-delta="1" class="h-8 w-8 text-sm">+</button>' +
            "</div>" +
            '<p class="text-sm">' +
            LORYS.formatPrice(item.price * item.qty) +
            "</p>" +
            "</div>" +
            "</div>" +
            "</article>"
          );
        })
        .join("");
    },

    mount: function () {
      if (document.getElementById("cart-drawer")) return;

      document.body.appendChild(
        el(
          '<div id="cart-scrim" class="scrim fixed inset-0 z-40 bg-black/30"></div>'
        )
      );

      document.body.appendChild(
        el(
          '<aside id="cart-drawer" class="cart-drawer fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl" aria-label="Shopping bag">' +
            '<header class="flex items-center justify-between border-b border-neutral-200 px-6 py-5">' +
            '<h2 class="font-sans text-xs tracking-[0.28em]">YOUR BAG</h2>' +
            '<button type="button" id="cart-close" class="text-2xl leading-none text-neutral-500 hover:text-[#1A1A1A]" aria-label="Close bag">×</button>' +
            "</header>" +
            '<div class="flex-1 overflow-y-auto px-6">' +
            '<p id="cart-empty" class="py-16 text-center text-sm tracking-wide text-neutral-500">Your bag is empty.</p>' +
            '<div id="cart-items"></div>' +
            "</div>" +
            '<footer id="cart-footer" class="hidden border-t border-neutral-200 px-6 py-6">' +
            '<div class="mb-4 flex items-center justify-between text-sm">' +
            '<span class="tracking-[0.18em] text-xs">SUBTOTAL</span>' +
            '<span id="cart-subtotal"></span>' +
            "</div>" +
            '<p class="mb-4 text-[11px] leading-relaxed text-neutral-500">Shipping &amp; duties calculated at checkout.</p>' +
            '<button type="button" id="cart-checkout" class="w-full bg-[#1A1A1A] py-3.5 text-xs tracking-[0.22em] text-white transition hover:bg-neutral-600">CHECKOUT</button>' +
            "</footer>" +
            "</aside>"
        )
      );

      document.body.appendChild(
        el(
          '<div id="lorys-toast" class="toast fixed bottom-6 left-1/2 z-50 -translate-x-1/2 bg-[#1A1A1A] px-5 py-2.5 text-[11px] tracking-[0.22em] text-white">Added to bag</div>'
        )
      );

      document.getElementById("cart-scrim").addEventListener("click", this.closeCart);
      document.getElementById("cart-close").addEventListener("click", this.closeCart);
      document.getElementById("cart-checkout").addEventListener("click", function () {
        LORYS.ui.toast("Checkout arriving soon");
      });

      document.getElementById("cart-items").addEventListener("click", function (event) {
        var remove = event.target.closest("[data-remove]");
        var qty = event.target.closest("[data-qty]");
        if (remove) {
          LORYS.cart.remove(Number(remove.getAttribute("data-remove")));
        }
        if (qty) {
          var index = Number(qty.getAttribute("data-qty"));
          var delta = Number(qty.getAttribute("data-delta"));
          LORYS.cart.updateQty(index, LORYS.cart.items[index].qty + delta);
        }
      });

      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") LORYS.ui.closeCart();
      });

      this.sync();
    }
  };

  document.addEventListener("DOMContentLoaded", function () {
    LORYS.ui.mount();
  });
})();
