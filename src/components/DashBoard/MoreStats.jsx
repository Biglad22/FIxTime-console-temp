
import { Staking } from "../staking/staking/Staking"
import { StakeActivies } from "../staking/activities/StakeActivies"
import { StakeDetails } from "../staking/details/StakeDetails"


/// coming soon stats section ON DASHBOARD
function MoreStats({className=''}) {

    return(
        <section className={`p-0 sm:p-4 flex gap-2 justify-center items-stretch flex-wrap bg-surface rounded-radius h-fit max-h-fit xl:h-[65vh]  xl:max-h-[65vh]  ${className}`}>

            <Staking className="flex-[100%] md:flex-1" /> {/* Staking component */}
            <StakeDetails className='flex-[100%] md:flex-1'/> {/* StakeDetails component */} 
            <StakeActivies className=' flex-[100%] xl:flex-1 overflow-y-auto h-[80vh] max-h-[80vh] xl:h-full xl:max-h-full' /> {/* StakeActivies component */}
            
            {/* <h3 className="text-high text-2xl font-bold">
                Staking flexing soon
            </h3>
            <h6 className="text-high font-normal">
                 Help our community grow, spread the word.
            </h6>
            <CustomBtn title='Spread the $FXLT word on X' icon="bx-right-arrow-alt" className="text-accent border-2 border-accent py-2 px-6" right 
                href={`https://twitter.com/intent/tweet?text=I've%20been%20flexing%20on%20FlxTime!%20%40flxtime1.%20Join%20me%20in%20mining%20%24FLXT%20%E2%80%94%20and%20make%20time%20more%20rewarding!%20%F0%9F%92%AA`}
            />  */}
        </section>
    )
}

export default MoreStats