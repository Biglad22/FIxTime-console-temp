//CONTEXT PROVIDER FOR SOLANA WALLET FUNCTIONS AND STATES 
import { useMemo } from 'react';
import { WalletProvider, ConnectionProvider} from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';

export const WalletContext = ({children}) =>{

    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter(),
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
