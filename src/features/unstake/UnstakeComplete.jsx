import React from 'react'
import { CustomBtn } from '../../components/Buttons/FilledBtn'

//TO BE RENDERED WHEN UNSTAKING IS SUCCESSFUL

export const UnstakeComplete = ({className ='', amount=0, close}) => {
  return (
    <div className={`bg-[#2F2F2F] px-4 py-6 rounded-radius ${className} select-none`}>
        <h6 className=" text-accent text-base font-semibold leading-none mb-2">unstake</h6>
        <p className="text-low mb-4">You have successfully unlocked.</p>
        <h3 className="text-xl text-high text-center font-medium">{amount} $FLXT</h3>
        <p className='text-sm text-medium font-normal text-center'> Unstake complete!
        <br /> Your tokens should arrive in your wallet shortly.
        </p>
        <CustomBtn title='Close' onClick={close}
          className="w-full bg-accent opacity-100 text-surface py-3 px-4 my-6 rounded-radius font-semibold text-sm"
        />
        
    </div>
  )
}
