import { useSelector } from 'react-redux';

const Messages = () => {
  const currentChannelID = useSelector((state) => state.channels.currentChannelId);
  const messages = useSelector((state) => state.messages);
  
  return (
    messages
      .filter(({ channelId }) => channelId === currentChannelID)
      .map((message, index) => (
      <div className='text-break mb-2' key={index}>
        <b>{`${message.username}: `}</b>
        {message.body}
      </div>
    ))
  )
};

export default Messages;