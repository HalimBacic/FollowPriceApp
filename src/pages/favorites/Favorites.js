import React from "react";
import Navigation from "../../components/navigation/Navigation";
import { useState, useEffect, useCallback } from "react";
import service from "../../service/ProductService";
import { useLocation } from "react-router-dom";
import UserProds from "../../components/userprods/UserProds";
import productService from "../../service/ProductService";

const Favorites = () => {
  const { state } = useLocation();
  const user = state?.user;
  const [data, setData] = useState([]);

  const fetchData = useCallback(async () => {
    const response = await service.getUserProducts("bacich95@gmail.com");
    setData(response?.products ?? []);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async (barcode, email, storeid) => {
    const deleted = await productService.deleteProdForUser(
      barcode,
      email,
      storeid
    );
    if (deleted) {
      await fetchData();
    }
  };

  return (
    <div>
      <Navigation></Navigation>
      {data &&
        data.map((item) => (
          <UserProds
            key={`${item.product.barcode}-${item.store?.store?.id ?? ""}`}
            data={item}
            onDelete={handleDelete}
          />
        ))}
    </div>
  );
};

export default Favorites;
