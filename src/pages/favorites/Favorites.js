import React from 'react'
import Navigation from "../../components/navigation/Navigation";
import { useState, useEffect } from 'react';
import service from "../../service/ProductService";
import { useLocation } from 'react-router-dom';
import UserProds from '../../components/userprods/UserProds';
import productService from '../../service/ProductService';


const handleDelete = async(barcode, storeid, email) =>
{
  await productService.deleteProdForUser(barcode, email, storeid);
} 

const Favorites = () => {
    const { state } = useLocation();
    const user = state?.user;
    const [data, setData] = useState([])
    useEffect(() => {
      const fetchData = async () => {
      const products = await service.getUserProducts("bacich95@gmail.com");
      console.log(products);
      setData(products);
    };
    fetchData();
    
      return () => {
        
      }
    }, [])
    


  return (
    <div>
      <Navigation></Navigation>
      {data && data.map((item) => (
        <UserProds key={item.product.barcode} data={item} onDelete={handleDelete}/>
      ))}
    </div>
  )
}

export default Favorites
