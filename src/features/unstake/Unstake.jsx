import React, { useState } from 'react'
import { CustomBtn } from '../../components/Buttons/FilledBtn'
import { RequestProcessing } from '../requestProcessing/RequestProcessing';

export const Unstake = ({className='', amount=0, close}) => {

    const [isProcessing, setProcessing] = useState(false); //IS PROCESSING WHILE WAITING FOR USER TO SIGN WALLET MESSAGE

    const handleUnstaking = () =>{ 
        setProcessing(true);
    }

    return (
        <div className={`bg-[#2F2F2F] px-4 py-6 rounded-radius ${className} select-none`}>
            <div className="flex justify-between items-center w-full mb-2 ">
              <h6 className=" text-accent text-base font-semibold leading-none">Unstake</h6>
              <CustomBtn icon="bx-x" className="text-6xl text-accent" onClick={close} />
            </div>
            <p className="text-low text-sm mb-4">You have successfully locked.</p>

            <h6 
                className={`text-base leading-none p-4 font-bold rounded-sm bg-red-300 text-surface flex items-center gap-4 w-full ${isProcessing ? 'opacity-50' : 'opacity-100'}` }
            >
               <span>Unstake</span> 
               <span className='flex-1'>{amount + ' $FLXT'}</span>
            </h6>
        
            <CustomBtn title='unstake tokens' icon='bx-right-arrow-alt' right onClick={handleUnstaking} disabled={isProcessing}
              className="w-full bg-accent opacity-100 disabled:opacity-50 text-surface py-3 px-4 my-6 rounded-radius text-sm font-semibold"
            />
            
            {/* /// CONDITIONALLY RENDER PROCESSING MESSAGE */}
            {isProcessing && <RequestProcessing />} 

        </div>
    )
}
