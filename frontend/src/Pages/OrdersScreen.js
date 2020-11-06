import React, {useEffect} from 'react';
import { addToPlaceOrder, removeFromPlaceOrder } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import CheckoutSteps from '../components/CheckoutSteps';

function OrdersScreen(props){

    // const orderPay = useSelector(state => state.orderPay);
    // const {loading: loadinPay, success: successPay, error: errorPay } = orderPay;
    // const orderCreate = useSelector(state => state.orderCreate);
    // const {loading, success, error, order} = orderCreate;

    const dispatch = useDispatch();


    // useEffect(() => {
    // dispatch(listOrders());
    //   return () => {

    //     }
    // }, [successDelete])

    // const deleteHandler = () => {
    //     dispatch(deleteOrder(order, paymentResult));
    // }

    return <div>
    {/* loading ? <div>Loading...</div> : error ? <div>{error}</div> : */}
    {/* <div className="placeorder">
      <div className="placeorder-info">
        <div>
          <h3>
            Shipping
          </h3>
          <div>
            {cart.shipping.address}, {cart.shipping.city},
          {cart.shipping.postalCode}, {cart.shipping.country},
          </div>
          <div>
              {order.isDelivered ? "Delivered at " + order.deliveredAt : "Not Delivered"}
          </div>
        </div>
        <div>
          <h3>Payment</h3>
          <div>
            Payment Method: {cart.payment.paymentMethod}
          </div>
          <div>
            {order.isPaid ? "Paid at " + order.paidAt : "Not Paid"}
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
              cartItems.length === 0 ?
                <div>
                  Cart is empty
                </div>
                :
                cartItems.map(item =>
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
            {loadingPay && <div>Finishing Payment...</div>}
            {!order.isPaid &&
                <PaypalButton amount ={order.totalPrice} onSuccess={successPaymentHandler} />}
          </li>
          <li>
            <h3>Order Summary</h3>
          </li>
          <li>
            <div>Items</div>
            <div>${order.itemsPrice}</div>
          </li>
          <li>
            <div>Shipping</div>
            <div>${order.shippingPrice}</div>
          </li>
          <li>
            <div>Tax</div>
            <div>${order.taxPrice}</div>
          </li>
          <li>
            <div>Order Total</div>
            <div>${order.totalPrice}</div>
          </li>
        </ul>
      </div>
    </div> */}
  </div>
}

export default OrdersScreen;