import React, { useContext, useEffect, useState } from 'react'
import './ProductDisplay.css'
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png"
import { ShopContext } from '../../Context/ShopContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';


const ProductDisplay = (props) => {
  const {product} = props;
  const [mainImage, setMainImage] = useState(null);

  const {addToCart} = useContext(ShopContext);
  useEffect(() => {
    if (product && product.image && product.image.length > 0) {
      setMainImage(product.image[0]);
    }
  }, [product]);
  if (!product) {
    return  <div className="loading-spinner">
    <FontAwesomeIcon icon={faSpinner} spin />
    </div>
  }
  

  console.log(product)
  
  const selectimg = (newImage) =>{
    setMainImage(newImage);
    console.log("click")
  }

  // Condición para verificar si hay imágenes disponibles
  const hasImages = product.image && product.image.length > 0;

  // Construir el mensaje de WhatsApp con el enlace del producto
  const mensaje = `¡Hola! Estoy interesado en comprar el producto ${product.name}. Aquí está el enlace: http://localhost:3000/product/${product.id}`;
  return (
    <div className='productdisplay'>
      <div className="productdisplay-left">
      {hasImages && (
          <>
            <div className="productdisplay-img-list">
              {product.image.map((image, index) => (
                <img key={index} onClick={() => selectimg(image)} src={image} alt={`Thumbnail ${index}`} />
              ))}
            </div>
            <div className="productdisplay-img">
              <img className='productdisplay-main-img' src={mainImage} alt="" />
            </div>
          </>
        )}
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-star">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">${product.old_price}</div>
          <div className="productdisplay-right-price-new">${product.new_price}</div>
        </div>
        <div className="productdisplay-right-description">
          <div>{product.description}</div>
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-sizes">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div>
        <div className='container-cart-wsp'>
        <button onClick={()=>{addToCart(product.id)}}>ADD TO CART</button>
        <a className='btn-wsp' href={`https://wa.me/593994084941?text=${encodeURIComponent(mensaje)}`} target="_blank" rel="noreferrer">
        <FontAwesomeIcon icon={faWhatsapp} />
        Comprar por WhatsApp
      </a>
      </div>






        <p className='productdisplay-right-category'><span>Category:</span> {product.category} , T-Shirt, Crop Top</p>
        <p className='productdisplay-right-category'><span>Tags:</span> Moderns , Latest</p>
      </div>
      </div>
  )
}

export default ProductDisplay