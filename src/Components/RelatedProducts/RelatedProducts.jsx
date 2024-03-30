import React, { useEffect, useState } from 'react';
import Item from '../Item/Item';
import './RelatedProducts.css';

const RelatedProducts = (props) => {
  const [popularProducts, setPopularProducts] = useState([]);
  const { product } = props;

  useEffect(() => {
    // Verificar si product está definido antes de hacer la solicitud
    if (product) {
      fetch(`http://localhost:4000/popularin${product.category}`)
        .then((response) => response.json())
        .then((data) => setPopularProducts(data))
        .catch((error) => console.error('Error fetching related products:', error));
    }
  }, [product]);

  return (
    <div className='relatedproducts'>
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {/* Verificar si popularProducts tiene elementos antes de mapearlos */}
        {popularProducts.length > 0 &&
          popularProducts.map((item, i) => (
            <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
          ))}
      </div>
    </div>
  );
};

export default RelatedProducts;