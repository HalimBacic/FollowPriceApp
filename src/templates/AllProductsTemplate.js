/**
 * Kompletan template objekt koji simulira ProductStoreDto
 * (jedan proizvod sa cijenom na specifičnoj lokaciji).
 */
const AllProductTemplate = {
    // Podaci iz ProductStoreDto
    price: 1.79,
    oldprice: 2.19, // Koristite 0 ako nema stare cijene (popusta)
    lastchange: "2024-10-01T14:30:00Z", // ISO 8601 format datuma i vremena

    // Podaci iz ProductDto (ugniježdeni)
    product: {
        barcode: "3871234567890",
        name: "Mlijeko 'Mliječna čarolija' 1L",
        producttype: "Mliječni Proizvodi",
        producer: "AgroFarma d.o.o.",
        quantitytype: "LITAR", // Prema Quantityenum
        quantityprice: 1.79, // Cijena po litru/kg
        weight: 1.0,
        diff: 0.1, // Razlika u odnosu na prosječnu cijenu (primjer)
        expdate: "2024-10-15", // YYYY-MM-DD format
        
        // Polje 'stores' u ProductDto bi obično bilo izostavljeno 
        // kada se prikazuje jedna instanca ProductStoreDto, 
        // ali ga zadržavamo radi kompletnosti strukture.
        stores: [
            { id: "ST001", name: "Maxi Market Centar", address: "Glavna Ulica 5", city: "Sarajevo", phone: "033-111-222", email: "info@maximarket.ba" }
        ]
    },

    // Podaci iz StoreDtoSimple (ugniježdeni)
    store: {
        id: "ST001",
        name: "Maxi Market Centar",
        address: "Glavna Ulica 5",
        city: "Sarajevo",
        phone: "033-111-222",
        email: "info@maximarket.ba"
    }
};

export default AllProductTemplate; 
// Ili samo console.log(TemplateProductStore) u JavaScript kodu.