import { useState, useEffect, useRef } from "react";
import React from 'react';
import "./header.css";
import { Link } from "react-router-dom";
import spemaiLogo from "../../pages/assets/logo.png";
import { AiOutlineStar, AiOutlineBell } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { deleteToken } from "../../_auth/auth";
import person from "../../../src/pages/assets/person.jpg";


function Header() {
    const navigate = useNavigate();
    const handleLogout = () => {
        // Delete the token or perform any other necessary logout tasks
        deleteToken();
        // Navigate to the login page
        navigate(`/`);
    };
    useEffect(() => {

    }, []);

    return (
        <header className="navbar navbar-expand-lg">
        <div className="container-fluid">
            <Link style={{ textDecoration: "none" }} to="/dashboard" className="navbar-brand">
                <img
                    style={{ width: "170px", height: "auto" }}
                    className="img"
                    src={spemaiLogo}
                    alt="Spemai Logo"
                />
            </Link>
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarContent"
                aria-controls="navbarContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
                onClick={handleLogout}
            >
                <button className="logout" onClick={handleLogout}>
                    Logout
                </button>
            </button>
            <div className="collapse navbar-collapse" id="navbarContent">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <button className="logout" onClick={handleLogout}>
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </header>


        // <header className="navbar navbar-expand navbar-dark flex-column flex-md-row bd-navbar">
        //   <div className="navbar-nav-scroll ml-5">
        //     <ul className="navbar-nav bd-navbar-nav flex-row">
        //       <li className="nav-item">
        //         <Link style={{ textDecoration: "none" }} to="/account">
        //           {" "}
        //           <img
        //             style={{ width: "170px", height: "auto", marginLeft: "10px" }}
        //             className="img"
        //             src={spemaiLogo}
        //           />
        //         </Link>
        //       </li>
        //     </ul>
        //   </div>
        //   <ul className="navbar-nav flex-row ml-md-auto d-none d-md-flex mr-5">
        //     <li className="nav-item nav-logout">
        //       <button className="logout" onClick={handleLogout}>
        //         Logout
        //       </button>
        //     </li>
        //   </ul>
        // </header>
       

    );
}

export default Header;
