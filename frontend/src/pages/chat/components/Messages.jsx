/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { channelIdSelector, messagesSelector } from '../../../redux/selectors.js';

const Messages = () => {
  const currentChannelID = useSelector((state) => channelIdSelector(state));
  const messages = useSelector((state) => messagesSelector(state));

  useEffect(() => {
    const messagesBox = document.getElementById('messages-box');
    const scHeight = messagesBox.scrollHeight;
    messagesBox.scrollTop = scHeight;
  });

  return messages
    .filter(({ channelId }) => channelId === currentChannelID)
    .map((message, index) => (
      <div className="text-break mb-2" key={index}>
        <div>
          <div className="d-inline-block shadow p-3 bg-body rounded">
            <b>
              {message.username}
              :
            </b>
            <span className="message ms-2">{message.body}</span>
          </div>
        </div>
      </div>
    ));
};

export default Messages;
