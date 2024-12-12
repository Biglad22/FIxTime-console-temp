/// DUMMY DATA USED IN APP
const nav_links_data = [
    {   
        title : 'follow us on x',
        link: 'https://x.com/fLxtime1'
    },
    {   
        title : 'join Discord',
        link: ' https://discord.com/invite/KYJyxH42xk'
    },
    {   
        title : 'docs',
        link: 'https://x.com'
    },
    {   
        title : 'trade $FLXT',
        link: 'https://x.com'
    }, 
]


//============= REACT HOOKS

const {useState, useEffect} = React ;


///============== MAIN HOME PAGE COMPONENT
function App (){

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return(
        <div className="bg-[#003338] max-h-[100vh] h-[100vh] overflow-hidden">
            <div className="flex flex-col relative gap-0 mx-0 w-full py-2 px-[1.33rem] sm:px-[2.50rem] md:px-[3.33rem] lg:px-[4.33rem]  xl:px-[5.33rem] pt-0  min-[1500px]:px-0 min-[1500px]:w-[1300px] min-[1500px]:mx-auto max-h-[100vh] h-[100vh]">
                <NavBar />
                {
                    !isLoggedIn ? (<UserAuth onLogin={setIsLoggedIn} />) : (<DashBoard className="flex-1 " />)
                }
                
                
                <p className="text-xs text-medium block mt-2">&copy; 2024 FlxTime - All rights reserved</p>
            </div>
        </div>
    )
}


//=============== SECTIONS 
///NAVBAR 
// this is the top bar navigation section
function NavBar(){

    const[icon, setIcon] = React.useState('menu'); // stores BOXICON assign name for icons used in menu button

    ///handle menu open and close || switching of menu button icon
    // i'm only using icon value to conditionally display menu tray on small screens because of speed 
    const handleOpenMenu = () => setIcon(oldValue => oldValue === 'menu' ? 'x' : 'menu');
    

    return(
        <nav className="px-0 py-5 sticky top-0 left-auto z-50 w-full bg-[#003338]">
            <div className="flex justify-between items-center w-full">
                <a href="#" className="no-underline block">
                    <img src="./assets/img/Logo.png" alt="FlexTime logo - a decentralized mining platform" 
                        className="h-[1.5rem]"
                    />
                </a>
                <button type="button" onClick={handleOpenMenu}
                    className="capitalize font-bold text-sm p-0 text-white block min-[940px]:hidden"
                >
                    <i className={`bx bx-${icon} bx-md`}></i>
                </button>
                <div className={`w-[105%]  min-[940px]:w-fit h-[100vh] min-[940px]:h-fit  flex flex-col p-4 min-[940px]:p-0 absolute top-[100%] -right-[2.5%] min-[940px]:relative min-[940px]:flex-row min-[940px]:top-0 min-[940px]:right-0 gap-3 items-center items-center justify-center bg-[#003338] ${icon === 'menu' ? 'invisible' : 'visible'} min-[940px]:visible transition-all duration-300 `}>
                    {nav_links_data.map(link => (<NavLink link={link.link} title={link.title} key={link.title} />))}
                    <FilledBtn title='userName userName userName' icon="bxl-discord-alt" className="max-w-[10rem]" />
                    {/* <FilledBtn title='login' /> */}
                </div>
            </div>
        </nav>
    )
}

//User authentication block
function UserAuth({onLogin}) {
    return(
        <section>
            <div className="auth-bg p-6 flex flex-col gap-2 items-center justify-center h-[60vh] rounded-[0.5rem] bg-[#181818] mb-2">
                <h1 className="text-4xl font-bold text-high text-center">Hi there, Flexer</h1>
                <h6 className="text-lg text-medium text-center mb-4">Login to access the console.</h6>
                <CustomBtn title='login' className="bg-accent border-2 border-accent text-[#1D1D1D] py-2 px-6" onClick={onLogin} />
            </div>
            <table>

            </table>
        </section>
    )
}

//MAIN DASHBOARD
function DashBoard({className=''}) {
    
    ///opens prompt for user to claim their tokens
    const [isClaiming, setIsClaiming] = useState(false);

    return(
        <div className={`${className} p-0 sm:p-4 rounded-[0.67rem] bg-transparent sm:bg-[#181818] overflow-hidden`}>
            <div className={`grid grid-cols-4 grid-row-3 grid-flow-dense  gap-4 content-stretch justify-items-stretch max-h-full ${isClaiming ? 'overflow-hidden' : 'overflow-y-auto'}`}>
                <TokenBalance className="row-start-1 order-1 col-span-4 sm:col-span-2 lg:col-span-1  row-span-1 lg:row-span-2 " onClaim={()=>setIsClaiming(true)} />
                <FlexerStats className="order-2 sm:max-lg:order-3 col-span-4 md:col-span-2 row-span-2"/>
                <FlexBanner className="order-3 row-start-4 sm:row-start-1 md:max-lg:row-start-2 col-start-1 sm:max-md:col-start-3 lg:col-start-4 sm:max-lg:order-2 col-span-4 sm:col-span-2 lg:col-span-1 row-span-1 lg:row-span-2" />
                <MoreStats className=" order-4 col-span-4 row-span-1 hidden md:flex"/>
                {/* <Skeleton className='order-4 col-span-4 row-span-1 row-start-3  w-full' /> */}
            </div>
            
            {isClaiming && (
                <div className="w-[100vw] h-[100vh] absolute top-0 left-0 z-[60] bg-[rgba(0,0,0,0.8)]">
                    <RewardClaimPrompt onCloseClaim={()=>setIsClaiming(false)} 
                    className="absolute z-50 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-prompt-width sm:w-[50%] md:w-[30%]" />
                </div>
            )}
        </div>
    )
}



//====CHILD COMPONENTS 
///NAV LINK
//nav link takes title of the link and the actual link
function NavLink({title, link}){
    return(
        <a href={link}
            className="capitalize text-sm text-white no-underline block p-2 navlink"
            target="_blank"
        >   
            <span>{title}</span>
            {/* boxIcon is a third party icons package  */}
            <i className='bx bx-up-arrow-alt rotate-45 text-sm ml-2'></i>
        </a>
    )
}

//user balance
function TokenBalance({balance = 0, className = '', onClaim}) {
    return(
        <div className={`${className} p-4 bg-surface rounded-[0.67rem]`}>
            <div className='w-[70%] md:w-full h-fit relative p-2 mb-4 mx-auto'>
                <div className='w-full  bg-[#303030] absolute rounded-[1.11rem] partial-height z-[1] top-[1rem] left-0'></div>
                <img src="./assets/img/token-balance.png" alt="" 
                    className="w-full h-auto relative z-10 animate-pulse"
                />
            </div>
            <div className="py-4 text-center sm:text-left">
                <h3 className="text-high text-2xl font-bold mb-0 ">{balance} $FLXT</h3>
                <h6 className="text-high text-sm font-medium mb-4">Availaible Rewards</h6>
                <CustomBtn  title='claim' icon="bx-right-arrow-alt" onClick={onClaim}
                    className="text-high border-2 border-high py-2 px-6 mb-2 mx-auto sm:mx-0" right
                />
                <div className="bg-accent border-2 border-accent font-bold text-[#1D1D1D] py-2 px-6 w-full rounded-[0.5rem] flex items-center justify-center gap-2">
                    <i className='bx bx-hourglass text-xl'></i>
                    <small className="text-sm">Next claim in {'45h 59m'}</small>
                </div>
            </div>
        </div>
    )
}

/// account stats
function FlexerStats({className=''}) {
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
                    <table className="border-none w-full border-separate border-spacing-y-3 table-auto ">
                        <tbody>
                            <FlexerStat />
                            <FlexerStat addOn='test add on' />
                            <FlexerStat />
                            <FlexerStat addOn='test add on' />
                            <FlexerStat />
                            <FlexerStat addOn='test add on' />
                        </tbody>
                    </table>
                </div>
            </div>
            <Separator className="h-[2.5rem] md:h-[20%]" />
        </div>
        
    )
}

///$FLxT logo
function FlexBanner({className =''}) {
    return(
        <div className={` w-full flex-none flex items-center justify-center p-4 rounded-[0.67rem] logo-wrapper ${className}`}>
            <img src="./assets/img/colored-logo.png" alt="our logo" 
                className="w-auto h-[10rem] sm:w-full lg:h-auto object-contain object-center"
            />
        </div>
    )
}

/// coming soon stats section
function MoreStats({className=''}) {
    return(
        <section className={`p-6 flex flex-col gap-2 justify-center items-start bg-surface angular-gradient rounded-[0.67rem] ${className}`}>
            <h3 className="text-high text-2xl font-bold">
                More stats flexing soon
            </h3>
            <h6 className="text-high font-normal">
            Help our community grow, spread the word.
            </h6>
            <CustomBtn title='Spread the $FXLT word on X' icon="bx-right-arrow-alt" className="text-accent border-2 border-accent py-2 px-6" right /> 
        </section>
    )
}
  

//=============================== COMPONENTS ==================================
// FLEXER SINGLE STAT STAT 
function FlexerStat({title='test title', value ='test value', addOn}) {
    return(
        <tr className="h-fit capitalize font-medium text-high text-sm bg-surface">
            <td className=" w-[50%] md:w-[40%] xl:w-[30%] text-accent py-2 px-3 rounded-l-[0.22rem] border-none">
                {title}
            </td>
            <td className="py-1 px-3 rounded-r-[0.22rem] border-none">
                {value}
                {addOn && <span className="block text-xs text-medium font-normal">{addOn}</span>}
            </td>
        </tr>
    )
}

///FILLED BUTTON
// icon is the name of the icon to be placed in the button  NOTE: all valid names are available at https://boxicons.com/
function FilledBtn({title, icon='', className ='', href, right= false}){
    return(
        <a href={href}
            className={`capitalize font-bold text-[#190D13] bg-[#29EEFF] text-sm flex ${right ? 'flex-row-reverse' : ''} gap-1 items-center py-2 px-6 rounded-[0.5rem] w-fit ${className}`}
        >
            {icon && <i className={`bx ${icon} font-bold text-[1.2rem]`}></i>}
            <span className="truncate flex-1">
                {title}
            </span>
        </a>
    )
}

///CUSTOMIZABLE BUTTON
function CustomBtn({title, icon='', className ='', onClick, right= false}){
    return(
        <button type="button" onClick={onClick}
            className={`capitalize font-bold text-[#190D13] text-sm flex ${right ? 'flex-row-reverse' : ''} gap-1 items-center justify-center p-0 rounded-[0.5rem] w-fit ${className}`}
        >
            {icon && <i className={`bx ${icon} font-bold text-[1.2rem]`}></i>}
            {title && <span>
                {title}
            </span>}
        </button>
    )
}

//refresh notification
function Refresh({refreshTime='52s'}) {
    return(
        <p className="text-sm text-medium w-fit">
            <i className='bx bx-revision mr-1'></i>
            Refresh in {refreshTime}
        </p>
    )
}

///SEPARATOR
function Separator({className =''}) {
    return(
        <div className={`w-full bg-[url('/assets/img/Separator.png')] bg-cover bg-no-repeat bg-center ${className}`}></div>
    )
}

//===== REWARD CLAIM PROMPTS
function RewardClaimPrompt({className='', balance = 0, onCloseClaim}) {
    const [isComplete, setComplete] = useState(true)

    // closes the claim prompt
    const closePrompt = () => onCloseClaim();

    return(
        <>
            {
                !isComplete ? (<ProcessRewardClaim className={className} closePrompt={closePrompt} />) : ( <ClaimSuccessful className={className} closePrompt={closePrompt} />)
            }
        </>
    )
}

//===== REWARD CLAIM PROMPTS
function ProcessRewardClaim({className='', balance = 0, closePrompt}) {
    return(
        <div className={`${className} p-4 rounded-[0.67rem] bg-[#2F2F2F]`}>
            <div className="flex justify-between items-center w-full ">
                <h6 className="text-sm text-accent text-left ">Claim $FLXT Rewards</h6>
                <CustomBtn icon="bx-x" className="text-4xl text-accent" onClick={closePrompt} />
            </div>
            <small className="block text-[#646871] text-left mb-4">You are about to claim your rewards.</small>
            <h3 className="font-bold text-lg text-center text-high">{balance} $FLXT</h3>
            <p className="text-medium text-center text-sm block mt-2 mb-4">Available Rewards</p>
            <CustomBtn className="bg-accent text-[#1D1D1D] py-2 px-6 w-full" title='Proceed with claim ' icon="bx-right-arrow-alt" right />
            {/* process is loading */}
            <ClaimProcessing className="mt-4"/>
        </div>
    )
}

//CLAIM PROCESSING PROMPT
function ClaimProcessing({className=''}) {
    return(
        <div className={`${className} px-2 w-full`}> 
            <img src="./assets/img/spinner.png" alt="sign request" loading="lazy"
                className="w-[1.5rem] h-auto mx-auto animate-spin mb-2"
            />
            <h3 className="text-2xl text-high text-center font-medium">Sign the message on your wallet to continue.</h3>
        </div>
    )
} 

/// SUCCESSFUL CLAIM
function ClaimSuccessful({className='', amount = 0, closePrompt}) {
    return(
        <div className={`${className} p-4 rounded-[0.67rem] bg-[#2F2F2F]`}>
            <h6 className="text-sm text-accent text-left block">Claim $FLXT Rewards</h6>
            <small className="block text-[#646871] text-left mb-4">You are about to claim your rewards.</small>
            <h3 className="font-bold text-lg text-center text-high">{amount} $FLXT</h3>
            <p className="text-medium text-sm  text-center block my-2">Claim complete 🎉</p>
            <p className="text-medium text-sm text-center block mb-4">Your tokens should arrive in your wallet shortly.</p>
            {/* close or share claim */}
            <CustomBtn className="bg-accent border-2 border-accent text-[#1D1D1D] py-2 px-6 w-full mb-2" title='close' onClick={closePrompt} />
            <CustomBtn className="text-accent border-2 border-accent py-2 px-6 w-full" title='share on X' icon="bx-right-arrow-alt" right />
        </div>
    )
}

// skeleton for loading component
function Skeleton (className='') {
    return(
        <div className={`p-2 bg-surface min-h-full rounded-[0.68rem] ${className}`}>
            <div className="animate-pulse flex flex-col gap-2 h-full w-full">
                <div className="rounded-[0.67rem] bg-[#303030] h-[2rem] w-full"></div>
                <div className="flex-1 bg-[#303030] rounded-[0.67rem] w-full"></div>
            </div>
        </div>
    )
}

///MOUNTS APP
ReactDOM.createRoot(document.getElementById('app')).render(<App />)