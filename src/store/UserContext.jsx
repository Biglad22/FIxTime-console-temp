import { useState, createContext, useRef, useMemo, useEffect, useCallback } from "react";
import { getUserDetails } from "../services/api";
import { handleBalancePadding } from "../utils/Helpers";
import { useWallet } from "@solana/wallet-adapter-react";
import { Await } from "react-router-dom";

/////====================================== USER CONTEXT ==============================================

// Create context
export const userContext = createContext();

// Context provider
export const UseProvider = ({ children }) => {
    // Store user information
    const [user, setUser] = useState(null); // Stores user information from database
    const [refreshTime, setRefreshTime] = useState(60); // Tracks next refresh time
    const refreshInterval = useRef(null); // Stores next refresh timer
    const { connect, publicKey } = useWallet(); // Access Solana wallet adapter
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [masterErr, setMasterErr] = useState( navigator.onLine ? null : "Please check internet connection"); // Master error to store operation-related errors
    const [showWallets, setShowWallets] = useState(false); // Display or hide supported wallets list
    const userWallet = useMemo(() => publicKey?.toString() || null, [publicKey]); // Stores user wallet address

    // ========================== CLAIMS, STAKING AND UNSTAKING PROMPT DISPLAY HANDLERS
    ///opens prompt for user to claim their tokens
    const [isClaiming, setIsClaiming] = useState(false); //isClaiming conditionally renders token claim prompt
    const [isStaking, setIsStaking] = useState(false); //isStaking conditionally renders token staking prompt
    const [isUnstaking, setIsUnstaking] = useState(false); //isUnstaking conditionally renders token unStaking prompt


    // Updates showWallets state
    const linkWallet = state => {
        if(state === showWallets) return; 
        setShowWallets(state)
    };

    // Formats and hides wallet address
    const hiddenAddress = useMemo(() => {
        if (!userWallet || typeof userWallet !== "string") return null;
        return `${userWallet.slice(0, 4)}...${userWallet.slice(-4)}`;
    }, [userWallet]);

    // Pad total available tokens with K (thousand), M (million), B (billion)
    const paddedBalance = useMemo(() => {
        if (user) return handleBalancePadding(user.total_reward);
        else return handleBalancePadding(0);
    }, [user]);

    // ========================== Effects
    // Monitor online/offline status
    useEffect(() => {
        const handleOnline = () => {
            const online = navigator.onLine;
            setIsOnline(online);
            setMasterErr(online ? null : "Please check internet connection");
        };

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOnline);

        // Initial check
        handleOnline();

        // Cleanup event listeners on component unmount
        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOnline);
        };

    }, []);

    // Data fetch timer to keep track of time left till the next refresh
    const refreshTimer = () => {
        if (refreshInterval.current) clearInterval(refreshInterval.current); // Clear existing timer if running

        refreshInterval.current = setInterval(() => {
            setRefreshTime((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(refreshInterval.current);
                    return 60;
                } else return prevTime - 1; // Decrement the value
            });
        }, 1000);
    };

    // Wallet connection
    const connectNewWallet = async () => {
        try {
            if (!isOnline) throw new Error("Please check internet connection");

            await connect();
            const userWallet = publicKey.toString();
            // FIXME: Remove this hardcoded address later
            await fetchUser(userWallet); // Fetch user data
            setMasterErr(null); // Reset master error
            
        } catch (error) {
            setMasterErr(error.message);
        }
    };

    // Fetch user information
    const fetchUser = async (params) => {
        try {
            if (!isOnline) throw new Error("Please check internet connection");
            if (!params) throw new Error("Connect your Solana wallet");
            
            const res = await getUserDetails(params);
            setUser(res.data.data);

            refreshTimer(); //restart refresh timer
            setMasterErr(null); //clear error message

        } catch (error) {throw new Error(error.message)}
    };

    // Handle wallet reconnection
    const reconnectWallet = async (paramWallet) => {
        try {

            if (!isOnline) throw new Error("Please check internet connection");
            await fetchUser(paramWallet); // Fetch user data
            setMasterErr(null); // Reset master error

        } catch (error) {
            setMasterErr(error.message);
            // throw new Error(error.message);
        }
    };



    // Memoize context value to avoid unnecessary re-renders
    const contextValue = useMemo(
        () => ({
            ...user,
            refreshTime,
            userWallet,
            isOnline,
            hiddenAddress,
            paddedBalance,
            masterErr,
            showWallets,
            isClaiming, setIsClaiming,
            isStaking, setIsStaking,
            isUnstaking, setIsUnstaking,
            setMasterErr,
            fetchUser,
            connectNewWallet,
            reconnectWallet,
            linkWallet,
        }),
        [
            user,
            refreshTime,
            userWallet,
            isOnline,
            hiddenAddress,
            paddedBalance,
            masterErr,
            showWallets,
            isClaiming, isUnstaking, isStaking
        ]
    );

    return (
        <userContext.Provider value={contextValue}>
            {children}
        </userContext.Provider>
    );
};