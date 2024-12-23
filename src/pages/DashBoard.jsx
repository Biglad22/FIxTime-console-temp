
import { useContext, useEffect, useState } from "react";
import FlexerStats from "../components/DashBoard/FlexerStatsTable";
import FlexBanner from "../components/DashBoard/FlexBanner";
import MoreStats from "../components/DashBoard/MoreStats";
import TokenBalance from "../components/DashBoard/TokenBalance";
import { RewardClaimPrompt } from "../components/DashBoard/RewardClaim";
import Skeleton from "../components/LoadingSkeleton/Skeleton";
import { userContext } from "../store/UserContext";
import { useNavigate } from "react-router-dom";
import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";


//MAIN DASHBOARD
function DashBoard({className=''}) {
    
    ///opens prompt for user to claim their tokens
    /// isClaim should be true if user clicks on the claim button
    const [isClaiming, setIsClaiming] = useState(false);
    const [pageLoading, setPageLoading] = useState(false);
    const navigate = useNavigate()
    ///access userContext
    const {reconnectWallet, isOnline, setMasterErr} = useContext(userContext);
    const {wallet} = useWallet()



    useEffect(()=>{
        
        const getData = async () =>{
            try {
                if(!isOnline) throw new Error("please check internet connection");
                setPageLoading(true);
                await reconnectWallet();
            } 
            catch (error) {
                setMasterErr(error.message)
                navigate('/');
            }
            finally{setPageLoading(false)}
        }

        getData();

    },[isOnline])

    return(
        <div className={`${className} p-0 sm:p-4 rounded-[0.67rem] bg-transparent sm:bg-[#181818] overflow-hidden`}>
            <div className={`grid grid-cols-4 grid-row-3 grid-flow-dense  gap-4 content-stretch justify-items-stretch max-h-full ${isClaiming ? 'overflow-hidden' : 'overflow-y-auto'}`}>
                {   
                    pageLoading ? 
                    (<>
                        <Skeleton className="row-start-1 order-1 col-span-4 sm:col-span-2 lg:col-span-1  row-span-1 lg:row-span-2 h-[55vh]" />
                        <Skeleton className="order-2 sm:max-lg:order-3 col-span-4 md:col-span-2 row-span-2 h-[55vh]"/>
                        <Skeleton className="order-3 row-start-4 sm:row-start-1 md:max-lg:row-start-2 col-start-1 sm:max-md:col-start-3 lg:col-start-4 sm:max-lg:order-2 col-span-4 sm:col-span-2 lg:col-span-1 row-span-1 lg:row-span-2 h-[55vh]" />
                        <Skeleton className=" order-4 col-span-4 row-span-1 hidden md:flex w-full h-[35vh]"/>
                    </>) :
                    (<>
                        <TokenBalance className="row-start-1 order-1 col-span-4 sm:col-span-2 lg:col-span-1  row-span-1 lg:row-span-2 " onClaim={()=>setIsClaiming(true)} />
                        <FlexerStats className="order-2 sm:max-lg:order-3 col-span-4 md:col-span-2 row-span-2"/>
                        <FlexBanner className="order-3 row-start-4 sm:row-start-1 md:max-lg:row-start-2 col-start-1 sm:max-md:col-start-3 lg:col-start-4 sm:max-lg:order-2 col-span-4 sm:col-span-2 lg:col-span-1 row-span-1 lg:row-span-2" />
                        <MoreStats className=" order-4 col-span-4 row-span-1 hidden md:flex"/>
                    </>)
                }
            </div>
            
            {/* claim prompt component */}
            {/** the component take a prop 'balance', the amount to be claimed */}
            {isClaiming && (
                <div className="w-[100vw] h-[100vh] absolute top-0 left-0 z-[60] bg-[rgba(0,0,0,0.8)]">
                    <RewardClaimPrompt onCloseClaim={()=>setIsClaiming(false)} 
                    className="absolute z-50 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-prompt-width sm:w-[50%] md:w-[30%]" />
                </div>
            )}
        </div>
    )
}

export default DashBoard