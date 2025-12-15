const ProductDataTemplate = {
  product: {
    barcode: "5010000000000",
    name: "Mlijeko 'Planinsko' 2.8% MM",
    producttype: "Food", // Odgovara ProductType.FOOD
    producer: "Mljekara d.d.",
    quantitytype: "perpiece", // Odgovara Quantityenum.PERPIECE
    quantityprice: 1.85,
    weight: 1.0,
    diff: 0.15,
    expdate: "2025-10-30T00:00:00.000Z",
    stores: [
      {
        id: "s-123",
        name: "Maxi Market",
        address: "Glavna ulica 15",
        city: "Sarajevo",
        phone: "+387 33 123 456",
        email: "maxi@market.ba",
      },
      {
        id: "s-456",
        name: "Super Trgovina",
        address: "Trg slobode bb",
        city: "Banja Luka",
        phone: "+387 51 654 321",
        email: "super@trgovina.ba",
      },
    ],
  },
  prices: [
    {
      price: 1.79,
      oldprice: 1.89,
      lastchange: "2025-09-28T10:30:00.000Z",
      store: {
        id: "s-123",
        name: "Maxi Market",
        address: "Glavna ulica 15",
        city: "Sarajevo",
        phone: "+387 33 123 456",
        email: "maxi@market.ba",
      },
    },
    {
      price: 1.85,
      oldprice: 0, // Nema stare cene
      lastchange: "2025-10-05T15:45:00.000Z",
      store: {
        id: "s-456",
        name: "Super Trgovina",
        address: "Trg slobode bb",
        city: "Banja Luka",
        phone: "+387 51 654 321",
        email: "super@trgovina.ba",
      },
    },
    {
      price: 1.75,
      oldprice: 1.95,
      lastchange: "2025-10-07T09:00:00.000Z",
      store: {
        id: "s-789",
        name: "Lokalni Diskont",
        address: "Industrijska zona 1",
        city: "Mostar",
        phone: "+387 36 987 654",
        email: "lokalni@diskont.ba",
      },
    },
  ],
};

export default ProductDataTemplate;