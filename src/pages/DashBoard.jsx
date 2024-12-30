
import { useContext, useEffect, useState } from "react";
import FlexerStats from "../components/DashBoard/FlexerStatsTable";
import FlexBanner from "../components/DashBoard/FlexBanner";
import MoreStats from "../components/DashBoard/MoreStats";
import TokenBalance from "../components/DashBoard/TokenBalance";
import { RewardClaimPrompt } from "../features/claimToken/RewardClaim";
import Skeleton from "../components/LoadingSkeleton/Skeleton";
import { userContext } from "../store/UserContext";
import { useNavigate } from "react-router-dom";
import { StakePrompt } from "../features/stakeToken/Index";
import { UnstakePrompt } from "../features/unstake/Index";
import { useWallet } from "@solana/wallet-adapter-react";


//MAIN DASHBOARD
function DashBoard({className=''}) {
    
    const [pageLoading, setPageLoading] = useState(true);
    const navigate = useNavigate();
    const {connected, publicKey, connect} = useWallet();
    const { //access userContext
        reconnectWallet, isOnline, setMasterErr, isClaiming, setIsClaiming, 
        isStaking, setIsStaking, isUnstaking, setIsUnstaking
    } = useContext(userContext);


    //======== MAIN FUNCTION FOR GETTING USER DATA
    const getData = async (wallet)=>{ 
        try {
            if(!isOnline) throw new Error("please check internet connection");
            await reconnectWallet(wallet);
        } 
        catch (error) {
            setMasterErr(error.message)
            navigate('/');
        }
        finally{setPageLoading(false)}
        
    }


    // Check if connect on initial render
    useEffect(()=>{
        if(!connected) connect();
    },[])


    // RECONNECT WALLET AS SOON AS PUBLIC KEY IS AVAILABLE
    useEffect(()=>{
        if(connected || publicKey) {
            const userWallet = publicKey.toString();
            getData(userWallet);
        }
    },[isOnline, connected, publicKey])


    //======== MAIN COMPONENT
    return(
        <div className={className + ' overflow-hidden'}>
            <div className={`max-h-full ${isClaiming ? 'overflow-hidden' : 'overflow-y-auto'}`}>
                <div className={`grid grid-cols-4 grid-row-3 grid-flow-dense  gap-4 content-stretch justify-items-stretch mb-4 p-0 sm:p-4 rounded-[0.67rem] bg-transparent sm:bg-[#181818]`}>
                    {   
                        pageLoading ? 
                        (<>
                            <Skeleton className="row-start-1 order-1 col-span-4 sm:col-span-2 lg:col-span-1  row-span-1 lg:row-span-2 h-[55vh]" />
                            <Skeleton className="order-2 sm:max-lg:order-3 col-span-4 md:col-span-2 row-span-2 h-[55vh]"/>
                            <Skeleton className="order-3 row-start-4 sm:row-start-1 md:max-lg:row-start-2 col-start-1 sm:max-md:col-start-3 lg:col-start-4 sm:max-lg:order-2 col-span-4 sm:col-span-2 lg:col-span-1 row-span-1 lg:row-span-2 h-[55vh]" />
                        </>) :
                        (<>
                            <TokenBalance className="row-start-1 order-1 col-span-4 sm:col-span-2 lg:col-span-1  row-span-1 lg:row-span-2 " onClaim={()=>setIsClaiming(true)} />
                            <FlexerStats className="order-2 sm:max-lg:order-3 col-span-4 md:col-span-2 row-span-2"/>
                            <FlexBanner className="order-3 row-start-4 sm:row-start-1 md:max-lg:row-start-2 col-start-1 sm:max-md:col-start-3 lg:col-start-4 sm:max-lg:order-2 col-span-4 sm:col-span-2 lg:col-span-1 row-span-1 lg:row-span-2" />
                        </>)
                    }
                </div>
                {   
                    pageLoading ? 
                    (<>
                        <Skeleton className="h-[55vh]" />
                    </>) :
                    (<>
                        <MoreStats className="rounded-[0.67rem] bg-transparent sm:bg-[#181818]"/>                        
                    </>)
                }

            </div>
            
            {/* claim prompt component */}
            {/** the component take a prop 'balance', the amount to be claimed */}
            {(isClaiming || isStaking || isUnstaking) && (
                <div className="w-[100vw] h-[100vh] absolute top-0 left-0 z-[60] bg-[rgba(0,0,0,0.8)]">
                    {isClaiming && <RewardClaimPrompt onCloseClaim={()=>setIsClaiming(false)} 
                        className="absolute z-50 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-prompt-width sm:w-[50%] lg:w-[30%]" />
                    }
                    {isStaking && <StakePrompt close={()=>setIsStaking(false)} 
                        className="absolute z-50 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-prompt-width sm:w-[50%] lg:w-[30%]" />
                    }
                    {isUnstaking && <UnstakePrompt close={()=>setIsUnstaking(false)} 
                        className="absolute z-50 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-prompt-width sm:w-[50%] lg:w-[30%]" />
                    }
                </div>
            )}
        </div>
    )
}

export default DashBoard