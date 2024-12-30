import React, { useState } from 'react'
import StakeFLXT from './AddStakePrompt';
import { StakeComplete } from './StakeComplete';

export const StakePrompt = ({className = '', close}) => {
  const [isComplete, setComplete] = useState(false);
  
    
  
    //SINCE PROMPT FOR SUCCESSFUL CLAIM AND PROCESSING CLAIM ARE DIFFERENT, CONDITIONAL RENDERING IS NECESSARY 
    return(
        <div>
            {
                !isComplete ? (<StakeFLXT className={className}  close={close} />) : ( <StakeComplete className={className} close={close} />)
            }
        </div>
    )
}
