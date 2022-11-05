import { Form, InputGroup, Button } from 'react-bootstrap';
import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';

import useAuthContext from '../hooks/index.jsx';

const InputMessage = ({ socket }) => {
  const { t } = useTranslation();
  const [message, setMessage] = useState('');
  const [isSend, setSend] = useState(false);

  const channelId = useSelector((state) => state.channels.currentChannelId);
  const useAuth = useAuthContext();
  const input = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSend(true);

    socket.emit('newMessage', { 
      body: message, 
      channelId,
      username: useAuth.data.username,
    }, (response) => {
      if (response.status === 'ok') {
        setMessage('');
        setSend(false)
      }
    });
  };

   const handleMessage = (e) => {
    const text = e.target.value;
    setMessage(text);
  };

  useEffect(() => {
    input.current.focus();
  })

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
          <Form.Control
            id="message"
            ref={input}
            type="text"
            onChange={handleMessage}
            value={message}
            placeholder={t('typeMessage')}
            autoFocus
            required
            disabled={isSend}
            autoComplete="off"
          />
          <Button type="submit" variant="primary" disabled={isSend}>
          {t('buttons.send')}
          </Button>
        </InputGroup>
      </Form.Group>
    </Form>
  );
};

export default InputMessage;
