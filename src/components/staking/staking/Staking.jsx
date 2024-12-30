import React, {useContext} from 'react'
import { CustomBtn } from '../../Buttons/FilledBtn'
import { userContext } from '../../../store/UserContext';


export const Staking = ({className=''}) => {
    const {setIsStaking} = useContext(userContext);

    return (
        <div className={className + ' rounded-radius bg-card p-4 pb-6 text-high'}>
            <div className='rounded-radius bg-[#171717] px-4 py-10 mb-6'>
                <img src="/img/staking.png" alt="stake some tokens to get rewards" 
                    className='w-auto h-full mx-auto'
                />
            </div>
            <div>
                <h3 className='text-xl font-bold '>
                    Staking
                </h3>
            </div>
            <h6 className='mb-4 text-sm'>
                staking your time and grow your $FLXT.
            </h6>
        
            <CustomBtn title='Stake $FLXT' icon='bx-right-arrow-alt' right 
                className='border-2 border-high text-high py-2 px-4 mb-6'
                onClick={()=>{setIsStaking(true)}}
            />

            <p className='text-medium w-2/3'>
                Know more about staking in the 
                <a href='https://flxtime.fun/docs/welcome-to-flxtime-flxt/' target='_blank'  className='underline ml-1'>
                    Docs.
                </a>
            </p>
        </div>
    )
}
