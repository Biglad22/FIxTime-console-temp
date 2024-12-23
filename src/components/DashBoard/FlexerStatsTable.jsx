import React, {useContext} from "react"
import Refresh from "./DataRefresh"
import {formatAndElapsedTime} from '../../utils/Helpers'
import  {userContext}  from "../../store/UserContext";
import FlexerStat from "./FlexStatRow"; 
import Separator from '../Separators/Separator'


/// account stats
/// component containing table of user DETAILS
function FlexerStats({className=''}) {

    //ALL STATS DISPLAYED ON TABLE
    const {status, hiddenAddress, proof_count, last_proof_time, locked_rewards} = useContext(userContext);
    
    // FORMATS DATE TO MORE REASONABLE FORMAT FOR USERS
    const { formattedDate, elapsedTimeString } = formatAndElapsedTime(last_proof_time);

    return(
        <div className={`${className} bg-[#3A3A3A] rounded-[0.67rem] flex flex-col max-h-full justify-between overflow-hidden `}>
            <div className="p-4 pb-2 flex flex-col overflow-hidden ">
                
                <div className="flex flex-col sm:flex-row justify-between items-center gap-2 mb-1">
                    <h3 className="text-high text-2xl font-bold">
                        <i className='bx bxs-bar-chart-alt-2 mr-3' ></i>
                        Flexer Stats
                    </h3>
                    <Refresh />
                </div>
                <div className="w-full flex-1 overflow-auto">
                    {/* this is a table of user claim history*/}
                    <table className="border-none w-full border-separate border-spacing-y-3 table-auto ">
                        <tbody>
                            {/* map through the claim history, addOn can be secondary information  */}
                            {/* the flexerStat components are just dummy placeholders */}
                            <FlexerStat title="status" value={status} />
                            <FlexerStat title="proof count" value={proof_count} />
                            <FlexerStat title="latest count" value={elapsedTimeString} addOn={formattedDate} />
                            <FlexerStat title="locked rewards" value={locked_rewards} /> 
                            <FlexerStat title="wallet" value={hiddenAddress} />
                        </tbody>
                    </table>
                </div>
            </div>
            <Separator className="h-[2.5rem] md:h-[20%]" />
        </div>
        
    )
}

export default FlexerStats