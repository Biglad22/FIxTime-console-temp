import { useContext } from "react";
import { CustomBtn } from "../Buttons/FilledBtn";
import NextClaimCycle from "./NextClaimNotice";
import {userContext} from "../../store/UserContext";

//component that displays user balance and button for claiming AND NEXT CLAIM PERIOD
function TokenBalance({className = '', onClaim}) {
    
    const {paddedBalance} = useContext(userContext);
    
    return(
        <div className={`${className} p-4 bg-surface rounded-[0.67rem]`}>
            <div className='w-[70%] md:w-full h-fit relative p-2 mb-4 mx-auto'>
                <div className='w-full  bg-[#303030] absolute rounded-[1.11rem] partial-height z-[1] top-[1rem] left-0'></div>
                <img src="/img/token-balance.png" alt="" 
                    className="w-full h-auto relative z-10 animate-pulse"
                />
            </div>
            <div className="py-4 text-center sm:text-left">
                <h3 className="text-high text-2xl font-bold mb-0 ">{paddedBalance} $FLXT</h3>
                <h6 className="text-high text-sm font-medium mb-4">Availaible Rewards</h6>
                <CustomBtn  title='claim' icon="bx-right-arrow-alt" onClick={onClaim}
                    className="text-high border-2 border-high py-2 px-6 mb-2 mx-auto sm:mx-0" right
                />

                {/* this should display how long a user has till next claim */}
                <NextClaimCycle />
                
            </div>
        </div>
    )
}

export default TokenBalance