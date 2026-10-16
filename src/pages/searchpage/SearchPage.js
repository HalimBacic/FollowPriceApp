import service from "../../service/ProductService";
import Navigation from "../../components/navigation/Navigation";
import Productcard from "../../components/productcard/Productcard";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "../home/home.css";

const SearchPage = () => {
  const [data, setData] = useState([]);
      const { query } = useParams();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        var pattern = /\\d+/;
        var response = "";
        if (pattern.test(query)) {
          response = await service.getPricesByBarcode(query);
        } else response = await service.getPricesByName(query);
        setData(response);
      } catch (error) {
        console.error("Greška pri pozivu API-ja", error);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div>
      <Navigation />
      <div className="products-grid">
        {data.map((item) => (
          <Productcard
            key={`${item.product?.barcode}-${item.store?.id ?? item.id ?? ""}`}
            productdata={item}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
