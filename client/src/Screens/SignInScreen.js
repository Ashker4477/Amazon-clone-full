import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { signin } from '../Action/UserAction';
import LoadingBox from '../Component/LoadingBox';
import MessageBox from '../Component/MessageBox';

function SignInScreen() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';

    const userSignIn = useSelector((state) => state.userSignIn);
    const { userInfo, loading, error } = userSignIn;

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [redirect, userInfo, navigate])

    function onHandleChange(e) {
        let name = e.target.name;
        let value = e.target.value;
        if (name === 'email') setEmail(value);
        else if (name === 'password') setPassword(value);
    }

    function submitHandler(e) {
        e.preventDefault();
        if (!email || !password) return;
        dispatch(signin(email, password))
    }

    return (
        <div className=''>
            <form className='form' onSubmit={submitHandler}>
                <div>
                    <h1>Sign In</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant={'danger'}>{error}</MessageBox>}
                <div>
                    <label>Email Address:</label>
                    <input type={'email'} name='email' value={email} onChange={onHandleChange}></input>
                </div>
                <div>
                    <label>Password:</label>
                    <input type={'password'} name='password' value={password} onChange={onHandleChange}></input>
                </div>
                <div>
                    <label />
                    <button className='primary block' type='submit'>Sign In</button>
                </div>
                <div>
                    <label />
                    <div>
                        New Customer ? <Link to={`/register?redirect=${redirect}`}>Create Your Account</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SignInScreen