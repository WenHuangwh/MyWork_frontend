import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { IDS } from "../../context";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function Login({ setUser }) {

    const onSuccess = (res) => {
        var tokenData = jwt_decode(res.credential);
        var loginData = {
            googleId: tokenData.sub,
            ...tokenData
        }
        // const valid_ids = process.env.REACT_APP_VALID_IDS.split(",");
        // console.log(process.env.REACT_APP_VALID_IDS);
        // console.log(process.env.REACT_APP_BASE_URL);
        // console.log(loginData.googleId);
        setUser(loginData);
        localStorage.setItem("login", JSON.stringify(loginData));
        console.log('Login Success:', loginData);
    };

    const onFailure = (res) => {
        console.log('Login failed: res', res);
    };

    return (
        <div>
            <GoogleLogin
                auto_select={true}
                clientId={clientId}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                style={{ marginTop: '100px' }}
                isSignedIn={true}
            />
        </div>
    );
}

export default Login;