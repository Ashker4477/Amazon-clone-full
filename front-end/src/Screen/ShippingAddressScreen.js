import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../Actions/CartAction";
import CheckoutStep from "../Components/CheckoutStep";

export default function ShippingAddressScreen(props) {
  const userSignin = useSelector((state) => state.UserSignin);
  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!userInfo) {
    props.history.push("/signin");
  }
  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [Address, setAddress] = useState(shippingAddress.Address);
  const [City, setCity] = useState(shippingAddress.City);
  const [PostalCode, setPostalCode] = useState(shippingAddress.PostalCode);
  const [Country, setCountry] = useState(shippingAddress.Country);

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ fullName, Address, City, PostalCode, Country })
    );
    props.history.push("/payment");
  };
  return (
    <div>
      <CheckoutStep step1 step2></CheckoutStep>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Shipping Address:</h1>
        </div>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            placeholder="Enter FullName"
            onChange={(e) => setFullName(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="Address"> Address</label>
          <input
            type="text"
            id="Address"
            value={Address}
            placeholder="Enter Address"
            onChange={(e) => setAddress(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="City">City</label>
          <input
            type="text"
            id="City"
            value={City}
            placeholder="Enter City"
            onChange={(e) => setCity(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="PostalCode">Postal Code</label>
          <input
            type="text"
            id="PostalCode"
            value={PostalCode}
            placeholder="Enter PostalCode"
            onChange={(e) => setPostalCode(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="Country">Country</label>
          <input
            type="text"
            id="Country"
            value={Country}
            placeholder="Enter Country"
            onChange={(e) => setCountry(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label />
          <button type="submit" className="primary">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
