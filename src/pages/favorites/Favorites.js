import React from 'react'
import Navigation from "../../components/navigation/Navigation";
import { useState, useEffect } from 'react';
import service from "../../service/ProductService";
import { useLocation } from 'react-router-dom';

const Favorites = () => {
    const { state } = useLocation();
    const user = state?.user;
    const [data, setData] = useState([])
    useEffect(() => {
        console.log("User:", user);
      const fetchData = async () => {
      const products = await service.getUserProducts("bacich95@gmail.com");
      setData(products);
    };
    fetchData();
    
      return () => {
        
      }
    }, [])
    


  return (
    <div>
      <Navigation></Navigation>
    </div>
  )
}

export default Favorites
