import React, { useState } from 'react'
import Navigation from '../../components/navigation/Navigation'
import service from '../../service/ProductService'
import Productcard from '../../components/productcard/Productcard'

const Home = () => {

  const [data, setdata] = useState([])
  
  React.useEffect(() => {
    const fetchData = async () => {
      const prices = await service.getPrices(10, 1)
      setdata(prices)
    }
    fetchData()
  }, [])
  

  return (
    <div>
      <Navigation />
      {data.map(item => (
        <Productcard productdata={item} />
      ))}
    </div>
  )
}

export default Home
