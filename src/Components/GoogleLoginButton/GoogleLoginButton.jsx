import React, { useEffect, useState } from "react";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";

const GoogleLoginButton = () => {
  const client_ID = "459220392607-5tqfp24sjpko70hlhppmgag1mjcse84a.apps.googleusercontent.com";
  const [user, setUser] = useState(null);

  useEffect(() => {
    const initClient = () => {
      gapi.auth2.init({
        clientId: client_ID,
        scope: "profile email"
      });
    };

    gapi.load("client:auth2", initClient);

    // Check if user data is available in localStorage on component mount
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, [client_ID]);

  const onSuccess = async (response) => {
    const profile = response.profileObj;
    localStorage.setItem("user", JSON.stringify(profile));
    localStorage.setItem("accessToken", response.accessToken);
    setUser(profile); // Update the user state

    // Enviar el token al backend
    const idToken = response.tokenId;
    const backendResponse = await fetch('http://localhost:4000/google-login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: idToken }),
    }).then(res => res.json());

    if (backendResponse.success) {
      localStorage.setItem('auth-token', backendResponse.token);
      window.location.replace("/");
    }
  };

  const onFailure = (error) => {
    console.error("Login Failure:", error);
  };

  return (
    <div>
      <GoogleLogin
        clientId={client_ID}
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        render={(renderProps) => (
          <button
            className="google-login-button"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            Login with Google
          </button>
        )}
      />
      {user && (
        <div className="profile">
          <img src={user.imageUrl} alt={user.name} />
          <h3>{user.name}</h3>
        </div>
      )}
    </div>
  );
};

export default GoogleLoginButton;
