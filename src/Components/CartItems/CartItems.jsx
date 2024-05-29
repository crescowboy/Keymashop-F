import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png';
import PaypalButton from '../PaypalButton/PaypalButton';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
    
const CartItems = () => {
    const {getTotalCartAmount,all_product,cartItems,removeFromCart,selectedSize, setSelectedSize} = useContext(ShopContext);

    if (all_product.length === 0) {
        return  <div className="loading-spinner">
    <FontAwesomeIcon icon={faSpinner} spin />
    </div>
    }
    
  return (
    <div className='cartitems'>
        <div className="cartitems-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Size</p>
            <p>Quantily</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <hr />
        {all_product.map((e,index)=>{
            if(cartItems[e.id]>0)
            {
                return <div key={index}>
                <div className="cartitems-format cartitems-format-main">
                    <img src={e.image[0]} alt="" className='carticon-product-icon' />
                    <p>{e.name}</p>
                    <p>${e.new_price}</p>
                    <p>{selectedSize[e.id]}</p>
                    <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                    <p>${e.new_price*cartItems[e.id]}</p>
                    <img className='cartitems-remove-icon' src={remove_icon} onClick={()=>{removeFromCart(e.id)}} alt="" />
                </div>
                <hr />
            </div>
            }
            return null;
        })}
        <div className="cartitems-down">
        <div className="cartsitems-total">
            <h1>cart Totals</h1>
            <div>
                <div className="cartitems-total-item">
                    <p>Subtotal</p>
                    <p>${getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className="cartitems-total-item">
                    <p>Shipping Fee</p>
                    <p>Free</p>
                </div>
                <hr />
                {/* <div className="cartitems-total-item">
                    <h3>Total</h3>
                    <h3>{getTotalCartAmount()}</h3>
                </div> */}
            </div>
            {/* <button>PROCEED TO CHECKOUT</button> */}
            <PaypalButton totalValue={getTotalCartAmount()} invoice="Order12345" />
        </div>
        <div className="cartitems-promocode">
            <p>If you have a promo code, Enter it here</p>
            <div className="cartitems-promobox">
                <input type="text" placeholder='promo code'/>
                <button>Submit</button>
            </div>
        </div>
        </div>
        
    </div>
  )
}

export default CartItems