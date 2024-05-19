import { useEffect, useState } from "react";
import { GoogleLogin } from 'react-google-login';
import { gapi } from "gapi-script";

import React from 'react'

const GoogleLoginButton = () => {

    const client_ID = "459220392607-5tqfp24sjpko70hlhppmgag1mjcse84a.apps.googleusercontent.com";
    const [user, setUser] = useState({});


    useEffect(()=>{
        const start = () =>{
            gapi.auth2.init({
                clientId: client_ID,
            })
        }
        gapi.load("client:auth2", start)
    }, [])


    const onSuccess = (response) =>{
        setUser(response.profileObj);
    }

    const onFailure = () => {
        console.log("Something went wrong")
    }

  return (
    <div>
    <div>
  
    <GoogleLogin
        clientId={client_ID}
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_policy"}
    />
    </div>
    <div className={user? "profile":"hidden"}>
        <img src={user.imageUrl} alt=""/>
        <h3>{user.name}</h3>
    </div>
    </div>

  )
}

export default GoogleLoginButton