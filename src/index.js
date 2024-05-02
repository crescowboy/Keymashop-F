import React from 'react';
import ReactDOM from 'react-dom/client';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import './index.css';
import App from './App';
import ShopContextProvider from './Context/ShopContext';
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ShopContextProvider>
      <PayPalScriptProvider
        options={{
          "client-id" : "AUW9wsE1p12rmR29MG93bDsDksYASnsb37kbQ9yxrP5AIkHmeLFamBliXTg9ETaGeRo2Twc0HcfTv9Mt"
        }}
      >
      <App />
      </PayPalScriptProvider>
      
    </ShopContextProvider>
    
  
);


