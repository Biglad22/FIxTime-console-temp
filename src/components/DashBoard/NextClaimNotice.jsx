
// NEXT CLAIM CYCLE
/// THIS DISPLAYS HOW LONG IS REMAINING TILL THE NEXT CLAIM
function NextClaimCycle({time = '45h 59m', className=''}) {
    return(
        <div className={`bg-accent border-2 border-accent font-bold text-[#1D1D1D] py-2 px-6 w-full rounded-[0.5rem] flex items-center justify-center gap-2 ${className}`}>
            <i className='bx bx-hourglass text-xl'></i>
            {/* replace the '45h 59m' with actual time */}
            <small className="text-sm">Next claim in {time}</small> 
        </div>
    )
}

export default NextClaimCycle