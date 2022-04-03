import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { PayPalButton } from 'react-paypal-button-v2'
import { deliverOrder, getOrderDetail, payOrder } from '../Action/OrderAction';
import LoadingBox from '../Component/LoadingBox';
import MessageBox from '../Component/MessageBox';
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from '../Constants/OrderConstants';

function OrderScreen() {

    const dispatch = useDispatch();
    const params = useParams();
    const { id: orderId } = params;

    const order = useSelector((state) => state.orderDetails);
    const { loading, orderDetail, error } = order;

    const userSignIn = useSelector((state) => state.userSignIn);
    const { userInfo } = userSignIn;

    const orderDeliver = useSelector((state) => state.orderDeliver);
    const { loading: loadingDeliver, error: errorDeliver, success: successDeliver } = orderDeliver;

    const [sdkReady, setSdkReady] = useState(false);

    const successPayment = (paymentResult) => {
        dispatch(payOrder(order, paymentResult));
    };

    const orderPay = useSelector((state) => state.orderPay);
    const { loading: loadingPay, error: errorPay, success: successPay } = orderPay;

    useEffect(() => {
        const addPaypalScript = async () => {
            const { data } = await axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type = "text/javascript";
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            }
            document.body.appendChild(script);
        }
        if (!orderDetail || successPay) {
            dispatch({ type: ORDER_PAY_RESET });
            dispatch(getOrderDetail(orderId));
        } else {
            if (!orderDetail.isPaid) {
                if (!window.paypal) {
                    addPaypalScript();
                } else {
                    setSdkReady(true);
                }
            }
        }
    }, [dispatch, orderDetail, orderId, sdkReady, successPay]);

    useEffect(() => {
        if (successDeliver) {
            dispatch({ type: ORDER_DELIVER_RESET })
            dispatch(getOrderDetail(orderId));
        }
    }, [successDeliver])


    const deliverHandler = (orderId) => {
        dispatch(deliverOrder(orderId));
    };

    return loading ? (
        <LoadingBox></LoadingBox>
    ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
    ) : (
        orderDetail ? <div className=''>
            <div className=''>
                <h1>Order {orderDetail._id}</h1>
            </div>
            <div className='row top'>
                <div className='col-2'>
                    <div>
                        <ul>
                            <li>
                                <div className='card card-body'>
                                    <h1>Shipping</h1>
                                    <p>
                                        <strong>Name:</strong>{' '}
                                        {orderDetail.shippingAddress.fullName}
                                    </p>
                                    <p>
                                        <strong>Address:</strong> {' '}{orderDetail.shippingAddress.address}, {orderDetail.shippingAddress.city},
                                        {orderDetail.shippingAddress.postalCode}, {orderDetail.shippingAddress.country}
                                    </p>
                                    {
                                        orderDetail.isDelivered ?
                                            <MessageBox variant='info'>{orderDetail.deliveredAt}</MessageBox>
                                            :
                                            <MessageBox variant='danger'>{"Not Delivered"}</MessageBox>
                                    }
                                </div>
                            </li>
                            <li>
                                <div className='card card-body'>
                                    <h1>Payment</h1>
                                    <p>
                                        <strong>Method: </strong>
                                        {orderDetail.paymentMethod}
                                    </p>
                                    {
                                        orderDetail.isPaid ?
                                            <MessageBox variant='info'>{orderDetail.paidAt}</MessageBox>
                                            :
                                            <MessageBox variant='danger'>{"Not Paid"}</MessageBox>
                                    }
                                </div>
                            </li>
                            <li>
                                <div className='card card-body'>
                                    <h1>Order Items</h1>
                                    {orderDetail.orderItems.map((item) =>
                                        <ul key={item.product}>
                                            <li>
                                                <div className='row'>
                                                    <div>
                                                        <img src={item.image} alt={item.name} className="small"></img>
                                                    </div>
                                                    <div className='min-30'>
                                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                    </div>
                                                    <div>${item.price} * {item.qty} = ${item.price * item.qty}</div>
                                                </div>
                                            </li>
                                        </ul>
                                    )}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='col-1'>
                    <div className='card card-body'>
                        <ul>
                            <li>
                                <h1>Order Summary</h1>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>{"Items"}</div>
                                    <div>${orderDetail.itemsPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>{"Shiping Price"}</div>
                                    <div>${orderDetail.shippingPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>{"Tax Price"}</div>
                                    <div>${orderDetail.taxPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div><strong>{"Total Price"}</strong></div>
                                    <div><strong>${orderDetail.totalPrice.toFixed(2)}</strong></div>
                                </div>
                            </li>
                            {
                                !orderDetail.isPaid &&
                                <li>
                                    <>
                                        {errorPay && (
                                            <MessageBox variant="danger">{errorPay}</MessageBox>
                                        )}
                                        {loadingPay && <LoadingBox></LoadingBox>}
                                    </>
                                    {
                                        !sdkReady ? <LoadingBox></LoadingBox> :
                                            <PayPalButton amount={orderDetail.totalPrice} onSuccess={successPayment}></PayPalButton>
                                    }
                                </li>
                            }
                            {userInfo.isAdmin && orderDetail.isPaid && !orderDetail.isDelivered && (
                                <li>
                                    {loadingDeliver && <LoadingBox></LoadingBox>}
                                    {errorDeliver && (
                                        <MessageBox variant="danger">{errorDeliver}</MessageBox>
                                    )}
                                    <button
                                        type="button"
                                        className="primary block"
                                        onClick={() => deliverHandler(orderDetail._id)}
                                    >
                                        Deliver Order
                                    </button>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
            : ""
    )
}

export default OrderScreen