import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";

const Home = () => {
  const [chats, setChats] = useState([]);

  const fetchChats = async () => {
    const { data } = await axios.get("/api/chat");
    setChats(data);
    // console.log(data);
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div>
      Home
      {/* use curly braces to write js in react html */}
      {chats.map((chat) => {
        return <div key={chat._id}>{chat.chatName}</div>;
      })}
    </div>
  );
};

export default Home;
