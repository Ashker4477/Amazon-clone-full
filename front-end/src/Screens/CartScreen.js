import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import { addItemToCart, removeItemFromCart } from '../Action/CartAction';
import MessageBox from '../Component/MessageBox';

function CartScreen() {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const productId = params.id;

  const { search } = useLocation();
  const qtyInUrl = new URLSearchParams(search).get('qty');
  const qty = qtyInUrl ? Number(qtyInUrl) : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addItemToCart(productId, qty));
    }
  }, []);

  const removeFromCart = (id) => {
    dispatch(removeItemFromCart(id))
  }
  const checkoutHandler = () => {
    navigate(`/signin?redirect=/shipping`);
  }

  return (
    <div className='row top'>
      <div className='col-2'>
        <h1>Shopping Cart</h1>
        {
          cartItems.length === 0 ? <MessageBox variant={'info'}>
            Cart is empty. <Link to='/'>Go to Shopping.</Link>
          </MessageBox>
            :
            cartItems.map((item) =>
              <ul key={item.product}>
                <li>
                  <div className='row'>
                    <div>
                      <img src={item.image} alt={item.name} className="small"></img>
                    </div>
                    <div className='min-30'>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </div>
                    <div>
                      <select name='qty' value={item.qty} onChange={(e) => dispatch(addItemToCart(item.product, Number(e.target.value)))}>
                        {
                          ([...Array(item.countInStock).keys()]).map((i) => {
                            return (
                              <option key={i + 1} value={i + 1}>{i + 1}</option>
                            )
                          })
                        }
                      </select>
                    </div>
                    <div>${item.price}</div>
                    <div>
                      <button type='button' className='' onClick={() => removeFromCart(item.product)}>Delete</button>
                    </div>
                  </div>
                </li>
              </ul>
            )
        }
      </div>
      <div className='col-1'>
        <div className='card card-body'>
          <ul>
            <li>
              <h1>SubTotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : ${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}</h1>
            </li>
            <li>
              <div className=''>
                <button type='button' onClick={checkoutHandler} className='primary block' disabled={cartItems.length === 0}>Proceed to Checkout</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CartScreen