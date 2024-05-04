import React from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';

const PaypalButton = ({ totalValue, invoice }) => {
  const isTotalValid = totalValue > 0; // Validar si el total es mayor que cero

  if (!isTotalValid) {
    return (
      <div>
        <h3>Total: ${totalValue}</h3>
        <p>El carrito está vacío o el total es cero. Agregue productos para proceder con el pago.</p>
      </div>
    );
  }

  return (
    <div>
      <h3>Total: ${totalValue}</h3>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: invoice,
                amount: {
                  value: totalValue.toFixed(2), // Asegúrate de que tenga dos decimales
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            console.log('Transacción completada por ', details.payer.name.given_name);
          });
        }}
        onError={(err) => {
          console.error('Error con PayPal:', err);
        }}
      />
    </div>
  );
};

export default PaypalButton;
