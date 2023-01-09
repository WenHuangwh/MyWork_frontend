import React from "react";
import './styles.css';
import Home from "./components/Home/index";
import { useState, useEffect } from "react";
import Login from "./components/authentication/Login";
import Logout from "./components/authentication/Logout";
import { Navbar } from "react-bootstrap";
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function App() {

    const [user, setUser] = useState(null);

    useEffect(() => {
        let loginData = JSON.parse(localStorage.getItem("login"));
        if (loginData) {
            let loginExp = loginData.exp;
            let now = Date.now() / 1000;
            if (now < loginExp) {
                // Not expired
                setUser(loginData);
            } else {
                // Expired
                localStorage.setItem("login", null);
            }
        }
    }, []);

    return (

        <GoogleOAuthProvider clientId={clientId}>

            <div>
                <Navbar>
                    {user ? (
                        <Logout setUser={setUser} />
                    ) : (
                        <Login setUser={setUser} />

                    )}
                </Navbar>
            </div>

            <div>
                < Home user={user} />
            </div>
        </GoogleOAuthProvider>

    );
}

export default App;