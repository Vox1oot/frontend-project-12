import { useSelector } from 'react-redux';

const Messages = () => {
  const messages = useSelector((state) => state.messages);

  return (
    messages.map((message, index) => (
      <div className='text-break mb-2' key={index}>
        <b>{`${message.username}: `}</b>
        {message.body}
      </div>
    ))
  )
};

export default Messages;