import React, { useRef, useEffect } from "react";
import "./Chats.css";
import { IconButton } from "component-craftsman";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../../../AppContext";
import { BASE_API } from "../../../config";
import { User } from "../../../assets/images";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

// for communication
import io from "socket.io-client";
const socket = io("http://localhost:5000"); // Connect to Socket.IO server

const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  const currentDate = new Date();

  // Check if the message is from today
  if (
    date.getDate() === currentDate.getDate() &&
    date.getMonth() === currentDate.getMonth() &&
    date.getFullYear() === currentDate.getFullYear()
  ) {
    // Message is from today, format time only
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `Today, ${formattedHours}:${formattedMinutes} ${ampm}`;
  } else {
    // Message is from a different date, format full date
    const options = { month: "short", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  }
};

const Message = () => {
  const navigation = useNavigate();
  const { token, user, setModal2Open, setModelType, setModelMessgae } =
    React.useContext(AppContext);
  const [query, setQuery] = React.useState("");
  const [messages, setMessages] = React.useState([]);
  const [activeChat, setActiveChat] = React.useState(null);
  // message input
  const [message, setMessage] = React.useState("");
  const [messageState, setMessgaeState] = React.useState(false);
  const lastMessageRef = useRef(null);
  // for communication
  const socketRef = React.useRef();

  React.useLayoutEffect(() => {
    fetchIfUser();
  }, [window.location.search, navigation]);

  const fetchIfUser = async () => {
    const queryParams = new URLSearchParams(window.location.search);
    const queryString = queryParams.get("query");
    try {
      const data = JSON.parse(queryString);
      if (data) {
        const response = await axios.get(`${BASE_API}/common/profile/${data}`);
        setQuery(response.data.user);
      }
    } catch (error) {
      console.error("Error parsing query parameter:", error);
    }
  };

  React.useLayoutEffect(() => {
    if (token) {
      fetchUsersAndMessage();
    }
  }, [token]);

  const fetchUsersAndMessage = async () => {
    try {
      const response = await axios.get(
        `${BASE_API}/common/message/conversations`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setMessages(response.data.conversations);
      }

      console.log(response.data.conversations);
    } catch (error) {
      console.log("failed to get the messages:", error);
    } finally {
    }
  };

  const sendMessage = async () => {
    // console.log("activeChat:", activeChat);
    if (!message.trim()) {
      setModal2Open(true);
      setModelType("Warning");
      setModelMessgae("Please enter a valid message.");
      return;
    }

    setActiveChat((prev) => ({
      ...prev,
      messages: [
        ...prev.messages,
        {
          text: message,
          sender: user?._id,
          createdAt: Date.now(),
          state: "sending",
        },
      ],
    }));

    try {
      socketRef.current.emit("message", { conversationId: activeChat._id, text: message, sender: User._id });
      const response = await axios.post(
        `${BASE_API}/common/message/conversations/${activeChat._id}/message-send`,
        {
          text: message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        toast.success("send");
        setActiveChat(response?.data?.conversation);
        setMessage("");
      }
    } catch (error) {
      console.log("Failed to send message:", error);
    } finally {
    }
  };

  // Scroll to the last message when the component mounts or activeChat changes
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeChat]);

  // Cleanup function for disconnecting socket when component unmounts
  useEffect(() => {
    socketRef.current = io("http://localhost:5000");
    return () => {
      socketRef.current.disconnect();
    };
  }, []);
  
  useEffect(() => {
    if (activeChat) {
      socketRef.current.on("connect", () => {
        console.log("Connected to server");
        socketRef.current.emit("join", { conversationId: activeChat._id });
      });

      socketRef.current.on("message", (data) => {
        setMessages((prevMessages) => [...prevMessages, data]);
      });
    }
  }, [activeChat]);

  return (
    <div className="wrapper" style={{ marginTop: "-100px" }}>
      <div className="container-message">
        <div className="left">
          <div className="top">
            <div className="d-flex justify-content-between align-items-center gap-2">
              <input
                type="text"
                placeholder="Search"
                className="form-control py-4"
              />
              <IconButton
                effect="jaques"
                // icon={Icons.PersonSearchIcon}
                bg={1}
              />
            </div>
          </div>
          <ul className="people">
            {messages?.map((data, index) => (
              <React.Fragment key={index + Math.random()}>
                {data?.participants?.map((part, i) => (
                  <React.Fragment key={index * i + Math.random()}>
                    {user?._id !== part._id && (
                      <li
                        className={`person ${
                          activeChat?._id === data?._id ? "active" : ""
                        }`}
                        onClick={() => setActiveChat(data)}
                      >
                        <img
                          src={part?.personal?.image || User}
                          alt=""
                          className=" object-fit-cover"
                        />
                        <span className="name">{part?.name}</span>
                        <span className="time">
                          {formatTime(data.updatedAt)}
                        </span>
                        <span className="preview">
                          {data?.messages[data?.messages?.length - 1 || 0]
                            ?.text || ""}
                        </span>
                      </li>
                    )}
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
          </ul>
        </div>
        <div className="right">
          {activeChat ? (
            <React.Fragment>
              <div className="top">
                <span>
                  To:{" "}
                  {activeChat?.participants?.map((data, index) => (
                    <React.Fragment key={index}>
                      {data?._id !== user?._id && (
                        <span className="name">{data?.name}</span>
                      )}
                    </React.Fragment>
                  ))}
                </span>
              </div>
              <div className="chat">
                {activeChat.messages.map((data, index) => {
                  const prevMessage = activeChat.messages[index - 1];
                  const isConversationStart =
                    !prevMessage ||
                    Math.abs(data.createdAt - prevMessage.createdAt) >
                      5 * 60 * 1000; // 5 minutes in milliseconds

                  return (
                    <div key={index} className="h-chat" ref={lastMessageRef}>
                      {isConversationStart && (
                        <div className="conversation-start">
                          <span>{formatTime(data.createdAt)}</span>
                        </div>
                      )}
                      <div
                        className={`bubble ${
                          data.sender === user?._id ? "me" : "you"
                        }`}
                      >
                        {data.text}
                        {data.state === "error" && (
                          <ErrorOutlineIcon fontSize="10" color="red" />
                        )}
                        {data.state === "sending" && (
                          <AccessTimeIcon fontSize="10" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="write">
                <div className="d-flex gap-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Message.."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <button className="btn  btn-primary" onClick={sendMessage}>
                    Send
                  </button>
                </div>
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div className="no-chat">
                <h5 style={{ color: "primary" }}>No active chat</h5>
                <p>Click on a chat to start the conversation</p>
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

function Chat() {}

export default Message;
