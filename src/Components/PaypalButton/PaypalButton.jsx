import React from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import Swal from 'sweetalert2';

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

  const handlePaymentSuccess = (details) => {
    Swal.fire({
      title: '¡Pago exitoso!',
      text: `Transacción completada por ${details.payer.name.given_name}`,
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
  };

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
          return actions.order.capture().then((handlePaymentSuccess),(details) => {
            console.log('Transacción completada por ', details.payer.name.given_name);
            console.log('Dirección de envío: ', details.purchase_units[0].shipping.address);
            

          });
        }}
        onError={(err) => {
          console.error('Error con PayPal:', err);
          Swal.fire({
            title: 'Error',
            text: 'Hubo un problema con el pago. Inténtalo de nuevo.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }}
      />
    </div>
  );
};

export default PaypalButton;
