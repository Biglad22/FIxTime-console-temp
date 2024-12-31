import { CustomBtn } from '../components/Buttons/FilledBtn';
import { useContext} from 'react';
import { userContext } from '../store/UserContext';
import WalletConnector from '../components/auth/wallectConnector'
import { useWallet } from '@solana/wallet-adapter-react';
import React  from 'react';
import { useNavigate } from 'react-router-dom';

//User authentication block 
/// authenticate user and push them to their dashboard
const AuthPage = () => {
    const {wallets, select, publicKey, connected} = useWallet();
    const {masterErr, linkWallet, showWallets, isMobile, setMasterErr, connectNewWallet} = useContext(userContext);
    const navigate = useNavigate();

    const handleWalletConnector = async()=>{
        if(publicKey) navigate('/dashboard');
        else{
            if(isMobile){
                try {

                    // Select the wallet
                    select(wallets[0]);
        
                    // Wait for the connection to establish
                    if (!connected) await connectNewWallet();
                } catch (error) {
                    setMasterErr(error.message);
                }
            }else linkWallet(true);
        } 
            
    }
    return(
        <section>
            <div className="auth-bg p-6 flex flex-col gap-2 items-center justify-center h-[60vh] rounded-[0.5rem] bg-[#181818] mb-2">
                <h1 className="text-4xl font-bold text-high text-center">Hi there, Flexer</h1>
                <h6 className="text-lg text-medium text-center mb-4">Login to access the console</h6>
                <div className='relative w-full' >
                    <CustomBtn title={publicKey ? 'login' : 'connect wallet'}  className={` border-2 bg-accent border-accent text-[#1D1D1D]  py-2 px-6 mx-auto`} 
                        onClick={handleWalletConnector} 
                    />
                    {/* <small>
                        {wallet?.adapter?.wallet?.accounts} 
                    </small>
                    <small>
                        {wallet} 
                    </small> */}
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