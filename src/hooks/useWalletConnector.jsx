import React from 'react'
import { useContext, useState } from 'react';
import { userContext } from '../store/UserContext';
import { useNavigate } from 'react-router-dom';
import { throttle } from '../utils/Helpers';

export const useWalletConnector = () => {
    const {connectNewWallet} = useContext(userContext);
    const [connectionErr, setConnectionErr] = useState(null);
    const [processing, setProcess] = useState(false); 
    const navigate = useNavigate(); //// router navigator
    
    const connectWallet = throttle ( async() =>{
        try {

            setProcess(true);
            await connectNewWallet();

            navigate('/dashboard')

        } catch (error){

            console.log(error);
            setConnectionErr(error.message);

        }finally{
            setProcess(false); 
        }
    }, 5000);

  return { connectionErr, processing, connectWallet}
}
