import NavBar from "./components/NavBar/NavBar";
import DashBoard from "./pages/DashBoard";
import AuthPage from "./pages/AuthPage";
import { RoutesGuard } from "./utils/RoutesGuard";
import { BrowserRouter as Router, Route, Routes  } from "react-router-dom";


///============== MAIN HOME PAGE COMPONENT
function App(){

    return(
        <Router>
            <div className="bg-[#003338] main-wrapper overflow-hidden">
                <div className="flex flex-col relative gap-0 mx-0 w-full py-2 px-[1.33rem] sm:px-[2.50rem] md:px-[3.33rem] lg:px-[4.33rem]  xl:px-[5.33rem] pt-0  min-[1500px]:px-0 min-[1500px]:w-[1300px] min-[1500px]:mx-auto max-h-full h-full">
                    <NavBar />

                    {/* all valid routes */}
                    <Routes>
                        <Route path="/" element={<AuthPage />} />
                        <Route path="/dashboard" element={<RoutesGuard><DashBoard className="flex-1 " /></RoutesGuard>} />
                    </Routes>

                    <p className="text-xs text-medium block mt-2">&copy; 2024 FlxTime - All rights reserved</p>
                </div>
            </div>
        </Router>
    )
}


export default App
