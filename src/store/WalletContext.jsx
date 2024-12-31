import { useMemo } from 'react';
import { WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { SolanaMobileWalletAdapter } from '@solana-mobile/wallet-adapter-mobile';
import { clusterApiUrl } from '@solana/web3.js';

export const WalletContext = ({ children }) => {
    const endPoint = clusterApiUrl('devnet'); // Update to 'mainnet-beta' for production

    const wallets = useMemo(() => {
        try {
            const mobileWalletAdapter = new SolanaMobileWalletAdapter({
                appIdentity: {
                    name: 'FlexTime Console',
                    uri: 'https://fixtime-console-temp.netlify.app/',
                },
            });

            console.log('SolanaMobileWalletAdapter initialized:', mobileWalletAdapter);

            return [
                new PhantomWalletAdapter(),
                new SolflareWalletAdapter(),
                mobileWalletAdapter, // Include the mobile adapter
            ];
        } catch (error) {
            console.error('Error initializing SolanaMobileWalletAdapter:', error);
            return [
                new PhantomWalletAdapter(),
                new SolflareWalletAdapter(),
            ];
        }
    }, []);

    return (
        <ConnectionProvider endpoint={endPoint}>
            <WalletProvider wallets={wallets} autoConnect>
                {children}
            </WalletProvider>
        </ConnectionProvider>
    );
};
