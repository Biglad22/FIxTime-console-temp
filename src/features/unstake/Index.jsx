import React, { useState } from 'react'
import { Unstake } from './Unstake'
import { UnstakeComplete } from './UnstakeComplete'

export const UnstakePrompt = ({className = '', close}) => {
  const [isComplete, setComplete] = useState(false);
  
  
    //SINCE PROMPT FOR SUCCESSFUL UNSTAKING AND PROCESSING UNSTAKING ARE DIFFERENT, CONDITIONAL RENDERING IS NECESSARY 
    return(
        <div>
            {
                !isComplete ? (<Unstake className={className}  close={close} />) : ( <UnstakeComplete className={className} close={close} />)
            }
        </div>
    )
}
