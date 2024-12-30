import spinner from '../../assets/img/spinner.png'

///FILLED BUTTON
// icon is the name of the icon to be placed in the button  NOTE: all valid names are available at https://boxicons.com/
export function FilledBtn({title, icon='', className ='', href, right= false}){
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



// CUSTOMIZABLE BUTTON
// CUSTOMBTN TAKE EITHER HREF OR ONCLICK, THIS HELPS IT DETERMINE THE TYPE OF HTML ELEMENT TO RENDER
// ONCLICK MEANS IT IS AN ACTUAL BUTTON, WHILE HREF MEANS IT IS AN ANCHOR TAG
export function CustomBtn({title, icon='', className ='', onClick, href, right= false, process = false, disabled=false }){

    if(onClick){
        return(
            <button type="button" onClick={onClick}  disabled={disabled}
                className={`capitalize font-bold text-[#190D13] text-sm flex ${right ? 'flex-row-reverse' : ''} gap-1 items-center justify-center p-0 rounded-[0.5rem] w-fit transition-all duration-500 ${className}`}
            >
                {icon && <i className={`bx ${icon} font-bold text-[1.2rem]`}></i>}
                {title && <span>
                    {title}
                </span>}
                {
                    //PROCESS = TRUE, DISPLAYS A SPINNER
                    process && <img src={spinner} alt="sign request" loading="lazy"
                    className="w-[1rem] h-auto animate-spin mx-1"/>
                }
            </button>
        )
    }
    else if (href){
        return(
            <a href={href} target='_blank'
                className={`capitalize font-bold text-[#190D13] text-sm flex ${right ? 'flex-row-reverse' : ''} gap-1 items-center justify-center p-0 rounded-[0.5rem]  transition-all duration-500 w-fit ${className}`}
            >
                {icon && <i className={`bx ${icon} font-bold text-[1.2rem]`}></i>}
                {title && <span>
                    {title}
                </span>}
                {
                    process && <img src={spinner} alt="sign request" loading="lazy"
                    className="w-[1rem] h-auto animate-spin mx-1"/>
                }
            </a>
        )
    }
}