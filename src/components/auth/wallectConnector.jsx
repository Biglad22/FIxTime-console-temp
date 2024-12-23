import React from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { CustomBtn } from '../Buttons/FilledBtn'
import { useContext } from 'react'
import { userContext } from '../../store/UserContext'
import { useNavigate } from 'react-router-dom'

/// WALLET SELECTOR
// DISPLAYS ALL SUPPORTED WALLETS

//selector button FOR EACH BUTTON
const Selector = ({className='', title, iconSrc, onClick}) =>{

    return(
        <button type="button" onClick={onClick} className={`${className} w-fit p-2 bg-surface rounded-[0.67rem] opacity-70 hover:opacity-100 transition-all duration-300 text-medium hover:text-high`}>
            <img src={iconSrc} alt={`${title} icon`} className='w-8 h-8 object-contain object-center block mx-auto' />
            <small className='block w-fit mx-auto mt-2 text-sm  capitalize'>{title}</small>
        </button>
    )
}

///MAIN SELECTOR
// DISPLAYS ALL THE SUPPORT WALLETS WALLET
const WalletConnector = ({className = ''}) => {
    const { wallets, select} = useWallet();
    const {setMasterErr, linkWallet, connectNewWallet} = useContext(userContext);
    

    const handleClick = async (address) => { //HANDLES SELECTION AND CONNECTION TO USERS' DESIRED WALLET
        
        try {
            
            const selectedWallet = wallets.find(wallet => wallet.adapter.name === address);
            
            if (!selectedWallet) {
                throw new Error('Selected wallet not found.');
            }
            
            if (selectedWallet.adapter.readyState !== 'Installed') {
                throw new Error(`Please install ${selectedWallet.adapter.name} to continue.`);
            }
            select(address);
            await connectNewWallet();

        } catch (error) {
            setMasterErr(error.message);
        }
        linkWallet(false);
    }


    return (
        <div className={`${className} p-4 rounded-[0.67rem] bg-[#2F2F2F] w-fit max-w-full`}>
            <CustomBtn icon="bx-x" className="text-4xl text-accent ml-auto" onClick={()=>linkWallet(false)} />
            <div className={`flex gap-2 flex-wrap items-center justify-center mt-2`}>
                { wallets.map(wallet=>(<Selector title={wallet.adapter.name} onClick={()=>handleClick(wallet.adapter.name)} key={wallet.adapter.name}
                iconSrc={wallet.adapter.icon}
                />))
                }
            </div>
        </div>
    )
}

export default React.memo(WalletConnector);
