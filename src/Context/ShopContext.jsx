import React, { createContext, useEffect, useState } from "react";
// import all_product from '../Components/Assets/all_product';

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 300 + 1; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {
    const [all_product, setAll_product] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [selectedSize, setSelectedSize] = useState({});

    useEffect(()=>{
        fetch('http://localhost:4000/allproducts')
        .then((response) => response.json())
        .then((data) => setAll_product(data))
        .catch((error) => console.error('Error fetching all products:', error));
    
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/getcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: "",
            })
            .then((response) => response.json())
            .then((data) => setCartItems(data))
            .catch((error) => console.error('Error fetching cart items:', error));
        }
    }, []);
    

    const addToCart = async (itemId,size) => {
        setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));

        // Save selected size to state
        setSelectedSize((prev) => ({ ...prev, [itemId]: size }));
    
        if (localStorage.getItem('auth-token')) {
            try {
                const response = await fetch('http://localhost:4000/addtocart', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'auth-token': `${localStorage.getItem('auth-token')}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ itemId: itemId }),
                });
                const data = await response.json();
    
                // Actualiza el estado del carrito con la respuesta del backend
                setCartItems(data.cartData);
            } catch (error) {
                console.error('Error adding item to cart:', error);
            }
        }
    };
    

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/removefromcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "itemId": itemId }),
            })
                .then((response) => {
                    if (!response.ok) {
                        return response.text().then(text => { throw new Error(text) });
                    }
                    return response.json();
                })
                .then((data) => console.log(data))
                .catch(error => console.error('Error removing from cart:', error));
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                console.log(cartItems[item]);
                let itemInfo = all_product.find((product) => product.id === Number(item));
                if (itemInfo) { // Check if itemInfo is not undefined
                    totalAmount += itemInfo.new_price * cartItems[item];
                } else {
                    console.error(`Product with id ${item} not found in all_product`);
                }
            }
        }
        return totalAmount;
    }
    

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    }

    const contextValue = { getTotalCartItems, getTotalCartAmount, all_product, cartItems, addToCart, removeFromCart,selectedSize, setSelectedSize };
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
