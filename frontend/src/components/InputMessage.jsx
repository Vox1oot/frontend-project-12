import { Form, InputGroup, Button } from 'react-bootstrap';
import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';

import useAuthContext from '../hooks/index.jsx';

const InputMessage = ({ socket }) => {
  const [message, setMessage] = useState('');
  const channelId = useSelector((state) => state.channels.currentChannelId);
  const useAuth = useAuthContext();
  const input = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    socket.emit('newMessage', { 
      body: message, 
      channelId,
      username: useAuth.data.username,
    }, (response) => {
      if (response.status === 'ok') {
        setMessage('');
        input.current.focus();
      }
    });
  };

  const handleMessage = (e) => {
    const text = e.target.value;
    setMessage(text);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
          <Form.Control
            ref={input}
            type="text"
            onChange={handleMessage}
            value={message}
            placeholder="Введите сообщение"
            autoFocus
          />
          <Button type="submit" variant="primary">
            Отправить
          </Button>
        </InputGroup>
      </Form.Group>
    </Form>
  );
};

export default InputMessage;
