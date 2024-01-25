import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NavbarPublic from "./components/NavbarPublic";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import "./index.css";
import NavbarSpeaker from "./components/NavbarSpeaker";
import Recorder from "./pages/Recorder";
import Voices from "./pages/Voices";

function App() {
    const isLogin = localStorage.getItem("token") !== null;

    return (
        <>
            {
                isLogin
                    ? <BrowserRouter>
                        <NavbarSpeaker/>
                        <Routes>
                            <Route path={"/"} element={<h1>Logged in</h1>}/>
                            <Route path={"/challenge"} element={<Recorder/>}/>
                            <Route path={"/voices"} element={<Voices/>}/>
                            <Route path='*' element={<Navigate to='/'/>}/>
                        </Routes>
                    </BrowserRouter>
                    : <BrowserRouter>
                        <NavbarPublic/>
                        <Routes>
                            <Route path={"/"} element={<h1>Home</h1>}/>
                            <Route path={"/login"} element={<Login/>}/>
                            <Route path={"/register"} element={<Register/>}/>
                            <Route path='*' element={<Navigate to='/'/>}/>
                        </Routes>
                    </BrowserRouter>
            }
            <ToastContainer/>
        </>
    );
}

export default App;
