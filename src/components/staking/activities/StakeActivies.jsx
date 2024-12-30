import React from 'react'
import StakeHistoryTable from './StakeHistoryTable'
import lockTimer from '../../../assets/icon/lock_clock.svg'

export const StakeActivies = ({className = '', activeState = 0}) => {
  return (
    <div className={`${className} rounded-radius border-4 border-[#262626] flex flex-col p-2 pe-1 sm:p-4 sm:pe-2`}>
        <div className='flex gap-2 items-center mb-4'>
          <img src={lockTimer} alt="stake history" className='w-6 h-auto'/>
          <h6 className='text-high text-md'>
            Active <span>{` (${activeState})`}</span>
          </h6>
        </div>
        {/*map all user staking history*/}
        <div className='flex-1 overflow-auto stake-overflow pe-1 sm:pe-2 space-y-2 sm:space-y-4 '>
            <StakeHistoryTable  amount={'10000'}
                                lockDuration={'1 month'}
                                earnedReward={0.0001}
                                dueDate={'12/12/2022'}
                                className="w-full"  
            />
            <StakeHistoryTable  amount={'10000'}
                                lockDuration={'1 month'}
                                earnedReward={0.0001}
                                dueDate={'12/12/2022'}
                                className="w-full"  
            />
            <StakeHistoryTable  amount={'10000'}
                                lockDuration={'1 month'}
                                earnedReward={0.0001}
                                dueDate={'12/12/2022'}
                                className="w-full"  
            />
            <StakeHistoryTable  amount={'10000'}
                                lockDuration={'1 month'}
                                earnedReward={0.0001}
                                dueDate={'12/12/2022'}
                                className="w-full"  
            />
            <StakeHistoryTable  amount={'10000'}
                                lockDuration={'1 month'}
                                earnedReward={0.0001}
                                dueDate={'12/12/2022'}
                                className="w-full"  
            />
        </div>
    </div>
  )
}
