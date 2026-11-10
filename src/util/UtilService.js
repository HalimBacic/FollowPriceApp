class UtilService {
  static SAMPLE_IMAGE_BY_TYPE = {
    Food: "food.png",
    Hygiene: "hygiene.png",
    Clothing: "clothing.png",
    "Auto Equipment": "auto-equipment.png",
    Electronics: "electronics.png",
    "Home Appliances": "home-appliances.png",
    Books: "books.png",
    "Sports & Recreation": "sports-recreation.png",
    Toys: "toys.png",
    "Pet Supplies": "pet-supplies.png",
    "Pharmacy / Medication": "pharmacy-medication.png",
    "Garden & Tools": "garden-tools.png",
  };

  static formatDate(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("hr-BA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }

  static getWeeksUntil(dateString, fromDate = new Date()) {
    if (!dateString) return null;
    const target = new Date(dateString);
    if (Number.isNaN(target.getTime())) return null;

    const from = new Date(fromDate);
    const msPerWeek = 7 * 24 * 60 * 60 * 1000;
    return (target.getTime() - from.getTime()) / msPerWeek;
  }

  static getDateUrgencyColor(dateString, fromDate = new Date()) {
    const weeksUntil = UtilService.getWeeksUntil(dateString, fromDate);
    if (weeksUntil === null) return "red";

    if (weeksUntil <= 3) return "red";
    if (weeksUntil <= 6) return "orange";
    if (weeksUntil <= 10) return "yellow";
    return "blue";
  }

  static getProductImagePath(barcode) {
    return `${process.env.PUBLIC_URL}/assets/${barcode}.png`;
  }

  static getSampleImagePath(producttype) {
    const fileName =
      UtilService.SAMPLE_IMAGE_BY_TYPE[producttype] || "default.png";
    return `${process.env.PUBLIC_URL}/assets/samples/${fileName}`;
  }

  static USER_LOCATION_KEY = "userLocation";
  static USER_CART_KEY = "userCart";
  static CART_STATUS_KEY = "cart-status";

  static normalizeCartIds(cart) {
    if (typeof cart === "string") {
      try {
        cart = JSON.parse(cart);
      } catch {
        return cart ? [String(cart)] : [];
      }
    }
    if (!Array.isArray(cart)) {
      if (Array.isArray(cart?.cart)) return UtilService.normalizeCartIds(cart.cart);
      if (Array.isArray(cart?.items)) return UtilService.normalizeCartIds(cart.items);
      if (Array.isArray(cart?.data)) return UtilService.normalizeCartIds(cart.data);
      return [];
    }

    const ids = [];
    for (const item of cart) {
      if (item == null) continue;
      if (typeof item === "string" || typeof item === "number") {
        ids.push(String(item));
      } else if (Array.isArray(item)) {
        ids.push(...UtilService.normalizeCartIds(item));
      } else if (typeof item === "object") {
        const barcode = item.barcode ?? item.product?.barcode;
        const storeId =
          item.store_id ?? item.storeId ?? item.store?.id ?? item.id;
        if (barcode != null) ids.push(String(barcode));
        if (storeId != null) ids.push(String(storeId));
      }
    }
    return [...new Set(ids)];
  }

  static getCartIds() {
    try {
      const raw = localStorage.getItem(UtilService.USER_CART_KEY);
      return raw ? UtilService.normalizeCartIds(JSON.parse(raw)) : [];
    } catch {
      return [];
    }
  }

  static saveCartIds(cart) {
    const ids = UtilService.normalizeCartIds(cart);
    localStorage.setItem(UtilService.USER_CART_KEY, JSON.stringify(ids));
    if (ids.length > 0) {
      localStorage.setItem(UtilService.CART_STATUS_KEY, "true");
    } else {
      localStorage.removeItem(UtilService.CART_STATUS_KEY);
    }
    return ids;
  }

  static clearCartIds() {
    localStorage.removeItem(UtilService.USER_CART_KEY);
    localStorage.removeItem(UtilService.CART_STATUS_KEY);
  }

  static isInCart(barcode, storeId) {
    const ids = UtilService.getCartIds();
    return Boolean(
      (barcode != null && ids.includes(String(barcode))) ||
        (storeId != null && ids.includes(String(storeId)))
    );
  }

  static addCartIds(barcode, storeId) {
    const ids = new Set(UtilService.getCartIds());
    if (barcode != null) ids.add(String(barcode));
    if (storeId != null) ids.add(String(storeId));
    return UtilService.saveCartIds([...ids]);
  }

  static removeCartIds(barcode, storeId) {
    const remove = new Set(
      [barcode, storeId].filter((v) => v != null).map(String)
    );
    const ids = UtilService.getCartIds().filter((id) => !remove.has(id));
    return UtilService.saveCartIds(ids);
  }

  static getUserLocation() {
    try {
      const raw = localStorage.getItem(UtilService.USER_LOCATION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  static saveUserLocation(coords) {
    const payload = {
      latitude: coords.latitude,
      longitude: coords.longitude,
      accuracy: coords.accuracy ?? null,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem(UtilService.USER_LOCATION_KEY, JSON.stringify(payload));
    return payload;
  }

  static clearUserLocation() {
    localStorage.removeItem(UtilService.USER_LOCATION_KEY);
  }

  static requestAndStoreUserLocation() {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve(null);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const saved = UtilService.saveUserLocation(position.coords);
          resolve(saved);
        },
        () => {
          resolve(null);
        },
        {
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    });
  }
}

export default UtilService;
