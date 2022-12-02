import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { createdOrder } from '../Action/OrderAction';
import CheckoutStep from '../Component/CheckoutStep'
import LoadingBox from '../Component/LoadingBox';
import MessageBox from '../Component/MessageBox';
import { ORDER_CREATE_RESET } from '../Constants/OrderConstants';

function PlaceOrderScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const orderCreate = useSelector((state) => state.orderCreate);
    const { order, success, error, loading } = orderCreate;

    const toPrice = (num) => Number((num).toFixed(2));

    cart.itemsPrice = toPrice(cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0));
    cart.shippingPrice = cart.itemsPrice < 1000 ? 50 : 0
    cart.taxPrice = toPrice(0.18 * cart.itemsPrice);
    cart.totalPrice = toPrice(cart.itemsPrice + cart.shippingPrice + cart.taxPrice);

    useEffect(() => {
        if (!cart.paymentMethod) {
            navigate('/payment');
        }
    }, [cart.paymentMethod])


    const placeOrderHandler = () => {
        // todo place order
        dispatch(createdOrder({ ...cart, orderItems: cart.cartItems }));
    }

    useEffect(() => {
        if (success) {
            navigate(`/order/${order._id}`);
            dispatch({ type: ORDER_CREATE_RESET });
        }
    }, [dispatch, success])


    return (
        <div>
            <CheckoutStep step1 step2 step3 step4 />
            <div className='row top'>
                <div className='col-2'>
                    <ul>
                        <li>
                            <div className='card card-body'>
                                <h1>Shipping</h1>
                                <p>
                                    <strong>Name:</strong> {shippingAddress.fullName}
                                </p>
                                <p>
                                    <strong>Address:</strong> {shippingAddress.address}, {shippingAddress.city},
                                    {shippingAddress.postalCode}, {shippingAddress.country}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className='card card-body'>
                                <h1>Payment</h1>
                                <p>
                                    <strong>Method:</strong> {cart.paymentMethod}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className='card card-body'>
                                <h1>Order Items</h1>
                                {cart.cartItems.map((item) =>
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
                <div className='col-1'>
                    <div className='card card-body'>
                        <ul>
                            <li>
                                <h1>Order Summary</h1>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>{"Items"}</div>
                                    <div>${cart.itemsPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>{"Shiping Price"}</div>
                                    <div>${cart.shippingPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>{"Tax Price"}</div>
                                    <div>${cart.taxPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div><strong>{"Total Price"}</strong></div>
                                    <div><strong>${cart.totalPrice.toFixed(2)}</strong></div>
                                </div>
                            </li>
                            <li>
                                <button type='button' className='primary block' onClick={placeOrderHandler} disabled={cart.cartItems.length === 0}>
                                    Place Order
                                </button>
                            </li>
                            {loading && <LoadingBox></LoadingBox>}
                            {error && <MessageBox variant="danger">{error}</MessageBox>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaceOrderScreen