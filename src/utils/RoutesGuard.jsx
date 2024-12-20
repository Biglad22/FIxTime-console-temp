import React from 'react'
import { Navigate } from 'react-router-dom'

export const RoutesGuard = ({children}) => {
    const connectedWallet = localStorage.getItem("connectedWallet");

    if (!connectedWallet) return(<Navigate to='/' />)

    return children
}
