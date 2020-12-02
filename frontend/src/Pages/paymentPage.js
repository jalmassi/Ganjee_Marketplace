import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePayment } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

export default function PaymentPage(props) {

  const cart = useSelector(state => state.cart);
  const {shipping, payment} = cart;
  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const dispatch = useDispatch();

  const [paymentRadio, setPaymentRadio] = useState('');

  if(!shipping.address || !shipping.city ){
    props.history.push("/shipping");
  }

  const submitHandler = (e) => {
    e.preventDefault(); //stops refresh
    dispatch(savePayment({ paymentMethod }));
    props.history.push('placeorder');
  }
  return <div>
    <CheckoutSteps step1 step2 step3 ></CheckoutSteps>
    <div className="form">
      <form onSubmit={submitHandler} >
        <ul className="form-container">
          <li>
            <h2>Payment</h2>
          </li>
          <li>
            <div>
                <input type="radio" checked={paymentMethod==='PayPal'} name="paypal" id="address" value="PayPal" onChange={(e) => setPaymentMethod(e.target.value)}>
                </input>
                <label htmlFor="paypal">
                Paypal
                </label>
            </div>
          </li>
          <li>
            <div>
                <input type="radio" checked={paymentMethod==='Stripe'} name="stripe" id="address" value="Stripe" onChange={(e) => setPaymentMethod(e.target.value)}>
                </input>
                <label htmlFor="stripe">
                Stripe
                </label>
            </div>
          </li>
          <li>
            <button type="submit" className="button primary">Continue</button>
          </li>
        </ul>
      </form>
    </div>
  </div>

}
