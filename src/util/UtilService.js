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
}

export default UtilService;
