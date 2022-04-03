import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { register } from '../Action/UserAction';
import LoadingBox from '../Component/LoadingBox';
import MessageBox from '../Component/MessageBox';

function RegisterScreen() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confmPassword, setConfmPassword] = useState('');

    const userRegister = useSelector((state) => state.userRegister);
    const { userInfo, loading, error } = userRegister;


    function onHandleChange(e) {
        let name = e.target.name;
        let value = e.target.value;
        if (name === "name") setName(value);
        else if (name === "email") setEmail(value);
        else if (name === "password") setPassword(value);
        else if (name === "confmPassword") setConfmPassword(value);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confmPassword) {
            alert('Password and confirm password are not match');
        } else {
            dispatch(register(name, email, password));
        }
    };

    useEffect(() => {
        console.log(redirect);
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    return (
        <div>
            <form className='form' onSubmit={submitHandler}>
                <div>
                    <h1>Create Account</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant={'danger'}>{error}</MessageBox>}
                <div>
                    <label>Name</label>
                    <input type={'text'} name="name" value={name} onChange={onHandleChange} />
                </div>
                <div>
                    <label>Email</label>
                    <input type={'email'} name="email" value={email} onChange={onHandleChange} />
                </div>
                <div>
                    <label>Password</label>
                    <input type={'password'} name="password" value={password} onChange={onHandleChange} />
                </div>
                <div>
                    <label>Conform Password</label>
                    <input type={'password'} name="confmPassword" value={confmPassword} onChange={onHandleChange} />
                </div>
                <div>
                    <label />
                    <button className='primary block' type='submit'>Register</button>
                </div>
                <div>
                    <label />
                    <div>
                        Already have an Account ? <Link to={`/signin?redirect=${redirect}`}>Signin</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default RegisterScreen