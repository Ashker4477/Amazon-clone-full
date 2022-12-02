import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { getOrderList, orderDelete } from '../Action/OrderAction';
import LoadingBox from '../Component/LoadingBox';
import MessageBox from '../Component/MessageBox';

function OrderListScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const orderList = useSelector(state => state.orderList);
    const { loading, error, orders } = orderList;

    const deleteOrder = useSelector(state => state.deleteOrder);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = deleteOrder;

    useEffect(() => {
        dispatch(getOrderList());
    }, [successDelete]);

    const deleteHandler = (orderId) => {
        // todo
        dispatch(orderDelete(orderId));
    }

    return (
        <div>
            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && <MessageBox variant={'danger'}>{errorDelete}</MessageBox>}
            {
                loading ? <LoadingBox></LoadingBox>
                    :
                    error ? <MessageBox variant={'danger'}>{error}</MessageBox>
                        :
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>USER</th>
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>PAID</th>
                                    <th>DELIVERED</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orders && orders.map((order) => (
                                        <tr key={order._id}>
                                            <td>{order._id}</td>
                                            <td>{order.user.name}</td>
                                            <td>{order.createdAt.substring(0, 10)}</td>
                                            <td>{order.totalPrice}</td>
                                            <td>{order.isPaid ? order.paidAt.substring(0, 10) : "NO"}</td>
                                            <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : "NO"}</td>
                                            <td>
                                                <button type='button' className='small'
                                                    onClick={() => navigate(`/order/${order._id}`)}>Edit</button>
                                                <button type='button' className='small'
                                                    onClick={() => deleteHandler(order._id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
            }
        </div>
    )
}

export default OrderListScreen