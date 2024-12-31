//CONTEXT PROVIDER FOR SOLANA WALLET FUNCTIONS AND STATES 
import { useMemo } from 'react';
import { WalletProvider, ConnectionProvider} from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
// import { SolanaMobileWalletAdapter } from '@solana-mobile/wallet-adapter-mobile';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';

export const WalletContext = ({children}) =>{

    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter(),
            // new SolanaMobileWalletAdapter({
            //     appIdentity:{
            //         name : 'FlexTime console',
            //         uri : 'https://fixtime-console-temp.netlify.app/',
            //         icon : 'https://fixtime-console-temp.netlify.app/assets/img/Logo.png'
            //     },
            //     cluster: "https://api.devnet.solana.com"
            // }), // Add the Mobile Wallet Adapter
        ],
        [] // Ensure wallets are memoized to avoid unnecessary re-creation
    );

    const endPoint = clusterApiUrl("devnet");

    return (
        <ConnectionProvider endpoint={endPoint}>
            <WalletProvider wallets={wallets} autoConnect >
                <WalletModalProvider>
                    {children}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    )
}
