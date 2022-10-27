import { useSelector } from 'react-redux';

const ChatInfo = () => {
  const { channels, currentChannelId } = useSelector((state) => state.channels);
  const messages = useSelector((state) => state.messages);
  const channel = channels.find((channel) => channel.id == currentChannelId);

  const countMessages = messages.filter(({ channelId }) => channelId === currentChannelId).length;

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>{channel ? `# ${channel.name}` : ''}</b>
      </p>
      <span className="text-muted">{`${countMessages} сообщений`}</span> 
    </div>
  );
};

export default ChatInfo;
