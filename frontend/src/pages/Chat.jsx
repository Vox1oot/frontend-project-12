import { useEffect } from "react";
import {useSelector, useDispatch } from "react-redux";
import useAuth from '../hooks/index.jsx';
import fetchAuthorizationData from '../redux/thunk.js';

const Chat = () => {
  const channels = useSelector((state) => state.channels);
  const messages = useSelector((state) => state.messages);
  const dispatch = useDispatch();
  const auth = useAuth();

  useEffect(() => {
    const { token } = auth.userData;
    dispatch(fetchAuthorizationData(token))
  }, [auth.userData, dispatch]);

  console.log(channels);
  console.log(messages);
  return (
    <div>
      Chat
    </div>
  )
};

export default Chat;