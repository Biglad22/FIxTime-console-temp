// skeleton for loading component
// should be displayed for each component while dashboard information is loading
function Skeleton ({className=''}) {
    return(
        <div className={`p-2 bg-surface rounded-[0.68rem] ${className}`}>
            <div className="animate-pulse bg-[#303030] rounded-[0.67rem] w-full h-full"></div>
        </div>
    )
}

export default Skeleton