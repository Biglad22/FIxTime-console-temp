import NavLink from "./NavLink";
import { useState, useContext } from "react";
import { userContext } from "../../store/UserContext";
import { nav_links_data } from "../../assets/data";
import { CustomBtn } from "../Buttons/FilledBtn";
import { useWallet } from "@solana/wallet-adapter-react";
import { useNavigate } from "react-router-dom";
import { throttle } from "../../utils/Helpers";

/// NAVBAR 
// this is the top bar navigation section
function NavBar(){

    const {wallet, disconnect} = useWallet(); // ACCESS WALLET FUNCTIONS 
    const navigate = useNavigate();
    const {hiddenAddress, linkWallet, isOnline, setMasterErr} = useContext(userContext);
    const[icon, setIcon] = useState('menu'); // stores BOXICON assign name for icons used in menu button

    ///handle menu open and close || switching of menu button icon
    // i'm only using icon value to conditionally display menu tray on small screens because of speed 
    const handleOpenMenu = () => setIcon(oldValue => oldValue === 'menu' ? 'x' : 'menu');

    const disconnectWallet = throttle(async () =>{
        try {
            if (!isOnline) throw new Error("disconnection failed, please check internet connection");
            setMasterErr(null);
            await wallet.adapter.disconnect();
            await disconnect();
            
            
        } catch (error){
            console.log(error);
            setMasterErr(error.message);
        }
        handleOpenMenu()
        navigate('/');
    },5000)

    const handleConnection = throttle(()=>{
        handleOpenMenu()
        linkWallet(true);
    }, 5000);


    return(
        <nav className="px-0 py-5 sticky top-0 left-auto z-50 w-full bg-[#003338]">
            <div className="flex justify-between items-center w-full">
                <a href="#" className="no-underline block">
                    <img src="/img/Logo.png" alt="FlexTime logo - a decentralized mining platform" 
                        className="h-[1.5rem]"
                    />
                </a>
                <button type="button" onClick={handleOpenMenu}
                    className="capitalize font-bold text-sm p-0 text-white block min-[940px]:hidden"
                >
                    <i className={`bx bx-${icon} bx-md`}></i>
                </button>
                <div className={`w-[105%] min-[940px]:w-fit ${icon === 'menu' ? 'p-0 h-0' : 'p-4 h-[100vh]'} overflow-hidden min-[940px]:h-fit  flex flex-col min-[940px]:p-0 absolute top-[100%] -right-[2.5%] min-[940px]:relative min-[940px]:flex-row min-[940px]:top-0 min-[940px]:right-0 gap-3 items-center  justify-center bg-[#003338]  min-[940px]:visible transition-all duration-500 ease-in-out`}>
                    {nav_links_data.map(link => (<NavLink link={link.link} title={link.title} key={link.title}  />))}
                    {
                        hiddenAddress ? 
                        (<CustomBtn title={hiddenAddress} icon="bxs-wallet-alt" className={` border-2 bg-accent border-accent text-[#1D1D1D] w-[10rem]  py-2 px-6 mx-auto`} onClick={disconnectWallet} />)
                        :(<CustomBtn title={wallet ? 'login' : 'connect wallet'}  className={` border-2 bg-accent border-accent text-[#1D1D1D] py-2 px-6 mx-auto`} onClick={handleConnection} />) }
                </div>
            </div>
        </nav>
    )
}

export default NavBar