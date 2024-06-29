import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';
import PaypalButton from '../PaypalButton/PaypalButton';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

const CartItems = () => {
    const { getTotalCartAmount, all_product, cartItems, removeFromCart, selectedSize } = useContext(ShopContext);

    if (all_product.length === 0) {
        return <div className="loading-spinner">
            <FontAwesomeIcon icon={faSpinner} spin />
        </div>;
    }

    return (
        <div className='cartitems'>
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Size</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {Object.keys(cartItems).map(cartKey => {
                const quantity = cartItems[cartKey];
                const [productId, size] = cartKey.split('-');
                const product = all_product.find(product => product.id === parseInt(productId));

                if (product && quantity > 0) {
                    return (
                        <div key={cartKey}>
                            <div className="cartitems-format cartitems-format-main">
                                <img src={product.image[0]} alt="" className='carticon-product-icon' />
                                <p>{product.name}</p>
                                <p>${product.new_price}</p>
                                <p>{size}</p>
                                <button className='cartitems-quantity'>{quantity}</button>
                                <p>${product.new_price * quantity}</p>
                                <img className='cartitems-remove-icon' src={remove_icon} onClick={() => { removeFromCart(cartKey) }} alt="" />
                            </div>
                            <hr />
                        </div>
                    );
                }
                return null;
            })}
            <div className="cartitems-down">
                <div className="cartsitems-total">
                    <h1>Cart Totals</h1>
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
                    </div>
                    
                    <PaypalButton key={getTotalCartAmount()} totalValue={getTotalCartAmount()} invoice="Order12345" />
                    
                </div>
                <div className="cartitems-promocode">
                    <p>If you have a promo code, enter it here</p>
                    <div className="cartitems-promobox">
                        <input type="text" placeholder='Promo code' />
                        <button>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartItems;
