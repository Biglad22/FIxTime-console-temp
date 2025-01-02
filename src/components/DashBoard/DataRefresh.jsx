import { useContext, useState} from "react";
import { userContext } from "../../store/UserContext";
import { useNavigate } from "react-router-dom";
import { useWallet } from "@solana/wallet-adapter-react";
import { throttle } from "../../utils/Helpers";

/// REFRESH BUTTON FOR REFRESHING DASHBOARD INFORMATION
function Refresh() {
    const { refreshTime, reconnectWallet, setMasterErr } = useContext(userContext);
    const navigate = useNavigate();
    const { connected, publicKey, wallet,disconnect } = useWallet();
    const [isRefreshing, setIsRefreshing] = useState(false);

    
    const handleRefresh =  throttle( async() => { //FUNCTION THAT HANDLE USER INFORMATION REFRESH
        try {
            setIsRefreshing(true);

            /// CHECK IF ANY WALLET IS STILL CONNECTED BEFORE FETCHING DATA
            console.log(wallet);
            
            if (!connected || !wallet || wallet.adapter.wallet.accounts.length < 1) {
                await disconnect(); //SINCE CONNECTED AND WALLET MAY NOT HAVE BEEN CHANGED, DISCONNECTING IS FIRST REQUIRED
                throw new Error("Please reconnect your wallet");
            }
    
            // Check if the publicKey is null or undefined
            if (!publicKey) {
                throw new Error("Public key is not available. Please reconnect your wallet.");
            }
    
            // Continue with the refresh process
            await reconnectWallet(publicKey.toString());
    
        } catch (error) {

            console.error(error);
            setMasterErr(error.message); // TO ENABLE USER KNOW REASON FOR REDIRECT
            navigate('/'); /// NAVIGATE BACK TO AUTH PAGE 

        }finally{
            setIsRefreshing(false);
        }
    }, 5000);
    

    return (
        <button
            className="text-sm p-2 border-none disabled:text-medium text-high w-fit"
            onClick={handleRefresh}
            disabled={refreshTime < 60}
        >
            <i className={`bx bx-revision ${isRefreshing? 'animate-spin' : ''}`}></i>
            <span className="ml-1">
                Refresh {refreshTime < 60 ? `in ${refreshTime}` : 'now'}
            </span>
        </button>
    );
}

export default Refresh;
