import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getProductDetail } from '../Action/ProductAction';
import LoadingBox from '../Component/LoadingBox';
import MessageBox from '../Component/MessageBox';
import Rating from '../Component/Rating';

function ProductScreen() {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { id: productId } = useParams();
  const productDetail = useSelector((state) => state.productDetail);
  const { loading, error, product } = productDetail;

  const [qty, setQty] = useState(1);

  useEffect(() => {
    dispatch(getProductDetail(productId));
  }, [productId])

  const addToCartHandler = () => {
    history(`/cart/${productId}?qty=${qty}`)
  }

  return (
    <div>
      {loading ? <LoadingBox />
        : error ? <MessageBox variant="danger">{error}</MessageBox>
          :
          <div>
            <Link to="/">Back to result</Link>
            <div className='row top'>
              <div className='col-2'>
                <img className="large" src={product.image} alt={product.name} />
              </div>
              <div className='col-1'>
                <ul>
                  <li>
                    <h1>{product.name}</h1>
                  </li>
                  <li>
                    <Rating rating={product.rating} numReviews={product.numReviews} />
                  </li>
                  <li>
                    <h1>Price : ${product.price}</h1>
                  </li>
                  <li>
                    <p>{product.description}</p>
                  </li>
                </ul>
              </div>
              <div className='col-1'>
                <div className='card card-body'>
                  <ul>
                    <li>
                      <div className='row'>
                        <div>Price:</div>
                        <div className='price'>${product.price}</div>
                      </div>
                    </li>
                    <li>
                      <div className='row'>
                        <div>Status:</div>
                        <div>
                          {product.countInStock > 0 ?
                            <span className='success'>In Stock</span> :
                            <span className='danger'>Unavailable</span>
                          }
                        </div>
                      </div>
                    </li>
                    {
                      product.countInStock > 0 &&
                      <>
                        <li>
                          <div className='row'>
                            <div>Qty</div>
                            <div>
                              <select name='qty' value={qty} onChange={(e) => setQty(e.target.value)}>
                                {
                                  ([...Array(product.countInStock).keys()]).map((i) => {
                                    return (
                                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    )
                                  })
                                }
                              </select>
                            </div>
                          </div>
                        </li>
                        <li>
                          <button onClick={addToCartHandler} className='primary block'>Add to cart</button>
                        </li>
                      </>
                    }
                  </ul>
                </div>
              </div>
            </div>
          </div>
      }
    </div>
  )
}

export default ProductScreen