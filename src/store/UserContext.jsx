import { useState, createContext, useRef, useMemo, useEffect, useCallback } from "react";
import { getUserDetails } from "../services/api";
import { handleBalancePadding } from "../utils/Helpers";
import { useWallet } from "@solana/wallet-adapter-react";

/////====================================== USER CONTEXT ==============================================

// Create context
export const userContext = createContext();

// Context provider
export const UseProvider = ({ children }) => {
    // Store user information
    const [user, setUser] = useState(null); // Stores user information from database
    const [refreshTime, setRefreshTime] = useState(60); // Tracks next refresh time
    const refreshInterval = useRef(null); // Stores next refresh timer
    const { connect, connected, publicKey } = useWallet(); // Access Solana wallet adapter
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [masterErr, setMasterErr] = useState(
        navigator.onLine ? null : "Please check internet connection"
    ); // Master error to store operation-related errors
    const [showWallets, setShowWallets] = useState(false); // Display or hide supported wallets list
    const wallet = useMemo(() => publicKey?.toString() || null, [publicKey]); // Stores user wallet address

    // Updates showWallets state
    const linkWallet = state => {
        if(state === showWallets) return; 
        setShowWallets(state)
    };

    // Formats and hides wallet address
    const hiddenAddress = useMemo(() => {
        if (!wallet || typeof wallet !== "string") return null;
        return `${wallet.slice(0, 4)}...${wallet.slice(-4)}`;
    }, [wallet]);

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

            // FIXME: Remove this hardcoded address later
            await fetchUser("4bkJKvLFh3FN5KV1pPZvwwRz3FZAppcUBKRo5Y9tnU8E"); // Fetch user data
            setMasterErr(null); // Reset master error
            
        } catch (error) {
            setMasterErr(error.message);
        }
    };

    // Fetch user information
    const fetchUser = async (params) => {
        try {
            if (!isOnline) throw new Error("Please check internet connection");
            if (!wallet && !params)
                throw new Error("Connect your Solana wallet");

            const address = params || wallet;
            const res = await getUserDetails(address);
            setUser(res.data.data);
            refreshTimer();
            setMasterErr(null);
        } catch (error) {
            setMasterErr(error.message);
        }
    };

    // Handle wallet reconnection
    const reconnectWallet = async () => {
        try {
            if (!isOnline) throw new Error("Please check internet connection");
            if (!connected)
                throw new Error("Reconnection failed, please connect wallet again");
            if (!publicKey)
                throw new Error("Public key is not available. Please connect your wallet.");

            // FIXME: Remove this hardcoded address later
            await fetchUser("4bkJKvLFh3FN5KV1pPZvwwRz3FZAppcUBKRo5Y9tnU8E"); // Fetch user data
            setMasterErr(null); // Reset master error
        } catch (error) {
            setMasterErr(error.message);
        }
    };

    // Memoize context value to avoid unnecessary re-renders
    const contextValue = useMemo(
        () => ({
            ...user,
            refreshTime,
            wallet,
            isOnline,
            hiddenAddress,
            paddedBalance,
            masterErr,
            showWallets,
            setMasterErr,
            fetchUser,
            connectNewWallet,
            reconnectWallet,
            linkWallet,
        }),
        [
            user,
            refreshTime,
            wallet,
            isOnline,
            hiddenAddress,
            paddedBalance,
            masterErr,
            showWallets
        ]
    );

    return (
        <userContext.Provider value={contextValue}>
            {children}
        </userContext.Provider>
    );
};
