import {useState, createContext, useRef, useMemo } from "react";
import { getUserDetails } from "../services/api";
import { connectWallet, checkConnection, disconnectWallet } from "../services/solanaWallet";
import { handleBalancePadding } from "../utils/Helpers";

/////====================================== USER CONTEXT ==============================================

// create context
export const userContext = createContext();

// context provider 
export const UseProvider = ({children}) =>{

    //store user information
    const [wallet, setWallet] = useState(null);
    const [user, setUser] = useState(null);
    const [refreshTime, setRefreshTime] = useState(60);
    const refreshInterval = useRef(null);

    /// formats wallet address 
    const hiddenAddress = useMemo(() => {
        if (!wallet || typeof wallet !== 'string') return null;
        return `${wallet.slice(0, 4)}...${wallet.slice(-4)}`;
    }, [wallet]);

    const paddedBalance = useMemo(()=>{

        if(user) return handleBalancePadding(user.total_reward);
        else return handleBalancePadding(0);

    }, [user])


    /// ============================= ACTIONS
    /// ============= DATA FETCH TIMER 
    const refreshTimer = () =>{
        if(refreshInterval.current) clearInterval(refreshInterval.current);

        refreshInterval.current = setInterval(()=>{
            setRefreshTime(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(refreshInterval.current);
                    return 60;

                } else return prevTime - 1; // Decrement the value
            });

        }, 1000);
    }

    /// =============== wallet connection 
    const connectNewWallet = async () =>{
        try {
            const userWallet = await connectWallet();
            setWallet(userWallet); //stores user wallet address

            await fetchUser("4bkJKvLFh3FN5KV1pPZvwwRz3FZAppcUBKRo5Y9tnU8E"); //fetch user data

        } catch (error){throw new Error(error)}
    }


    //=========== fetch user information
    const fetchUser = async (params) => { /// stores time remaining till next accepted refresh time
        try {

            if(!wallet && !params) throw new Error('connect your solana wallet');

            let res;
            if(params) res = await getUserDetails(params);
            else await getUserDetails(wallet);

            setUser(res.data.data);
            refreshTimer();

        } catch (error) {throw new Error(error)}

    }

    //================== HANDLE WALLET RECONNECTION 
    const reconnectWallet = async () => { //handle reconnection of existing wallet
        try {
            const userWallet = await checkConnection(); ///gets and reconnects userWallet
            setWallet(userWallet);

            await fetchUser("4bkJKvLFh3FN5KV1pPZvwwRz3FZAppcUBKRo5Y9tnU8E"); //fetch user data

        } catch (error) {throw new Error(error)}
    }




    
    return(
        <userContext.Provider value={{...user, refreshTime, wallet, hiddenAddress, paddedBalance, fetchUser, connectNewWallet, reconnectWallet}}>
            {children}
        </userContext.Provider>
    )
}
