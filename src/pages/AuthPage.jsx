import { CustomBtn } from '../components/Buttons/FilledBtn';
import { useWalletConnector } from '../hooks/useWalletConnector';


//User authentication block 
/// authenticate user and push them to their dashboard
const AuthPage = () => {
    
    const {processing, connectionErr, connectWallet} = useWalletConnector();

    return(
        <section>
            <div className="auth-bg p-6 flex flex-col gap-2 items-center justify-center h-[60vh] rounded-[0.5rem] bg-[#181818] mb-2">
                <h1 className="text-4xl font-bold text-high text-center">Hi there, Flexer</h1>
                <h6 className="text-lg text-medium text-center mb-4">Login to access the console</h6>
                <div className='relative w-full' >
                    <CustomBtn title='login' process={processing}  className={` border-2 ${!processing ? 'bg-accent border-accent text-[#1D1D1D]' : 'bg-surface border-surface text-accent' } py-2 px-6 mx-auto`} onClick={connectWallet} />
                    {connectionErr && (<small className='capitalize w-full text-center p-2 text-medium absolute top-full'>{connectionErr}</small>) }
                </div>
                
            </div>
        </section>
    )
}

export default AuthPage