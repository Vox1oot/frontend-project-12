import useAuth from '../hooks/index.jsx';

const Chat = () => {
  const auth = useAuth();

  console.log(auth.userData);

  return (
    <div>
      Chat
    </div>
  )
};

export default Chat;