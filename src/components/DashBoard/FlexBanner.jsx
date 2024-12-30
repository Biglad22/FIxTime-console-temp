///$FLxT BANNER ON DASHBOARD
function FlexBanner({className =''}) {
    return(
        <div className={` w-full flex-none flex items-center justify-center p-4 rounded-radius logo-wrapper ${className}`}>
            <img src="/img/colored-logo.png" alt="our logo" 
                className="w-auto h-[10rem] sm:w-full lg:h-auto object-contain object-center"
            />
        </div>
    )
}

export default FlexBanner