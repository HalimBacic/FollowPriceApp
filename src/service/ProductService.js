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
      const response = await this.api.get(`/get/${pageNum}`);

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
      const response = await this.api.get(`/getbyname`, {
        params: { term: name },
      });

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
      const response = await this.api.get(`/getbybarcode`, {
        params: { barcode: barcode, page: page },
      });

      if (response.status === 204) {
        return [];
      }

      return response.data;
    } catch (error) {
      console.error("Greška prilikom dohvatanja cijena po barkodu:", error);
      return AllProductTemplate;
    }
  }

  async getPricesBySearch(query) {
    try {
      const response = await this.api.get(`/search`, {
        params: { term: query },
      });

      if (response.status === 204) {
        return [];
      }

      return response.data;
    } catch (error) {
      console.error("Greška prilikom dohvatanja cijena po pretrazi:", error);
      return [AllProductTemplate];
    }
  }
}

const apiService = new ProductService();
export default apiService;
