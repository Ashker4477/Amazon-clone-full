import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { createProduct, deleteProduct, listProducts } from '../Action/ProductAction';
import LoadingBox from '../Component/LoadingBox';
import MessageBox from '../Component/MessageBox';
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from '../Constants/ProductConstants';

export default function ProductListScreen() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const productList = useSelector(state => state.productList);
    const { loading, error, products } = productList;

    const createdProduct = useSelector(state => state.createdProduct);
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: productCreate } = createdProduct;

    const productDelete = useSelector(state => state.productDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;

    useEffect(() => {
        if (productCreate && productCreate._id) {
            dispatch({ type: PRODUCT_CREATE_RESET });
            navigate(`/product/${productCreate._id}/edit`);
        }
        if (successDelete) {
            dispatch({
                type: PRODUCT_DELETE_RESET
            });
            dispatch(listProducts());
        }
    }, [productCreate, dispatch, navigate, successCreate, successDelete]);

    useEffect(() => {
        dispatch(listProducts());
    }, []);


    const deleteHandler = (productId) => {
        dispatch(deleteProduct(productId));
    }
    const createHandler = () => {
        dispatch(createProduct());
    }

    return (
        <div>
            <div className="row">
                <h1>Products</h1>
                <button type="button" className="primary" onClick={createHandler}>
                    Create Product
                </button>
            </div>
            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && <MessageBox variant={'danger'}>{errorDelete}</MessageBox>}
            {loadingCreate && <LoadingBox></LoadingBox>}
            {errorCreate && <MessageBox variant={'danger'}>{errorCreate}</MessageBox>}
            {
                loading ? <LoadingBox></LoadingBox>
                    :
                    error ? <MessageBox variant={'danger'}>{error}</MessageBox>
                        :
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Image</th>
                                    <th>NAME</th>
                                    <th>PRICE</th>
                                    <th>CATEGORY</th>
                                    <th>BRAND</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products && products.map((product) =>
                                        <tr key={product._id}>
                                            <td>{product._id}</td>
                                            <td><img className='small' src={product.image} alt={product.name} /></td>
                                            <td>{product.name}</td>
                                            <td>{product.price}</td>
                                            <td>{product.category}</td>
                                            <td>{product.brand}</td>
                                            <td>
                                                <button
                                                    type="button"
                                                    className="small"
                                                    onClick={() =>
                                                        navigate(`/product/${product._id}/edit`)
                                                    }
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    type="button"
                                                    className="small"
                                                    onClick={() => deleteHandler(product._id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
            }
        </div>
    )
}
