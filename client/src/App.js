import React from 'react'
import './App.css'
import { Link, Route, Routes } from "react-router-dom";
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import CartScreen from './Screens/CartScreen';
import { useDispatch, useSelector } from 'react-redux';
import SignInScreen from './Screens/SignInScreen';
import { userSignOut } from './Action/UserAction';
import RegisterScreen from './Screens/RegisterScreen';
import ShippingAddressScreen from './Screens/ShippingAddressScreen';
import PaymentScreen from './Screens/PaymentScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
import OrderScreen from './Screens/OrderScreen';
import OrderHistory from './Screens/OrderHistory';
import ProfileScreen from './Screens/ProfileScreen';
import PrivateRoute from './Component/PrivateRoute';
import AdminRoute from './Component/AdminRoute';
import ProductListScreen from './Screens/ProductListScreen';
import ProductEditScreen from './Screens/ProductEditScreen';
import OrderListScreen from './Screens/OrderListScreen';

function App() {
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const userSignIn = useSelector((state) => state.userSignIn);
    const { userInfo } = userSignIn;

    const signOutHandler = () => {
        dispatch(userSignOut());
    }

    return (
        <>
            <div className="grid-container">
                <header className="row">
                    <div>
                        <Link className="brand" to="/">amazona</Link>
                    </div>
                    <div>
                        <Link to="/cart">Cart
                            {
                                cartItems.length > 0 &&
                                <span className='badge'>{cartItems.length}</span>
                            }
                        </Link>
                        {
                            userInfo ?
                                <div className='dropdown'>
                                    <Link to={'#'}>{userInfo.name} <i className='fa fa-caret-down'></i></Link>
                                    <ul className='dropdown-content'>
                                        <li>
                                            <Link to={'/profile'}>User Profile</Link>
                                        </li>
                                        <li>
                                            <Link to={'/orderhistory'}>Order History</Link>
                                        </li>
                                        <li>
                                            <Link to={'#'} onClick={signOutHandler}>Sign Out</Link>
                                        </li>
                                    </ul>
                                </div>
                                :
                                <Link to="/signin">Sign In</Link>
                        }
                        {
                            userInfo && userInfo.isAdmin ?
                                <div className='dropdown'>
                                    <Link to={'#'}>Admin <i className='fa fa-caret-down'></i></Link>
                                    <ul className='dropdown-content'>
                                        <li>
                                            <Link to={'/dashboard'} >Dashboard</Link>
                                        </li>
                                        <li>
                                            <Link to={'/productlist'}>Products</Link>
                                        </li>
                                        <li>
                                            <Link to={'/userlist'}>Users</Link>
                                        </li>
                                        <li>
                                            <Link to={'/orderlist'}>Orders</Link>
                                        </li>

                                    </ul>
                                </div>
                                :
                                ""
                        }
                    </div>
                </header>
                <main>
                    <Routes>
                        <Route exact path="/order/:id" element={<OrderScreen />} ></Route>
                        <Route exact path="/cart/" element={<CartScreen />} ></Route>
                        <Route exact path="/cart/:id" element={<CartScreen />} ></Route>
                        <Route exact path="/product/:id" element={<ProductScreen />} ></Route>
                        <Route exact path="/register" element={<RegisterScreen />} ></Route>
                        <Route exact path="/signin" element={<SignInScreen />} ></Route>
                        <Route exact path="/shipping" element={<ShippingAddressScreen />} ></Route>
                        <Route exact path="/payment" element={<PaymentScreen />} ></Route>
                        <Route exact path="/placeorder" element={<PlaceOrderScreen />} ></Route>
                        <Route exact path='/orderhistory' element={<OrderHistory />} ></Route>
                        <Route exact path='/profile' element={<PrivateRoute><ProfileScreen /></PrivateRoute>} ></Route>
                        <Route exact path='/productlist' element={<AdminRoute><ProductListScreen /></AdminRoute>} ></Route>
                        <Route exact path='/product/:id/edit' element={<AdminRoute><ProductEditScreen /></AdminRoute>} ></Route>
                        <Route exact path='/orderlist' element={<AdminRoute><OrderListScreen /></AdminRoute>} ></Route>
                        <Route exact path='/' element={<HomeScreen />} ></Route>
                    </Routes>
                </main>
                <footer className="row center">All right reserved</footer>
            </div>
        </>
    )
}

export default App;