import { useSelector } from 'react-redux';

const Messages = () => {
  const currentChannelID = useSelector((state) => state.channels.currentChannelId);
  const messages = useSelector((state) => state.messages);
  
  return (
    messages
      .filter(({ channelId }) => channelId === currentChannelID)
      .map((message, index) => (
      <div className='text-break mb-2 ' key={index}>
        <div>
          <b>{`${message.username}: `}</b>
        </div>
        <div className='message'>
          {message.body}
        </div>
      </div>
    ))
)};

export default Messages;