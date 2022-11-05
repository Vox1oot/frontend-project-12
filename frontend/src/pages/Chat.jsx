import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useAuthContext from '../hooks/index.jsx';
import fetchAuthorizationData from '../redux/thunk.js';

import InputMessages from '../components/InputMessage';
import Channels from "../components/Channels.jsx";
import ChatInfo from "../components/ChatInfo.jsx";
import Messages from "../components/Messages.jsx";
import AddChannel from "../components/AddChannel";

import Nav from '../components/Nav';

import { useTranslation } from 'react-i18next';

import { addMessage } from "../redux/slices/messagesSlice.js";
import { addChannel, deleteChannel, renameChannel } from "../redux/slices/channelsSlice.js";


const Chat = ({ socket }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { data }= useAuthContext();

  socket.removeAllListeners();

  socket.on('newMessage', (payload) => {
    dispatch(addMessage(payload));
  });

  socket.on('newChannel', (payload) => {
    dispatch(addChannel(payload));
  });

  socket.on('removeChannel', (payload) => {
    dispatch(deleteChannel(payload));
  });

  socket.on('renameChannel', (payload) => {
    dispatch(renameChannel(payload));
  });

  useEffect(() => {
    const { token } = data;
    dispatch(fetchAuthorizationData(token));
  }, [data, dispatch]);

  return (
    <>
      <Nav button={true}/>
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
          <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
            <span>{t('channels.channels')}</span>
            <AddChannel socket={socket} />
          </div>
          <ul className="nav flex-column nav-pills nav-fill px-2">
            <Channels socket={socket} />
          </ul>
        </div>
        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <ChatInfo />
            <div id="messages-box" className="chat-messages overflow-auto px-5 ">
              <Messages />
            </div>
            <div className="mt-auto px-5 py-3">
              <InputMessages socket={socket} />
            </div>
          </div>
        </div>
      </div>
    </div>
    </>

  )
};

export default Chat;