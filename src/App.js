import React, { useEffect } from "react";
import "./App.css";
import WebcamCapture from "./WebcamCapture";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Preview from "./Preview";
import Chats from "./Chats";
import View from "./View";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/appSlice";
import Login from "./Login";
import { auth } from "./firebase";
import snapchatLogo from "./snapchat_logo.png";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            username: authUser.displayName,
            id: authUser.id,
            profilePic: authUser.photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        {!user ? (
          <Login />
        ) : (
          <>
            <img
              src={snapchatLogo}
              style={{ height: 50, width: 50, marginBottom: 20 }}
              alt=""
            />
            <div className="app_body">
              <div className="app_background">
                <Routes>
                  <Route exact path="/" element={<WebcamCapture />} />
                  <Route path="/preview" element={<Preview />} />
                  <Route path="/chats" element={<Chats />} />
                  <Route path="/chats/view" element={<View />} />
                </Routes>
              </div>
            </div>
          </>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
