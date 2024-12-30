import React from 'react'
import { CustomBtn } from '../../components/Buttons/FilledBtn'


export const StakeComplete = ({className ='', amount=0, duration='0 months', close}) => {
  return (
    <div className={`bg-[#2F2F2F] px-4 py-6 rounded-radius ${className} select-none`}>
        <h6 className=" text-accent text-base font-semibold leading-none mb-2">Stake $FLXT</h6>
        <p className="text-low mb-4 text-sm">You have successfully locked.</p>
        <h2 className="text-xl my-6 text-high text-center font-medium flex items-center justify-center">
          <span>{amount} $FLXT</span>
          <i className='bx bxs-check-circle text-green-600 ml-1.5' aria-label="success"></i>
        </h2>
        <p className='text-sm text-medium font-normal text-center my-4'> $FLXT staked! 🎉
        <br /> {'Your tokens are now staked for ' + duration}.
        </p>
        <CustomBtn title='Close' onClick={close}
          className="w-full bg-accent opacity-100 text-surface text-sm py-3 px-4 my-6 rounded-radius font-bold"
        />
        
    </div>
  )
}
