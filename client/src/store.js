import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './Reducer/CartReducer';
import { deliverOrderReducer, getOrderDetailReducer, getOrderListReducer, orderCreateReducer, orderDeleteReducer, orderMineListReducer, orderPayReducer } from './Reducer/OrderReducer';
import { createProductReducer, deleteProductReducer, productDetailReducer, productListReducer, productUpdateReducer } from './Reducer/ProductReducer';
import { RegisterReducer, SignInReducer, updateUserProfileReducer, UserDetailReducer } from './Reducer/UserReducer';

const initialState = {
    userRegister: {
        userInfo: localStorage.getItem("userInfo") ?
            JSON.parse(localStorage.getItem("userInfo")) :
            null,
    },
    userSignIn: {
        userInfo: localStorage.getItem("userInfo") ?
            JSON.parse(localStorage.getItem("userInfo")) :
            null,
    },
    cart: {
        cartItems: localStorage.getItem("cartItems") ?
            JSON.parse(localStorage.getItem("cartItems")) :
            [],
        shippingAddress: localStorage.getItem("shippingAddress") ?
            JSON.parse(localStorage.getItem("shippingAddress")) :
            {},
        'paymentMethod': 'Paypal'
    },
}

const reducer = combineReducers({
    productList: productListReducer,
    productDetail: productDetailReducer,
    cart: cartReducer,
    userSignIn: SignInReducer,
    userRegister: RegisterReducer,
    orderCreate: orderCreateReducer,
    orderDetails: getOrderDetailReducer,
    orderPay: orderPayReducer,
    orderMineList: orderMineListReducer,
    userDetails: UserDetailReducer,
    userUpdateProfile: updateUserProfileReducer,
    createdProduct: createProductReducer,
    productUpdate: productUpdateReducer,
    productDelete: deleteProductReducer,
    orderList: getOrderListReducer,
    deleteOrder: orderDeleteReducer,
    orderDeliver: deliverOrderReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;