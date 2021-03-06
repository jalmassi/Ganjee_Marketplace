import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import { listOrderMine } from '../actions/orderActions';

export default function OrderHistoryPage(props) {
    const orderMineList = useSelector(state => state.orderMineList);
    const {loading, orders, error} = orderMineList;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listOrderMine());
        return () => {

        }
    }, [dispatch])

    return (
        <div>
            <h1>Order History</h1>
            {loading ? <LoadingBox></LoadingBox> :
                error ? <MessageBox variant="danger">{error}</MessageBox> :
                    (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>PAID</th>
                                    <th>DELIVERED</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.createdAt}</td>
                                        <td>{order.totalPrice}</td>
                                        <td>{order.isPaid ? order.paidAt.substring(0,10) : 'No'}</td>
                                        <td>{order.isDelivered ? order.isDelivered.substring(0,10) : 'No'}</td>
                                        <td>
                                            <button type="button" className="small" onClick={() => {props.history.push(`/order/$order._id`)}} >
                                                Details</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
        </div>
    )
}
