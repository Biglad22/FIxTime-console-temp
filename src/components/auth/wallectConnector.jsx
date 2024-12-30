import React, { useContext } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { CustomBtn } from '../Buttons/FilledBtn';
import { userContext } from '../../store/UserContext';


// Wallet Selector Button
const Selector = ({ className = '', title, iconSrc, onClick }) => (
    <button
        type="button"
        onClick={onClick}
        className={`${className} w-fit p-2 bg-surface rounded-[0.67rem] opacity-70 hover:opacity-100 transition-all duration-300 text-medium hover:text-high`}
    >
        <img src={iconSrc} alt={`${title} icon`} className="w-8 h-8 object-contain object-center block mx-auto" />
        <small className="block w-fit mx-auto mt-2 text-sm capitalize">{title}</small>
    </button>
);

// Main Wallet Connector
const WalletConnector = ({ className = '' }) => {
    const { wallets, select, publicKey, connected } = useWallet();
    const { setMasterErr, linkWallet, connectNewWallet, isMobile } = useContext(userContext);

    const handleClick = async (address) => {
        try {
            const selectedWallet = wallets.find((wallet) => wallet.adapter.name === address);

            if (!selectedWallet) {
                throw new Error('Selected wallet not found.');
            }

            if (!isMobile && selectedWallet.adapter.readyState !== 'Installed') {
                throw new Error(`Please install ${selectedWallet.adapter.name} to continue.`);
            }

            // Select the wallet
            select(address);

            // Wait for the connection to establish
            if (!connected) {
                await connectNewWallet();
            }

            console.log('Connected wallet public key:', publicKey?.toString());
        } catch (error) {
            setMasterErr(error.message);
        } finally {
            linkWallet(false);
        }
    };

    return (
        <div className={`${className} p-4 rounded-[0.67rem] bg-[#2F2F2F] w-fit max-w-full`}>
            <CustomBtn icon="bx-x" className="text-4xl text-accent ml-auto" onClick={() => linkWallet(false)} />
            <div className="flex gap-2 flex-wrap items-center justify-center mt-2">
                {wallets.map((wallet) => (
                    <Selector
                        title={wallet.adapter.name}
                        onClick={() => handleClick(wallet.adapter.name)}
                        key={wallet.adapter.name}
                        iconSrc={wallet.adapter.icon}
                    />
                ))}
            </div>
        </div>
    );
};

export default React.memo(WalletConnector);
