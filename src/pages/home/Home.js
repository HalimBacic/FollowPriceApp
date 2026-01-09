import React, { useState, useEffect } from "react";
import Navigation from "../../components/navigation/Navigation";
import service from "../../service/ProductService";
import Productcard from "../../components/productcard/Productcard";
import "./home.css";
import PaginationComponent from "../../components/pagination/PaginationComponent";

const Home = () => {
  const [data, setdata] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const prices = await service.getPrices(10, 1);
      setdata(prices);
    };
    fetchData();
  }, []);

  async function changePage(newPage) {
    setPage(newPage);
    const prices = await service.getPrices(10, newPage);
    setdata(prices);
  }

  return (
    <div>
      <Navigation />
      <PaginationComponent page={page} totalPages={10} onPageChange={changePage} />
      <div className="products-grid">
        {data.map((item) => (
          <Productcard productdata={item} />
        ))}
      </div>
    </div>
  );
};

export default Home;
