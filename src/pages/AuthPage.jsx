import { CustomBtn } from '../components/Buttons/FilledBtn';
import { useContext} from 'react';
import { userContext } from '../store/UserContext';
import WalletConnector from '../components/auth/wallectConnector'
import { useWallet } from '@solana/wallet-adapter-react';
import React  from 'react';
import { useConnectionHandler } from '../hooks/useConnectionHandler';

//User authentication block 
/// authenticate user and push them to their dashboard
const AuthPage = () => {
    const { publicKey, connected} = useWallet();
    const {masterErr, showWallets} = useContext(userContext);
    const {handleWalletConnection} = useConnectionHandler();

    // const isConnected = useMemo(()=> ((!isMobile && wallet && wallet.adapter.wwallet.adapter.wallet.accounts.length > 0) 
    // || (isMobile && '_authorizationResult' in wallets[0].adapter && wallets[0].adapter._authorizationResult)
    // || (publicKey || connected)),[connecting, connected, publicKey, wallet, wallets]);

    // const handleWalletConnector = async () => {
    //     if (connected || publicKey) {
    //         navigate('/dashboard');
    //     }
    //     else{
    //         if (isMobile) {
    //             let handleFocus;
    //             try {
    //                 console.log(wallets[0]);
    //                 select(wallets[0]);
    //                 console.log(wallets[0]);
    
    //                 // Create a Promise to handle the focus event
    //                 const waitForAuthorization = new Promise((resolve, reject) => {

    //                     handleFocus = () => {
    //                         // Check authorization status
    //                         if ('_authorizationResult' in wallets[0].adapter && wallets[0].adapter._authorizationResult) {
    //                             resolve(); // Authorization successful
    //                         } else {
    //                             reject(new Error("error, please refresh page and select a wallet to continue")); // Throw an error
    //                         }
    //                     };
    
    //                     // Attach the focus event listener
    //                     window.addEventListener('focus', handleFocus);
                        
    
    //                 });
    
    //                 // Wait for the wallet to connect or handle the focus error
    //                 if (!connected) {
    //                     await Promise.race([connectNewWallet(), waitForAuthorization]);
    //                 }
    
    //             } catch (error) {
    //                 // Clean up and handle the error
    //                 window.onfocus = null;
                    
    //                 setMasterErr(error.message);
    //                 console.error(error);
    //             }finally{
    //                 window.removeEventListener('focus', handleFocus);
    //             }
    //         } else {
    //             linkWallet(true);
    //         }
    //     }
    // };
    


    return(
        <section>
            <div className="auth-bg p-6 flex flex-col gap-2 items-center justify-center h-[60vh] rounded-[0.5rem] bg-[#181818] mb-2">
                <h1 className="text-4xl font-bold text-high text-center">Hi there, Flexer</h1>
                <h6 className="text-lg text-medium text-center mb-4">Login to access the console</h6>
                <div className='relative w-full' >
                    <CustomBtn title={(connected || publicKey)? 'login' : 'connect wallet'}  className={` border-2 bg-accent border-accent text-[#1D1D1D]  py-2 px-6 mx-auto`} 
                        onClick={handleWalletConnection} 
                    />
                    {masterErr && (<small className='capitalize w-full text-center p-2 text-medium absolute top-full'>{masterErr}</small>) }
                    
                </div>
            </div>

            {showWallets && (
                <div className="w-[100vw] h-[100vh] absolute top-0 left-0 z-[60] bg-[rgba(0,0,0,0.8)]">
                    <WalletConnector 
                    className="absolute z-50 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2" />
                </div>
            )}
        </section>
    )
}

export default React.memo(AuthPage)