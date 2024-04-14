import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import './CSS/Product.css'; 

import Breadcrum from '../Components/Breadcrums/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';

const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular una carga asíncrona de datos
    setTimeout(() => {
      const foundProduct = all_product.find((e) => e.id === Number(productId));
      setProduct(foundProduct);
      setLoading(false);
    }, 1000); // Cambia el valor a un tiempo más realista
  }, [all_product, productId]);

  return (
    <div className="product-container" style={{ minHeight: '800px' }}> {/* Establece la altura mínima */}
      
      {loading ? (
        <div className="loading-spinner">
        <FontAwesomeIcon icon={faSpinner} spin />
        </div>
      ) : (
        <>
          <Breadcrum product={product} />
          <ProductDisplay product={product} />
          <DescriptionBox product={product} />
          <RelatedProducts product={product} />
        </>
      )}
    </div>
  );
};

export default Product;
