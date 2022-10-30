import { useSelector } from 'react-redux';

import Toast from 'react-bootstrap/Toast';

const Messages = () => {
  const currentChannelID = useSelector(
    (state) => state.channels.currentChannelId
  );
  const messages = useSelector((state) => state.messages);

  return messages
    .filter(({ channelId }) => channelId === currentChannelID)
    .map((message, index) => (
      <Toast className="d-block m-2" key={index}>
        <Toast.Body className="p-2">
          <div>
            <b>{message.username}:</b>
            <span className='message'>{message.body}</span>
          </div>
        </Toast.Body>
      </Toast>
    ));
};

export default Messages;
