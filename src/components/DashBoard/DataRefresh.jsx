//refresh notification

import { useContext } from "react"
import { userContext } from "../../store/UserContext"

/// take time 'refreshTime' till the next data refresh
function Refresh(){

    const {refreshTime, fetchUser} = useContext(userContext);

    return(
        <button className="text-sm p-2 border-none disabled:text-medium text-high w-fit" onClick={fetchUser} disabled={refreshTime < 60} >
            <i className='bx bx-revision mr-1'></i>
            Refresh { refreshTime < 60 ? `in ${refreshTime}`: 'now' }
        </button>
    )
}

export default Refresh