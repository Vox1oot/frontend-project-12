import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useAuthContext from '../hooks/index.jsx';
import fetchAuthorizationData from '../redux/thunk.js';

import InputMessages from '../components/InputMessage';
import Channels from "../components/Channels.jsx";
import ChatInfo from "../components/ChatInfo.jsx";
import Messages from "../components/Messages.jsx";
import { addMessage } from "../redux/slices/messagesSlice.js";

import { io } from "socket.io-client";

const socket = io("ws://localhost:3000");

const Chat = () => {
  const dispatch = useDispatch();
  const { data }= useAuthContext();

  useEffect(() => {
    const { token } = data;
    dispatch(fetchAuthorizationData(token));
  }, [data, dispatch]);

  socket.on('newMessage', (payload) => {
    dispatch(addMessage(payload));
  })

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
          <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
            <span>Каналы</span>
            <button className="p-0 text-primary btn btn-group-vertical">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor"><path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path></svg>
            <span className="visually-hidden">+</span>
            </button>
          </div>
          <ul className="nav flex-column nav-pills nav-fill px-2">
            <Channels />
          </ul>
        </div>
        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <ChatInfo />
            <div id="messages-box" className="chat-messages overflow-auto px-5 ">
              <Messages />
            </div>
            <div className="mt-auto px-5 py-3">
              <InputMessages socket={socket}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Chat;