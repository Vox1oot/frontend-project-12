import { Form, InputGroup, Button } from 'react-bootstrap';
import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { channelIdSelector } from '../../../redux/slices/channelsSlice.js';
import { useSocketContext, useAuthContext } from '../../../context/index.js';
import unlockElementWithDelay from '../../../utils/unlockElementWithDelay.js';

const InputMessage = () => {
  const { t } = useTranslation();
  const [message, setMessage] = useState('');
  const [isSend, setSend] = useState(false);
  const channelId = useSelector(channelIdSelector);
  const { addNewMessage } = useSocketContext();
  const useAuth = useAuthContext();
  const input = useRef();

  const { username } = useAuth.data;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSend(true);

    const resolve = () => {
      setMessage('');
      setSend(false);
    };

    const body = filter.clean(message);
    const props = { body, channelId, username };
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
