import {useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import { userContext } from '../store/UserContext';


/// handle wallet connection for mobile and desktop
//for mobile it automatically connects to the first wallet in the list
//for desktop it prompts the user to select a wallet
export const useConnectionHandler = () => {
    const { connected, publicKey, wallets, select, connect: connectNewWallet } = useWallet();
    const {setMasterErr, isMobile, linkWallet} = useContext(userContext)
    const navigate = useNavigate();


    const handleWalletConnection = async () => {
        if (connected || publicKey) {
            navigate('/dashboard');
        } else {
            if (isMobile) {
                let handleFocus;
                try {
                    console.log(wallets[0]);
                    select(wallets[0]);
                    console.log(wallets[0]);
                    const waitForAuthorization = new Promise((resolve, reject) => {
                        handleFocus = () => {
                            if ('_authorizationResult' in wallets[0].adapter && wallets[0].adapter._authorizationResult) {
                                resolve();
                            } else {
                                reject(new Error("error, please refresh page and select a wallet to continue"));
                            }
                        };
                        window.addEventListener('focus', handleFocus);
                    });
                    if (!connected) {
                        await Promise.race([connectNewWallet(), waitForAuthorization]);
                    }
                } catch (error) {
                    window.onfocus = null;
                    setMasterErr(error.message);
                    console.error(error);
                } finally {
                    window.removeEventListener('focus', handleFocus);
                }
            } else {
                linkWallet(true);
            }
        }
    };

    return {handleWalletConnection};
};
