import React from 'react';
import { PayPalButtons } from "@paypal/react-paypal-js";

const PaypalButton = ({ totalValue, invoice }) => (
  <div>
    <h3>Total: {totalValue}</h3>
    <PayPalButtons
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              description: invoice,
              amount: {
                value: totalValue, // El monto total a pagar
              },
            },
          ],
        });
      }}
      onApprove={(data, actions) => {
        return actions.order.capture().then((details) => {
          // Realiza acciones después de la aprobación, como actualizar el estado de pago
          console.log("Transaction completed by ", details.payer.name.given_name);
        });
      }}
    />
  </div>
);

export default PaypalButton;
