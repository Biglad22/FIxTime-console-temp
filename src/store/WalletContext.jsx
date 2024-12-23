//CONTEXT PROVIDER FOR SOLANA WALLET FUNCTIONS AND STATES 
import { useMemo } from 'react';
import { WalletProvider} from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
// import { clusterApiUrl } from '@solana/web3.js';


export const WalletContext = ({children}) =>{

    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter(),
        ],
        [] // Ensure wallets are memoized to avoid unnecessary re-creation
    );

    // const endPoint = clusterApiUrl("devnet");

    return (
        <WalletProvider wallets={wallets} autoConnect >
            {children}
        </WalletProvider>
    )
}
