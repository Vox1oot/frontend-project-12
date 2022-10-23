import useAuth from '../hooks/index.jsx';
import axios from 'axios';

const getChannelsAndMessages = async (token) => {
  const response = await axios.get('/api/v1/data', {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  })

  console.log(response.data);
}

const Chat = () => {
  const auth = useAuth();
  const { token } = auth.userData;
  getChannelsAndMessages(token);

  return (
    <div>
      Chat
    </div>
  )
};

export default Chat;