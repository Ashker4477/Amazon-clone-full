import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { listOrderMine } from '../Action/OrderAction';
import LoadingBox from '../Component/LoadingBox';
import MessageBox from '../Component/MessageBox';

function OrderHistory() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const orderMineList = useSelector((state) => state.orderMineList);
    const { loading, error, orders } = orderMineList;

    useEffect(() => {
      dispatch(listOrderMine());
    }, [])
    

    return (
        <div>
            <h1>Order History</h1>
            {
                loading ? <LoadingBox></LoadingBox> :
                    error ? <MessageBox variant={'danger'}>{error}</MessageBox> :
                        <table className='table'>
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
                                {
                                    orders.map((order) =>
                                        <tr key={order._id}>
                                            <td>{order._id}</td>
                                            <td>{order.createdAt.substring(0, 10)}</td>
                                            <td>{order.totalPrice}</td>
                                            <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                                            <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : 'No'}</td>
                                            <td>
                                                <button type='button' className='small' onClick={() => navigate(`/order/${order._id}`)}>Details</button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
            }
        </div>
    )
}

export default OrderHistory