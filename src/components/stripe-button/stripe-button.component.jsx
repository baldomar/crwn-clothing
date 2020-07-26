import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    'pk_test_51H9AiIFDJPnW27xsG5gI7rUyK63CHX7EsuQCeXerT00u158fhDJoRjoHwQBv9zE82VXiMrOeF4VLCpTOEWJcKjUi00xnhXU8g2';

  const onToken = (token) => {
    console.log(token);
    alert('Payment Successful');
  };

  return (
    <StripeCheckout
      label='Pay Now'
      name='CRWN Clothing Ltd.'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};


export default StripeCheckoutButton