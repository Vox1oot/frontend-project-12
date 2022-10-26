import { Form, InputGroup, Button } from 'react-bootstrap';
import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';

const InputMessage = ({ socket, username }) => {
  const [message, setMessage] = useState('');

  const channelId = useSelector((state) => state.channels.currentChannelId);

  const input = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    socket.emit('newMessage', { 
      body: message, 
      channelId,
      username,
    });
    
    setMessage('');
    input.current.focus();
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
