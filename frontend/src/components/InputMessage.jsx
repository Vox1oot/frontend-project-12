import { Form, InputGroup, Button } from 'react-bootstrap';
import { useState, useRef } from 'react';

const InputMessage = () => {
  const [message, setMessage] = useState();

  const input = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
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
