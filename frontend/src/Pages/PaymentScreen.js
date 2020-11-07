import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePayment } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

function PaymentScreen(props) {

  const cart = useSelector(state => state.cart);
  const {shipping} = cart;
  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const dispatch = useDispatch();

  if(!shipping.address || !shipping.city ){
    props.history.push("/shipping");
  }

  const submitHandler = (e) => {
    e.preventDefault();
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
                <input type="radio" name="address" id="address" value="PayPal" onChange={(e) => setPaymentMethod(e.target.value)}>
                </input>
                <label htmlFor="address">
                Paypal
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
export default PaymentScreen;