import React from 'react'
import Navigation from '../../components/navigation/Navigation'
import ProductContent from '../../components/productcontent/ProductContent'
import { useParams } from 'react-router-dom'

function ProductPage() {
  const {barcode} = useParams();


  return (
    <div>
      <Navigation></Navigation>
      <ProductContent barcode = {barcode}></ProductContent>
    </div>
  )
}

export default ProductPage
