import axios from "axios";
import AllProductTemplate from "../templates/AllProductsTemplate";

class ProductService {
  api = axios.create({
    baseURL: "http://localhost:8001/",
    headers: {
      "Content-type": "application/json",
    },
  });

  async getPrices(pageNum) {
    try {
      const response = await this.api.get(
        `/get/${pageNum}`
      );

      // Ako je backend vratio 204 No Content
      if (response.status === 204) {
        return [];
      }
      console.log("Dohvaćeni podaci:", response.data);
      return response.data;
    } catch (error) {
      console.error("Greška prilikom dohvatanja cijena:", error);
      return [AllProductTemplate];
    }
  }

  async getPricesByName(name) {
    try {
      const response = await this.api.get(`/get/name=${name}`);

      // Ako je backend vratio 204 No Content
      if (response.status === 204) {
        return [];
      }

      return response.data;
    } catch (error) {
      console.error("Greška prilikom dohvatanja cijena po imenu:", error);
      return [AllProductTemplate];
    }
  }

   async getPricesByBarcode(barcode, page) {
    try {
      const response = await this.api.get(`/get`, { params: { barcode: barcode, page: page } });

      // Ako je backend vratio 204 No Content
      if (response.status === 204) {
        return [];
      }

      return response.data;
    } catch (error) {
      console.error("Greška prilikom dohvatanja cijena po barkodu:", error);
      return  AllProductTemplate;
    }
  }
}

const apiService = new ProductService();
export default apiService;
