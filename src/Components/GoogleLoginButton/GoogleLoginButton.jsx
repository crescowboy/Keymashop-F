import React, { useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";

const GoogleLoginButton = () => {
  const client_ID = "459220392607-5tqfp24sjpko70hlhppmgag1mjcse84a.apps.googleusercontent.com";

  useEffect(() => {
    const initClient = () => {
      gapi.auth2.init({
        clientId: client_ID,
        scope: "profile email"
      });
    };

    gapi.load("client:auth2", initClient);
  }, [client_ID]);

  const onSuccess = async (response) => {
    const profile = response.profileObj;
    localStorage.setItem("user", JSON.stringify(profile));
    localStorage.setItem("accessToken", response.accessToken);

    try {
      const idToken = response.tokenId;
      const backendResponse = await fetch('http://localhost:4000/google-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: idToken }),
      });

      // Verificar si la respuesta es válida antes de intentar parsearla como JSON
      if (!backendResponse.ok) {
        const errorText = await backendResponse.text();
        throw new Error(errorText || 'Error during Google login');
      }

      const data = await backendResponse.json();

      if (data.success) {
        localStorage.setItem('auth-token', data.token);
        window.location.replace("/"); // Redirigir a la página principal
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('An error occurred during login. Please try again.');
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
    </div>
  );
};

export default GoogleLoginButton;
