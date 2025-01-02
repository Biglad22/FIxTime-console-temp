//CONTEXT PROVIDER FOR SOLANA WALLET FUNCTIONS AND STATES 
import { WalletProvider, ConnectionProvider} from '@solana/wallet-adapter-react';
import { clusterApiUrl } from '@solana/web3.js';
import { useMemo } from 'react';

export const WalletContext = ({children}) =>{

    const wallets = useMemo(()=>[]);

    const endPoint = clusterApiUrl("devnet");

    return (
        <ConnectionProvider endpoint={endPoint}>
            <WalletProvider wallets={wallets} autoConnect >
                {children}
            </WalletProvider>
        </ConnectionProvider>
    )
}
