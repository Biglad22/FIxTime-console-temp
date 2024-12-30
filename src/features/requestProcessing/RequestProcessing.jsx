import spinnerSrc from '../../assets/img/spinner.png'

//CLAIM PROCESSING PROMPT 
//THIS IS RENDERED WHEN WAITING FOR USER SIGNATURE ON THE WALLET PROMPT
export function RequestProcessing({className=''}) {
    return(
        <div className={`${className} px-2 w-full`}> 
            <img src={spinnerSrc} alt="sign request" loading="lazy"
                className="w-[1.5rem] h-auto mx-auto animate-spin mb-2"
            />
            <h3 className="text-lg text-high text-center font-medium">Sign the message on your wallet to continue.</h3>
        </div>
    )
} 