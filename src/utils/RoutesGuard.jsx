import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { useWallet } from '@solana/wallet-adapter-react';
import { userContext } from '../store/UserContext';

/// PROTECTS DASHBOARD ROUTE FROM UNAUTHORIZED USERS (USERS WHO HAVE NOT CONNECTED THEIR WALLETS);
export const RoutesGuard = ({children}) => {
    const {wallet} = useWallet(); //ACCESS WALLET FUNCTIONS
    const {isOnline} = useContext(userContext);

    if ( !isOnline || !wallet){ //IF NO VALID WALLET IS FOUND REDIRECT TO AUTH PAGE  
        return(<Navigate to='/' />)
    }

    return children // OR CONTINUE TO DASHBOARD
}
