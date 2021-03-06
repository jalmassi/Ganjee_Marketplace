import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {  detailsOrder, payOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {PayPalButton} from 'react-paypal-button-v2';
import uuid from 'node-uuid';
import {ORDER_PAY_RESET} from '../constants/orderConstants';
import { CART_EMPTY } from '../constants/cartConstants';

export default function OrderPage(props){

  const [sdkReady, setSdkReady] = useState(false);
  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;
  const orderPay = useSelector(state => state.orderPay);
  const {loading: loadingPay, success: successPay, error: errorPay } = orderPay;
  const dispatch = useDispatch();

  if(userInfo === undefined){
    props.history.push("/signin");
  }

  useEffect(() => {
    const addPayPalScript = async () => {
      const {data} = await Axios.get('/api/config/paypal');
      console.log("after await axios paypal");
      const script = document.createElement('script');
      script.type='text/javascript';
      console.log(data);
      script.src=`https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      }
      console.log("sdkready: " + sdkReady);
      document.body.appendChild(script);
    };
    if((!order || successPay || (order && order._id !== props.match.params.id))){ //if orderDetails hasn't run before or order is paid or wrong order id, get updated order
      dispatch({type: ORDER_PAY_RESET});
      // dispatch({type: CART_EMPTY});
      dispatch(detailsOrder(props.match.params.id));
    } else{
      console.log("order.isPaid: " + order.isPaid);
      if(!order.isPaid){
        console.log("window.paypal: " + window.paypal);
        if(!window.paypal){
          console.log("in if !window.paypal");
          addPayPalScript();
        } else{
          console.log("in else !window.paypal");
          setSdkReady(true);
          console.log("sdkReady else: " + sdkReady);
        }
      }
    }
  }, [props, props.match.params.id, dispatch, sdkReady, successPay])

    // dispatch(detailsOrder(props.match.params.id));
  const orderDetails = useSelector(state => state.orderDetails);
  const {order, loading: loadingD, order: orderD, error: errorD} = orderDetails;

  const createOrder = useSelector(state => state.orderCreate);
  const {error} = createOrder;

  const successPaymentHandler = (paymentResult) => {
      dispatch(payOrder(order, paymentResult));
  }
  // console.log(Number(order.totalPrice).toFixed(2));
  return loadingD ? <LoadingBox></LoadingBox> : error ? <MessageBox variant="danger">{error}</MessageBox> :
  <div>
    <h1>Order {order._id}</h1>
  <div className="placeorder">
      <div className="placeorder-info">
        <div>
        <h2>
          Shipping
        </h2>
        <p>
          <strong>Name:</strong> {userInfo.name}
          <br></br><strong>Address:</strong>  {order.shipping.address}, {order.shipping.city},
        {order.shipping.postalCode}, {order.shipping.country},
        </p>
          {order.isDelivered ?
            (<MessageBox variant="success">
              Delivered at {order.deliveredAt}
            </MessageBox>)
            :
            <MessageBox variant="danger">Not Delivered</MessageBox>
          }
        </div>
        <div>
          <h3>Payment</h3>
          <div>
            Payment Method: {order.payment.paymentMethod}
          </div>
          <div>
            {order.isPaid ?
              (<MessageBox variant="success">
                Paid at {order.paidAt}
              </MessageBox>)
              :
              (<MessageBox variant="danger">
                Not Paid
              </MessageBox>)
            }
          </div>
        </div>
        <div>
          <ul className="cart-list-container">
            <li>
              <h3>
                Shopping Cart
          </h3>
          <div>
            Price
          </div>
        </li>
            {
              order.orderItems.length === 0 ?
                <div>
                  Cart is empty
                </div>
                :
                order.orderItems.map(item =>
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
                      ${item.price}
                    </div>
                  </li>
                )}
          </ul>
        </div>
      </div>
      <div className="placeorder-action">
        <ul>

          <li>
            <h3>Order Summary</h3>
          </li>
          <li>
            <div>Items</div>
            <div>${(order.itemsPrice).toFixed(2)}</div>
          </li>
          <li>
            <div>Shipping</div>
            <div>${(order.shippingPrice).toFixed(2)}</div>
          </li>
          <li>
            <div>Tax</div>
            <div>${(order.taxPrice).toFixed(2)}</div>
          </li>
          <li>
            <div>Order Total</div>
            <div>${(order.totalPrice).toFixed(2)}</div>
          </li>
          {!order.isPaid &&
          <li className="placeorder-actions-payment">
            {!sdkReady ? (<LoadingBox></LoadingBox>) : (
              <>
                {/* {errorPay && (<MessageBox variant="danger">{errorPay}</MessageBox>)} */}
                {/* {loadingPay ? (<LoadingBox></LoadingBox>) : ''} */}
                <PayPalButton amount ={order.totalPrice} onSuccess={successPaymentHandler} />
              </>
            )}
          </li>
          }
        </ul>
      </div>
    </div>
  </div>
}
