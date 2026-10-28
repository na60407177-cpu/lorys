window.LORYS = window.LORYS || {};

(function () {
  var STORAGE_KEY = "lorys-cart";

  function load() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function save(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }

  function lineKey(item) {
    return [item.id, item.size, item.color].join("::");
  }

  LORYS.cart = {
    items: load(),

    count: function () {
      return this.items.reduce(function (sum, item) {
        return sum + item.qty;
      }, 0);
    },

    subtotal: function () {
      return this.items.reduce(function (sum, item) {
        return sum + item.price * item.qty;
      }, 0);
    },

    add: function (payload) {
      var next = {
        id: payload.id,
        name: payload.name,
        tagline: payload.tagline,
        price: payload.price,
        image: payload.image,
        size: payload.size || "M",
        color: payload.color || "black",
        qty: payload.qty || 1
      };
      var key = lineKey(next);
      var existing = this.items.find(function (item) {
        return lineKey(item) === key;
      });
      if (existing) {
        existing.qty += next.qty;
      } else {
        this.items.push(next);
      }
      save(this.items);
      LORYS.ui.sync();
      LORYS.ui.openCart();
      LORYS.ui.toast("已加入購物袋");
    },

    updateQty: function (index, qty) {
      if (qty < 1) {
        this.items.splice(index, 1);
      } else {
        this.items[index].qty = qty;
      }
      save(this.items);
      LORYS.ui.sync();
    },

    remove: function (index) {
      this.items.splice(index, 1);
      save(this.items);
      LORYS.ui.sync();
    },

    clear: function () {
      this.items = [];
      save(this.items);
      LORYS.ui.sync();
    }
  };
})();
