import { Button } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { auth, provider } from "./firebase";
import "./Login.css";
import snapchatLogo from "./snapchat_logo.png";
import { login } from "./features/appSlice";

function Login() {
  const dispatch = useDispatch();

  const signin = () => {
    auth
      .signInWithPopup(provider)
      .then(({ user }) => {
        dispatch(
          login({
            username: user.displayName,
            id: user.uid,
            profilePic: user.photoURL,
          })
        );
      })
      .catch((error) => {
        alert(error.code);
      });
  };

  return (
    <div className="login">
      <div className="login__logo">
        <img src={snapchatLogo} alt="" />
      </div>
      <Button
        onClick={signin}
        className="login__btn"
        color="secondary"
        size="large"
        variant="contained"
      >
        LOGIN
      </Button>
    </div>
  );
}

export default Login;
