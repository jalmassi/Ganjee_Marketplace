import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import uuid from 'node-uuid';

function PlaceOrderScreen(props){

  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;
  const userId = userInfo._id;
  const cart = useSelector(state => state.cart);
  const orderCreate = useSelector(state => state.orderCreate);
  const {loading, success, error, order} = orderCreate;

  const {cartItems, shipping, payment} = cart;
  if(userInfo === undefined){
    props.history.push("/signin");
  }
  if(!shipping.address){
    props.history.push("/shipping");
  }
  if(!payment.paymentMethod){
    props.history.push("/payment");
  }

  cart.itemsPrice = cartItems.reduce((a,b) => a + b.price*b.qty, 0).toFixed(2);
  cart.shippingPrice = cart.itemsPrice < 100 ? 0 : (7).toFixed(2);
  cart.taxPrice = (0.15 * cart.itemsPrice).toFixed(2);
  cart.totalPrice = (parseFloat(cart.itemsPrice) + parseFloat(cart.shippingPrice) + parseFloat(cart.taxPrice)).toFixed(2);

  const dispatch = useDispatch();

  useEffect(() => {
    if(success){
      props.history.push("/order/" + order._id);
      // dispatch({type: ORDER_CREATE_RESET});
    }
    return () => {

      }
  }, [success, dispatch, props.history])

  const placeOrderHandler = () => {
    dispatch(createOrder({...cart, orderItems: cart.cartItems, userId}))
      // dispatch(createOrder({
      //   cartItems, shipping, payment, itemsPrice, shippingPrice, taxPrice, totalPrice, userId
      // }));
  }

  return <div>
  <CheckoutSteps step1 step2 step3 step4 ></CheckoutSteps>
  <div className="placeorder">
    <div className="placeorder-info">
      <div>
        <h2>
          Shipping
        </h2>
        <p>
          <strong>Name:</strong> {userInfo.name}
          <br></br><strong>Address:</strong>  {cart.shipping.address}, {cart.shipping.city},
        {cart.shipping.postalCode}, {cart.shipping.country},
        </p>
      </div>
      <div>
        <h2>Payment</h2>
        <div>
          <strong>Payment Method:</strong> {cart.payment.paymentMethod}
        </div>
      </div>
      <div>
        <ul className="cart-list-container">
          <li>
            <h2>
              Shopping Cart
        </h2>
        <div>
          Price
        </div>
      </li>
          {
            cartItems.length === 0 ?
              <div>
                Cart is empty
              </div>
              :
              cartItems.map(item =>
                <li key={uuid()}>
                  <div className="cart-image">
                    <img src={item.image} alt="product" />
                  </div>
                  <div className="cart-name">
                    <div>
                      <Link to={"/product/" + item.product}>
                        {item.name}
                      </Link>

                    </div>
                    <div>
                      Qty: {item.qty}
                    </div>
                  </div>
                  <div className="cart-price">
                    {item.qty} x {item.price.toFixed(2)} = ${(item.qty*item.price).toFixed(2)}
                  </div>
                </li>
              )}
        </ul>
      </div>
    </div>
    <div className="placeorder-action">
      <ul>
        <li>
          <button className="button primary full-width" onClick={placeOrderHandler} disabled={cart.cartItems.length===0}>Place Order</button>
        </li>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <li>
          <h3>Order Summary</h3>
        </li>
        <li>
          <div>Items</div>
          <div>${cart.itemsPrice}</div>
        </li>
        <li>
          <div>Shipping</div>
          <div>${cart.shippingPrice}</div>
        </li>
        <li>
          <div>Tax</div>
          <div>${cart.taxPrice}</div>
        </li>
        <li>
          <div>Order Total</div>
          <div>${cart.totalPrice}</div>
        </li>
      </ul>
    </div>
  </div>
</div>
}

export default PlaceOrderScreen;