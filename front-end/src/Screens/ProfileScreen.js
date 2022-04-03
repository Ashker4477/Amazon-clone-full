import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../Action/UserAction';
import LoadingBox from '../Component/LoadingBox';
import MessageBox from '../Component/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../Constants/UserConstants';

function ProfileScreen() {
    const dispatch = useDispatch();
    const userSignIn = useSelector(state => state.userSignIn);
    const { userInfo } = userSignIn;

    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;

    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdateProfile;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        if (!user && !loading) {
            dispatch({ type: USER_UPDATE_PROFILE_RESET });
            dispatch(detailsUser(userInfo._id));
        } else {
            setName(user.name);
            setEmail(user.email);
        }
    }, [user, userInfo._id]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (confirmPassword !== password) {
            alert('Password and confirm password are not match');
        } else {
            dispatch(updateUserProfile({ userId: user._id, name, email, password }));
        }
    }

    return (
        <div>
            <form className='form' onSubmit={submitHandler} autoComplete='off'>
                <div>
                    <h1>User Profile</h1>
                    {loadingUpdate && <LoadingBox></LoadingBox>}
                    {errorUpdate && (
                        <MessageBox variant="danger">{errorUpdate}</MessageBox>
                    )}
                    {successUpdate && (
                        <MessageBox variant="success">
                            Profile Updated Successfully
                        </MessageBox>
                    )}
                </div>
                {
                    loading ? <LoadingBox></LoadingBox>
                        :
                        error && <MessageBox variant={'danger'}>{error}</MessageBox>
                }
                <>
                    <div>
                        <label htmlFor='name'>Name</label>
                        <input type={'text'} id={'name'} name={'name'} value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='Enter Name' ></input>
                    </div>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input type={'email'} id={'email'} name={'email'} value={email}
                            onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email' ></input>
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input type={'password'} id={'password'} name={'password'} value={password}
                            onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' ></input>
                    </div>
                    <div>
                        <label htmlFor='name'>Conirm Password</label>
                        <input type={'password'} id={'conirmPassword'} name={'conirmPassword'} value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Enter Conirm Password' ></input>
                    </div>
                    <div>
                        <label />
                        <button type='submit' className='primary block'>Update</button>
                    </div>
                </>
            </form>
        </div>
    )
}

export default ProfileScreen