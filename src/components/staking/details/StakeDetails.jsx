import React from 'react'
import DetailsTable from "./DetailsTable";
import Divider from '../../dividers/Divider';
import { CustomBtn } from '../../Buttons/FilledBtn';
import { Psychiatry } from '../../../assets/icon/Psychiatry.jsx';

export const StakeDetails = ({className=''}) => {
  return (
    <div className={`rounded-radius bg-card p-4 pb-6 ${className}`}>
        <div className='font-bold text-high flex items-center gap-2  mb-4'>
            <Psychiatry />
            <h3 className='text-xl font-bold'>
                Staking Details
            </h3>
        </div>
        <DetailsTable
            totalStaked='100020000'
            totalReward ='1262.07'
        />
        <Divider className='w-1/2 mx-auto my-6' />
        <div className='rounded-sm bg-accent text-surface flex items-center justify-between px-4 py-3 w-full'>
            <p  className='flex-1'>Claimable Now</p>
            <p  className='flex-1'>{/*claimableTotal goes here*/}</p>
        </div>
        <CustomBtn title='claim Rewards' className='bg-accent text-surface w-full px-4 py-2 mt-4' right 
            icon='bx-right-arrow-alt' onClick={() => console.log('Unstake')}
        />
    </div>
  )
}
