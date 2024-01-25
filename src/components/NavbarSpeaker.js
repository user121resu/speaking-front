import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import {SpeakerNavbar} from "./NavbarData";

const NavbarPublic = () => {
    function logout() {
        localStorage.clear();
        window.location.reload();
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <a className="navbar-brand" href="/">Speaking</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    {
                        SpeakerNavbar.map((item) => {
                            return (
                                <li className="nav-item">
                                    <a className="nav-link" href={item.path}>{item.name}</a>
                                </li>
                            );
                        })
                    }
                    <li className="nav-item">
                        <button className="nav-link" onClick={logout}>Logout</button>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default NavbarPublic;