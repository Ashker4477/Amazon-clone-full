import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PrivateRoute({children}) {
    const userSignIn = useSelector(state => state.userSignIn);
    const { userInfo } = userSignIn;
    return userInfo ? children : <Navigate to='/signin'></Navigate>
}

export default PrivateRoute