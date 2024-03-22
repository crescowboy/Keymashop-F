import React, { useContext } from 'react'
import './ProductDisplay.css'
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png"
import { ShopContext } from '../../Context/ShopContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
const ProductDisplay = (props) => {
  const {product} = props;
  const {addToCart} = useContext(ShopContext);
  // Construir el mensaje de WhatsApp con el enlace del producto
  const mensaje = `¡Hola! Estoy interesado en comprar el producto ${product.name}. Aquí está el enlace: http://localhost:3000/product/${product.id}`;
  return (
    <div className='productdisplay'>
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>
        <div className="productdisplay-img">
          <img className='productdisplay-main-img' src={product.image} alt="" />
        </div>
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
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero, sed atque saepe eligendi,
          aliquam tempora fugiat laboriosam perspiciatis magnam sit temporibus unde omnis amet aliquid 
          error ex iusto vitae quidem.
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






        <p className='productdisplay-right-category'><span>Category :</span>Women , T-Shirt, Crop Top</p>
        <p className='productdisplay-right-category'><span>Tags :</span>Moderns , Latest</p>
      </div>
      </div>
  )
}

export default ProductDisplay