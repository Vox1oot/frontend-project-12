import { useSelector } from 'react-redux';

//import Toast from 'react-bootstrap/Toast';

const Messages = () => {
  const currentChannelID = useSelector(
    (state) => state.channels.currentChannelId
  );
  const messages = useSelector((state) => state.messages);

  return messages
    .filter(({ channelId }) => channelId === currentChannelID)
    .map((message, index) => (
      <div className="text-break mb-2" key={index}>
        <div>
          <div className='d-inline-block shadow p-3 bg-body rounded'>
            <b>{message.username}:</b>
            <span className="message ms-2">{message.body}</span>
          </div>
        </div>
      </div>
    ));
};

export default Messages;
