import axios from "axios";
import AllProductTemplate from "../templates/AllProductsTemplate";

class ProductService {
  api = axios.create({
    baseURL: "http://localhost:3000/products",
    headers: {
      "Content-type": "application/json",
    },
  });

  async getPrices(pageSize, pageNum) {
    try {
      const response = await this.api.get(
        `/get/pagesize=${pageSize}&pagenum=${pageNum}`
      );

      // Ako je backend vratio 204 No Content
      if (response.status === 204) {
        return [];
      }

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

  async getPricesByBarcode(barcode) {
    try {
      const response = await this.api.get(`/get/barcode=${barcode}`);

      // Ako je backend vratio 204 No Content
      if (response.status === 204) {
        return [];
      }

      return response.data;
    } catch (error) {
      console.error("Greška prilikom dohvatanja cijena po barkodu:", error);
      return [AllProductTemplate];
    }
  }
}

const apiService = new ProductService();
export default apiService;
