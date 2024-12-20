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

export default NavLink