import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const ChatInfo = () => {
  const { t } = useTranslation();
  const { channels, currentChannelId } = useSelector((state) => state.channels);
  const messages = useSelector((state) => state.messages);
  const channel = channels.find(({ id }) => id === currentChannelId);

  const countMessages = messages.filter(({ channelId }) => channelId === currentChannelId).length;

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>{channel ? `# ${channel.name}` : ''}</b>
      </p>
      <span className="text-muted">{`${countMessages} ${t('messages')}`}</span>
    </div>
  );
};

export default ChatInfo;
