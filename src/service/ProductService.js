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

  async addProductForUser(barcode, email, storeid) {
    try {
      const response = await this.api.post(`/addproductforuser`, {
        barcode: barcode,
        email: email,
        store_id: storeid,
      });

      if (response.status === 201) return true;
    } catch (error) {
      console.error("Greška prilikom dodavanja proizvoda korisniku:", error);
      return false;
    }
  }

  async deleteProdForUser(barcode, email, storeid) {
    try {
      const response = await this.api.post(`/deleteproductforuser`, {
        barcode: barcode,
        email: email,
        store_id: storeid,
      });

      if (response.status === 201) return true;
    } catch (error) {
      console.error("Greška prilikom dodavanja proizvoda korisniku:", error);
      return false;
    }
  }

  async getUserProducts(email) {
    try {
      const response = await this.api.get(`/getuserproducts`, {
        params: { email: email },
      });

      if (response.status === 204) {
        return [];
      }

      return response.data;
    } catch (error) {
      console.error("Greška prilikom dohvatanja proizvoda korisnika:", error);
      return [];
    }
  }

  async isProductInUserCart(email) {
    try {
      const response = await this.api.get(`/isproductforuser`, {
        params: { email: email },
      });
      if (response.status === 200) return true;
      else return false;
    } catch (error) {
      console.error("Greška prilikom pregleda korpe:", error);
      return false;
    }
  }
}

const apiService = new ProductService();
export default apiService;
