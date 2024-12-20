//===== REWARD CLAIM PROMPTS
import { CustomBtn } from "../Buttons/FilledBtn";
import {userContext} from "../../store/UserContext";
import { useCallback, useContext, useState } from "react";
import spinnerSrc from "../../assets/img/spinner.png"


// balance is the amount to be claimed
export function RewardClaimPrompt({className='', balance = 0, onCloseClaim}) {
    const [isComplete, setComplete] = useState(false)

    // closes the claim prompt
    const closePrompt = () => onCloseClaim();

    return(
        <div>
            {
                !isComplete ? (<ProcessRewardClaim className={className} balance={balance} closePrompt={closePrompt} />) : ( <ClaimSuccessful className={className} closePrompt={closePrompt} />)
            }
        </div>
    )
}


//===== REWARD CLAIM PROMPTS
export function ProcessRewardClaim({className='', closePrompt}) {

    const {total_reward} = useContext(userContext);
    const [isStarted, setIsStarted] = useState(false);

    const startClaim = useCallback(()=>{
        setIsStarted(true);
    },[])

    return(
        <div className={`${className} p-4 rounded-[0.67rem] bg-[#2F2F2F]`}>
            <div className="flex justify-between items-center w-full ">
                <h6 className="text-sm text-accent text-left ">Claim $FLXT Rewards</h6>
                <CustomBtn icon="bx-x" className="text-4xl text-accent" onClick={closePrompt} />
            </div>
            <small className="block text-[#646871] text-left mb-4">You are about to claim your rewards.</small>
            <h2 className="font-bold text-xl text-center text-high">{total_reward} $FLXT</h2>
            <p className="text-medium text-center text-sm block mt-2 mb-4">Available Rewards</p>
            <CustomBtn onClick={startClaim} className="bg-accent text-[#1D1D1D] py-2 px-6 w-full" title='Proceed with claim ' icon="bx-right-arrow-alt" right />
            
            {/* process is loading */}
            {/* should be displayed only when waiting for claim process */}
            {isStarted && <ClaimProcessing className="mt-4"/>}
        </div>
    )
}

//CLAIM PROCESSING PROMPT
export function ClaimProcessing({className=''}) {
    return(
        <div className={`${className} px-2 w-full`}> 
            <img src={spinnerSrc} alt="sign request" loading="lazy"
                className="w-[1.5rem] h-auto mx-auto animate-spin mb-2"
            />
            <h3 className="text-lg text-high text-center font-medium">Sign the message on your wallet to continue.</h3>
        </div>
    )
} 

/// SUCCESSFUL CLAIM
// component should be displayed only after claim was successful
// this take the total amount user has claimed
export function ClaimSuccessful({className='', closePrompt}) {
    const {total_reward} = useContext(userContext);

    return(
        <div className={`${className} p-4 rounded-[0.67rem] bg-[#2F2F2F]`}>
            <h6 className="text-sm text-accent text-left block">Claim $FLXT Rewards</h6>
            <small className="block text-[#646871] text-left mb-4">You are about to claim your rewards.</small>
            <h3 className="font-bold text-lg text-center text-high">{total_reward} $FLXT</h3>
            <p className="text-medium text-sm  text-center block my-2">Claim complete 🎉</p>
            <p className="text-medium text-sm text-center block mb-4">Your tokens should arrive in your wallet shortly.</p>
            {/* close or share claim */}
            <CustomBtn className="bg-accent border-2 border-accent text-[#1D1D1D] py-2 px-6 w-full mb-2" title='close' onClick={closePrompt} />
            <CustomBtn className="text-accent border-2 border-accent py-2 px-6 w-full" title='share on X' icon="bx-right-arrow-alt" right 
                href={`https://twitter.com/intent/tweet?text=Flexing%20my%20rewards!%20I%20just%20claimed%20${total_reward}%20FLXT%20as%20a%20flexer%20on%20%40flxtime1.%20Join%20now%20and%20make%20time%20more%20rewarding.`}
            />
        </div>
    )
}
