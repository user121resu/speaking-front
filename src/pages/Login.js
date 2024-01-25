import {useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {API} from "../components/api";

const Login = () => {
    const [username,setUsername] = useState(null);
    const [password,setPassword] = useState(null);

    function login() {
        notify(0,"Iltimos ozgina kuting");
        axios.post(API+"/auth/login",{
            username,
            password
        }).then((response) => {
            localStorage.setItem("token",response.data.token);
            notify(200,"Kirishga ruhsat berildi")
            window.location.reload();
        }).catch((error) => {
            notify(403,"Parol yoki Foydalanuvchi nomi xato");
        })
    }

    function notify(status,message) {
        if (status === 200) {
            toast.success(message);
        } else if (status === 0) {
            toast.info(message);
        } else if (status === 403) {
            toast.error(message);
        }
    }

    return(
        <div className="wrapper">
            <div className="logo">
                <a href={"https://t.me/Davronbek_tukhtasinov"}>
                    <img src="/logo.jpg" alt="Created by Davronbe Tukhtasinov"/>
                </a>
            </div>
            <div className="text-center mt-4 name">
                Speaking
            </div>
            <div className="p-3 mt-3">
                <div className="form-field d-flex align-items-center">
                    <span className="far fa-user"></span>
                    <input type="text"
                           name="userName"
                           id="userName"
                           placeholder="Foydalanuvchi nomi"
                           onChange={event => setUsername(event.target.value)}
                    />
                </div>
                <div className="form-field d-flex align-items-center">
                    <span className="fas fa-key"></span>
                    <input type="password"
                           name="password"
                           id="pwd"
                           placeholder="Parol"
                           onChange={event => setPassword(event.target.value)}
                    />
                </div>
                <button className="btn mt-3" onClick={login}>Kirish</button>
            </div>
            <div className="text-center fs-6">
                Siz yangimisiz ? <a href="/">Ro'yxatdan o'tish</a>
            </div>
        </div>
    );
}

export default Login;