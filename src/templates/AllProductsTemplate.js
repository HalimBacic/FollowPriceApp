/**
 * Lista mock ProductStoreDto objekata
 * (15 proizvoda sa cijenama na različitim lokacijama)
 */
const AllProductTemplates = [
  {
    price: 1.79,
    oldprice: 2.19,
    lastchange: "2024-10-01T14:30:00Z",
    product: {
      barcode: "3871234567890",
      name: "Mlijeko 'Mliječna čarolija' 1L",
      producttype: "Food",
      producer: "AgroFarma d.o.o.",
      quantitytype: "perpiece",
      quantityprice: 1.79,
      weight: 1.0,
      diff: -0.40,
      expdate: "2024-10-15",
      stores: [
        {
          id: "ST001",
          name: "Maxi Market Centar",
          address: "Glavna Ulica 5",
          city: "Sarajevo",
          phone: "+38733111222",
          email: "info@maximarket.ba"
        }
      ]
    },
    store: {
      id: "ST001",
      name: "Maxi Market Centar",
      address: "Glavna Ulica 5",
      city: "Sarajevo",
      phone: "+38733111222",
      email: "info@maximarket.ba"
    }
  },

  {
    price: 0.99,
    oldprice: 1.20,
    lastchange: "2024-10-02T09:10:00Z",
    product: {
      barcode: "3871234567891",
      name: "Bijeli hljeb 500g",
      producttype: "Food",
      producer: "Pekara Sunce",
      quantitytype: "perpiece",
      quantityprice: 0.99,
      weight: 0.5,
      diff: -0.21,
      expdate: "2024-10-05",
      stores: [
        {
          id: "ST002",
          name: "City Market",
          address: "Titova 22",
          city: "Sarajevo",
          phone: "+38733222333",
          email: "info@citymarket.ba"
        }
      ]
    },
    store: {
      id: "ST002",
      name: "City Market",
      address: "Titova 22",
      city: "Sarajevo",
      phone: "+38733222333",
      email: "info@citymarket.ba"
    }
  },

  {
    price: 3.49,
    oldprice: 3.99,
    lastchange: "2024-10-03T11:45:00Z",
    product: {
      barcode: "3871234567892",
      name: "Jogurt čaša 1kg",
      producttype: "Food",
      producer: "Milko Plus",
      quantitytype: "perpiece",
      quantityprice: 3.49,
      weight: 1.0,
      diff: -0.50,
      expdate: "2024-10-20",
      stores: [
        {
          id: "ST003",
          name: "Bingo",
          address: "Zmaja od Bosne 10",
          city: "Tuzla",
          phone: "+38735333444",
          email: "kontakt@bingo.ba"
        }
      ]
    },
    store: {
      id: "ST003",
      name: "Bingo",
      address: "Zmaja od Bosne 10",
      city: "Tuzla",
      phone: "+38735333444",
      email: "kontakt@bingo.ba"
    }
  },

  {
    price: 4.99,
    oldprice: 5.49,
    lastchange: "2024-10-04T16:20:00Z",
    product: {
      barcode: "3871234567893",
      name: "Šampon 500ml",
      producttype: "Hygiene",
      producer: "CleanPro",
      quantitytype: "perpiece",
      quantityprice: 4.99,
      weight: 0.5,
      diff: -0.50,
      expdate: "2026-01-01",
      stores: [
        {
          id: "ST004",
          name: "DM Drogerie",
          address: "Ferhadija 8",
          city: "Sarajevo",
          phone: "+38733555666",
          email: "info@dm.ba"
        }
      ]
    },
    store: {
      id: "ST004",
      name: "DM Drogerie",
      address: "Ferhadija 8",
      city: "Sarajevo",
      phone: "+38733555666",
      email: "info@dm.ba"
    }
  },

  {
    price: 29.90,
    oldprice: 34.90,
    lastchange: "2024-10-05T13:00:00Z",
    product: {
      barcode: "3871234567894",
      name: "Bežični miš",
      producttype: "Electronics",
      producer: "TechLine",
      quantitytype: "perpiece",
      quantityprice: 29.90,
      weight: 0.2,
      diff: -5.00,
      expdate: "2030-01-01",
      stores: [
        {
          id: "ST005",
          name: "TehnoShop",
          address: "Meše Selimovića 14",
          city: "Mostar",
          phone: "+38736666777",
          email: "prodaja@tehnoshop.ba"
        }
      ]
    },
    store: {
      id: "ST005",
      name: "TehnoShop",
      address: "Meše Selimovića 14",
      city: "Mostar",
      phone: "+38736666777",
      email: "prodaja@tehnoshop.ba"
    }
  },

  {
    price: 6.49,
    oldprice: 6.99,
    lastchange: "2024-10-06T10:40:00Z",
    product: {
      barcode: "3871234567895",
      name: "Hrana za pse 1kg",
      producttype: "Pet Supplies",
      producer: "PetCare",
      quantitytype: "perweight",
      quantityprice: 6.49,
      weight: 1.0,
      diff: -0.50,
      expdate: "2025-08-01",
      stores: [
        {
          id: "ST006",
          name: "Pet Shop",
          address: "Aleja mladih 3",
          city: "Zenica",
          phone: "+38732444555",
          email: "info@petshop.ba"
        }
      ]
    },
    store: {
      id: "ST006",
      name: "Pet Shop",
      address: "Aleja mladih 3",
      city: "Zenica",
      phone: "+38732444555",
      email: "info@petshop.ba"
    }
  }
];

export default AllProductTemplates;
