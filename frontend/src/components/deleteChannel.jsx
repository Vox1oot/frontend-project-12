import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Dropdown } from 'react-bootstrap';

export const DeleteChannel = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  return (
    <>
    <Dropdown.Item eventKey="1" onClick={toggleModal}>
        Удалить
    </Dropdown.Item>

      <Modal show={showModal} onHide={toggleModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Удалить канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>Вы уверены ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleModal}>
            Отменить
          </Button>
          <Button variant="danger" onClick={() => console.log('Удаляем!')}>
            Удалить
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}