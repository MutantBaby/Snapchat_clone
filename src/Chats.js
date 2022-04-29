import React, { useEffect, useState } from "react";
import "./Chats.css";
import Chat from "./Chat";
import SearchIcon from "@material-ui/icons/Search";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import { Avatar } from "@material-ui/core";
import { auth, db } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "./features/appSlice";
import { useNavigate } from "react-router-dom";
import { resetCameraImage } from "./features/cameraSlice";

function Chats() {
  const [posts, setPosts] = useState([]);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  const takeBack = () => {
    dispatch(resetCameraImage());
    navigate("/");
  };

  // console.log(user.profilePic);

  return (
    <div className="chats">
      <div className="chats__header">
        <Avatar
          scr={user.profilePic}
          onClick={() => auth.signOut()}
          className="chats__avatar"
        />
        <div className="chats__search">
          <SearchIcon className="chats__searchIcon" />
          <input type="text" placeholder="Friends" />
        </div>
        <ChatBubbleIcon className="chats__chatIcon" />
      </div>
      <div className="chats__posts">
        {posts.map(
          ({
            id,
            data: { profilePic, username, read, timestamp, imageUrl },
          }) => (
            <Chat
              key={id}
              id={id}
              profilePic={profilePic}
              username={username}
              read={read}
              timestamp={timestamp}
              imageUrl={imageUrl}
            />
          )
        )}
      </div>
      <RadioButtonUncheckedIcon
        className="chats__takePicIcon"
        onClick={takeBack}
        fontSize="large"
      />
    </div>
  );
}

export default Chats;
