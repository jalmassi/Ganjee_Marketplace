import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {  detailsOrder, payOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {PaypalButton} from 'react-paypal-button-v2';

function OrderScreen(props){

  const [sdkReady, setSdkReady] = useState(false);
  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;
  // const orderPay = useSelector(state => state.orderPay);
  // const {loading: loadingPay, success: successPay, error: errorPay } = orderPay;
  const dispatch = useDispatch();

  if(userInfo === undefined){
    props.history.push("/signin");
  }

  useEffect(() => {
    const addPayPalScript = async () => {
      const {data} = await Axios.get('api/config/paypal');const script = document.createElement('script');
      script.type='text/javascript';
      script.src=`http://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () =>
        setSdkReady(true);
        document.appendChild(script);
    }
    if(!order._id){
      dispatch(detailsOrder(props.match.params.id));
    } else{
      if(!order.isPaid){
        if(!window.paypal){
          addPayPalScript();
        } else{
          sdkReady(true);
        }
      }
    }
  }, [props, props.match.params.id, dispatch, sdkReady])

    // dispatch(detailsOrder(props.match.params.id));
  const orderDetails = useSelector(state => state.orderDetails);
  const {loading: loadingD, order: orderD, error: errorD} = orderDetails;

  const createOrder = useSelector(state => state.orderCreate);
  const {order, error} = createOrder;

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
                Paid at {order.PaidAt}
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
                  <li>
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
          <li className="placeorder-actions-payment">
            {/* {loadingPay && <div>Finishing Payment...</div>} */}
            {/* {!order.isPaid &&
                <PaypalButton amount ={order.totalPrice} onSuccess={successPaymentHandler} />} */}
          </li>
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
          {
            !order.isPaid && (
            <li>
              {!sdkReady ? (<LoadingBox></LoadingBox>) :
              (<PaypalButton amount ={order.totalPrice} onSuccess={successPaymentHandler}></PaypalButton>
              )}
            </li>
            )}
        </ul>
      </div>
    </div>
  </div>
}

export default OrderScreen;