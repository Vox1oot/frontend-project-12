import React, { useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

const AddToast = () => {
  const [show, setShow] = useState(true);

  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast onClose={() => setShow(!show)} show={show} delay={4000} autohide bg="success">
        <Toast.Body className="text-white">
          <strong className="me-auto">Канал создан</strong><br />
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default AddToast;
