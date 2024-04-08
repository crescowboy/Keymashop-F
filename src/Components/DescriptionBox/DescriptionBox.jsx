import React from 'react';
import './DescriptionBox.css';

const DescriptionBox = (props) => {
  const { product } = props;

  // Verificar si product existe antes de acceder a product.especification
  if (!product) {
    return null; // O puedes mostrar un mensaje de carga u otro mensaje apropiado
  }

  return (
    <div className='descriptionbox'>
      <div className="description-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Reviews (122)</div>
      </div>
      <div className="descriptionbox-description">
        <p>
          {product.especification}
        </p>
      </div>
    </div>
  );
};

export default DescriptionBox;
