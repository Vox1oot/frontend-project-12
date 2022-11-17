import { Form, InputGroup, Button } from 'react-bootstrap';
import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';

import filter from 'leo-profanity';
import useAuthContext, { useSocketContext } from '../hooks/index.js';

import unlockElementWithDelay from '../utils/unlockElementWithDelay.js';

const InputMessage = () => {
  const { t } = useTranslation();
  const [message, setMessage] = useState('');
  const [isSend, setSend] = useState(false);

  const addNewMessage = useSocketContext();

  const channelId = useSelector((state) => state.channels.currentChannelId);
  const useAuth = useAuthContext();
  const input = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSend(true);

    const body = filter.clean(message);
    const { username } = useAuth.data;

    const props = { body, channelId, username };

    const resolve = () => {
      setMessage('');
      setSend(false);
    };

    addNewMessage(props, resolve);
  };

  const handleMessage = (e) => {
    const text = e.target.value;
    setMessage(text);
  };

  useEffect(() => {
    if (isSend) {
      const toggle = unlockElementWithDelay(setSend, 3000);
      toggle(false);
    }
    input.current.focus();
  }, [isSend, channelId]);

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
          <Form.Control
            id="message"
            ref={input}
            type="text"
            aria-label="Новое сообщение"
            onChange={handleMessage}
            value={message}
            placeholder={t('typeMessage')}
            autoFocus
            required
            disabled={isSend}
            autoComplete="off"
          />
          <Button id="b-send" type="submit" variant="primary" disabled={isSend}>
            {t('buttons.send')}
          </Button>
        </InputGroup>
      </Form.Group>
    </Form>
  );
};

export default InputMessage;
