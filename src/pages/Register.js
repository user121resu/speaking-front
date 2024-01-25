import {useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {API} from "../components/api";

const Register = () => {
    const [isSuccess, setSuccess] = useState(false);
    const [fullName, setFullName] = useState(null);
    const [phone, setPhone] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    function register() {
        axios.post(API+"/auth/register", {
            fullName,
            phone,
            username,
            password
        }).then((response) => {
            setSuccess(true);
            notify(200, "Muvaffaqiyatli ro'yhatdan o'tdingiz")
        }).catch((error) => {
            notify(403, JSON.stringify(error.response.data))
        })
    }

    function notify(status, message) {
        if (status === 200) {
            toast.success(message);
        } else if (status === 403) {
            toast.error(message);
        }
    }

    return (
        <>
            {
                isSuccess
                    ?
                    <div className="wrapper">
                        <div className={"div-center"}>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <a href={"/login"} style={{fontSize:"40px", color: "black"}}>Kirish</a>
                        </div>
                    </div>
                    :
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
                                       name="fullName"
                                       id="fullName"
                                       placeholder="Ism familiya"
                                       onChange={event => setFullName(event.target.value)}
                                />
                            </div>
                            <div className="form-field d-flex align-items-center">
                                <span className="fas fa-key"></span>
                                <input type="number"
                                       name="phone"
                                       id="phone"
                                       placeholder="Telefon"
                                       onChange={event => setPhone(event.target.value)}
                                />
                            </div>
                            <div className="form-field d-flex align-items-center">
                                <span className="fas fa-key"></span>
                                <input type="text"
                                       name="password"
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
                            <button className="btn mt-3" onClick={register}>Login</button>
                        </div>
                        <div className="text-center fs-6">
                            Allaqachon ro'yhatdan o'tganmisiz <a href="/login">Kirish</a>
                        </div>
                    </div>
            }
        </>
    );
}

export default Register;