import React from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import ProductScreen from "./Screen/ProductScreen";
import HomeScreen from "./Screen/HomeScreen";
import CartScreen from "./Screen/CartScreen";
import { useDispatch, useSelector } from "react-redux";
import SigninScreen from "./Screen/SigninScreen";
import { signout } from "./Actions/UserAction";
import RegisterScreen from "./Screen/RegisterScreen";
import ShippingAddressScreen from "./Screen/ShippingAddressScreen";
import PaymentMethodScreen from "./Screen/PaymentMethodScreen";
import PlaceOrderScreen from "./Screen/PlaceOrderScreen";
import OrderScreen from "./Screen/OrderScreen";
import OrderHistoryScreen from "./Screen/OrderHistoryScreen";

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const UserSignin = useSelector((state) => state.UserSignin);
  const { userInfo } = UserSignin;
  const dispatch = useDispatch();
  const signoutHandler = (e) => {
    e.preventDefault();
    dispatch(signout());
  };

  return (
    <Router>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link to="/" className="brand">
              Amazon
            </Link>
          </div>
          <div>
            <Link to="/Cart">
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name}
                  <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/orderhistory">Order History</Link>
                  </li>
                  <li>
                    <Link to="/#signout" onClick={signoutHandler}>
                      Signout
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
               <Link to="/signin">Sign-in</Link>
            )}
          </div>
        </header>
        <main>
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/signin" component={SigninScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/shipping" component={ShippingAddressScreen} />
          <Route path="/payment" component={PaymentMethodScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/orderhistory" component={OrderHistoryScreen} />
          <Route path="/" component={HomeScreen} exact />
        </main>
        <footer className="row center">@muhammed ashker</footer>
      </div>
    </Router>
  );
}

export default App;
