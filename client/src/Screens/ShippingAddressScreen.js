import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AddShippingAddress } from '../Action/CartAction';
import CheckoutStep from '../Component/CheckoutStep'

function ShippingAddressScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userSignIn = useSelector((state) => state.userSignIn);

    const { userInfo } = userSignIn;
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const [fullName, setFullName] = useState(shippingAddress.fullName || '');
    const [address, setAddress] = useState(shippingAddress.address || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
    const [country, setCountry] = useState(shippingAddress.country || '');

    useEffect(() => {
        if (!userInfo) {
            navigate('/signin');
        }
    }, [userInfo])


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(AddShippingAddress({ fullName, address, city, postalCode, country }));
        navigate('/payment');
    }

    return (
        <div>
            <CheckoutStep step1 step2 />
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Shipping Address</h1>
                </div>
                <div>
                    <label htmlFor="fullName">Full Name</label>
                    <input
                        type="text"
                        id="fullName"
                        placeholder="Enter full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    ></input>
                </div>
                <div>
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        id="address"
                        placeholder="Enter address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    ></input>
                </div>
                <div>
                    <label htmlFor="city">City</label>
                    <input
                        type="text"
                        id="city"
                        placeholder="Enter city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    ></input>
                </div>
                <div>
                    <label htmlFor="postalCode">Postal Code</label>
                    <input
                        type="text"
                        id="postalCode"
                        placeholder="Enter postal code"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        required
                    ></input>
                </div>
                <div>
                    <label htmlFor="country">Country</label>
                    <input
                        type="text"
                        id="country"
                        placeholder="Enter country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    ></input>
                </div>
                {/* <div>
                    <label htmlFor="chooseOnMap">Location</label>
                    <button type="button" onClick={chooseOnMap}>
                        Choose On Map
                    </button>
                </div> */}
                <div>
                    <label />
                    <button className="primary" type="submit">
                        Continue
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ShippingAddressScreen