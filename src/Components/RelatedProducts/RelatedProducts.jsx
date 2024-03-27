import React, { useEffect, useState } from 'react'
import Item from '../Item/Item'
import './RelatedProducts.css'
// import data_product from '../Assets/data';

const RelatedProducts = (props) => {

  const [popularProducts,setPopularProducts] = useState([]);

  const {product} = props;

  useEffect(()=>{
    fetch(`http://localhost:4000/popularin${product.category}`)
    .then((response)=>response.json())
    .then((data)=>setPopularProducts(data));
  },[product])

  return (
    <div className='relatedproducts'>
        <h1>Related Products</h1>
        <hr />
        <div className="relatedproducts-item">
            {popularProducts.map((item,i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            })}
        </div>
    </div>
  )
}

export default RelatedProducts