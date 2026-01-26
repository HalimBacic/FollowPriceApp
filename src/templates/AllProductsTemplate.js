/**
 * Kompletan template objekt koji simulira ProductStoreDto
 * (jedan proizvod sa cijenom na specifičnoj lokaciji).
 */
const AllProductTemplate = {
  product: {
    id: "prod-123",
    name: "Sample Product",
    barcode: "3871234567890",
    type: "Food",
    quantityType: "perpiece",
    manufacturer: "Sample Manufacturer",
  },
  prices: [
    {
      price: 2.50,
      oldprice: 3.00,
      lastchange: "2024-10-01T14:30:00Z",
      store: {
        id: "store-001",
        name: "Mega Store",
        address: "Main Street 12",
        city: "Sarajevo",
        phone: "+38761123456",
        email: "contact@megastore.ba",
      },
    },
    {
      price: 2.45,
      oldprice: 2.60,
      lastchange: "2024-10-01T14:30:00Z",
      store: {
        id: "store-002",
        name: "Super Market",
        address: "Market Road 5",
        city: "Tuzla",
        phone: "+38762111222",
        email: "info@supermarket.ba",
      },
    },
  ],
  page: 1,
  pagesize: 10,
  total_pages: 1,
};

export default AllProductTemplate;
// Ili samo console.log(TemplateProductStore) u JavaScript kodu.
