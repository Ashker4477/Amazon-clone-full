import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { savePaymentMethod } from '../Action/CartAction';
import CheckoutStep from '../Component/CheckoutStep'

function PaymentScreen() {

    const [payment_method, setPayment_method] = useState('Paypal');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    useEffect(() => {
        if (!shippingAddress.address) {
            navigate('/shipping');
        }
    }, [shippingAddress.address]);

    function onSubmitPayment(e) {
        e.preventDefault();
        dispatch(savePaymentMethod(payment_method));
        navigate('/placeorder');
    }

    return (
        <div>
            <CheckoutStep step1 step2 step3 />
            <form className='form' onSubmit={onSubmitPayment}>
                <div>
                    <h1>Payment Method</h1>
                </div>
                <div>
                    <div>
                        <input type={'radio'} id={'paypal'} name={'payment_method'} value={'Paypal'} required checked onChange={(e) => setPayment_method(e.target.value)} />
                        <label htmlFor='paypal'>Paypal</label>
                    </div>
                </div>
                <div>
                    <div>
                        <input type={'radio'} id={'stripe'} name={'payment_method'} value={'Stripe'} required onChange={(e) => setPayment_method(e.target.value)} />
                        <label htmlFor='stripe'>Stripe</label>
                    </div>
                </div>
                <div>
                    <button type='submit' className='primary'>Continue</button>
                </div>
            </form>
        </div>
    )
}

export default PaymentScreen