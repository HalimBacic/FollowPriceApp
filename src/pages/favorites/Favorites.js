import React from 'react'
import Navigation from "../../components/navigation/Navigation";

const Favorites = () => {
    const [data, setData] = useState([])
    useEffect(() => {
      const fetchData = async () => {
      const prices = await service.getPrices(1);
      setdata(prices);
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
