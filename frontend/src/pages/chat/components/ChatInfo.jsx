import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { channelsSelector, channelIdSelector } from '../../../redux/slices/channelsSlice.js';
import { messagesSelector } from '../../../redux/slices/messagesSlice.js';

const ChatInfo = () => {
  const { t } = useTranslation();
  const channels = useSelector(channelsSelector);
  const currentChannelId = useSelector(channelIdSelector);
  const messages = useSelector(messagesSelector);
  const channel = channels.find(({ id }) => id === currentChannelId);

  const countMessages = messages.filter(({ channelId }) => channelId === currentChannelId).length;

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>{channel ? `# ${channel.name}` : ''}</b>
      </p>
      <span className="text-muted">{`${t('message.message', { count: countMessages })}`}</span>
    </div>
  );
};

export default ChatInfo;
