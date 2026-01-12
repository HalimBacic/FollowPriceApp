import React, { useState, useEffect } from "react";
import Navigation from "../../components/navigation/Navigation";
import service from "../../service/ProductService";
import Productcard from "../../components/productcard/Productcard";
import "./home.css";
import PaginationComponent from "../../components/pagination/PaginationComponent";
import SortComponent from "../../components/sortcomponent/SortComponent";

const Home = () => {
  const [data, setdata] = useState([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState(null);

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

  function handleSort(sort) {
    console.log("Sorting by:", sort);
    setSort(sort);
  }

  return (
    <div>
      <Navigation />
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center", margin: "10px" }}>
        <PaginationComponent
          page={page}
          totalPages={10}
          onPageChange={changePage}
        />
        <SortComponent
          onChange={handleSort}
          options={[{ label: "Price", value: "price" }]}
        ></SortComponent>
      </div>
      <div className="products-grid">
        {data.map((item) => (
          <Productcard productdata={item} />
        ))}
      </div>
    </div>
  );
};

export default Home;
