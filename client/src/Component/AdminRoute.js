import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function AdminRoute({children}) {
    const userSignIn = useSelector(state => state.userSignIn);
    const { userInfo } = userSignIn;
    return userInfo && userInfo.isAdmin ? children : <Navigate to='/signin'></Navigate>
}

export default AdminRoute;