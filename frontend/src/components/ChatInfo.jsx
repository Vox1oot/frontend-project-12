import { useSelector } from 'react-redux';

const ChatInfo = () => {
  const { channels, currentChannelId } = useSelector((state) => state.channels);
  const channel = channels.find((channel) => channel.id == currentChannelId);

  console.log(channel);

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>{channel ? channel.name : ''}</b>
      </p>
      <span className="text-muted">0 сообщений</span>
    </div>
  );
};

export default ChatInfo;
