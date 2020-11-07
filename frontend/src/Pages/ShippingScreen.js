import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShipping } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

function ShippingScreen(props) {

  const cart = useSelector(state => state.cart);
  const {shipping} = cart;
  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState(shipping ? shipping.address : '');
  const [city, setCity] = useState(shipping ? shipping.city : '');
  const [postalCode, setPostalCode] = useState(shipping ? shipping.postalCode : '');
  const [country, setCountry] = useState(shipping ? shipping.country : '');
  const dispatch = useDispatch();

  console.log("address: " + address);
  if(userInfo === undefined){
    props.history.push("/signin");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShipping({ fullName, address, city, postalCode, country }));
    props.history.push('/payment');
  }
  return <div>
    <CheckoutSteps step1 step2 ></CheckoutSteps>
    <div className="form">
      <form onSubmit={submitHandler} >
        <ul className="form-container">
          <li>
            <h2>Shipping</h2>
          </li>
          <li>
            <label htmlFor="address">
              Address
          </label>
            <input type="text" name="address" id="address" value={address} onChange={(e) => setAddress(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="city">
              City
          </label>
            <input type="text" name="city" id="city" value={city} onChange={(e) => setCity(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="postalCode">
              Postal Code
          </label>
            <input type="text" name="postalCode" id="postalCode" value={postalCode} onChange={(e) => setPostalCode(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="country">
              Country
          </label>
            <input type="text" name="country" id="country" value={country} onChange={(e) => setCountry(e.target.value)}>
            </input>
          </li>
          <li>
            <button type="submit" className="button primary">Continue</button>
          </li>
        </ul>
      </form>
    </div>
  </div>

}
export default ShippingScreen;