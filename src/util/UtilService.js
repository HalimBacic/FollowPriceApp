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
