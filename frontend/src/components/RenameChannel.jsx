import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';

import { channelSchema } from '../schemas/index.js';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { Dropdown } from 'react-bootstrap';

import isExistsChannelName from '../utils/isExistsChannelName.js';

export const RenameChannel = ({ socket, id }) => {
  const [showModal, setShowModal] = useState(false);
  const { channels } = useSelector((state) => state.channels);

  const toggleModal = () => setShowModal(!showModal);

  const { values, handleChange, handleSubmit, errors, isValid } = useFormik({
    initialValues: {
      channelName: '',
    },
    validationSchema: channelSchema,
    onSubmit: ({ channelName }, actions) => {
      if (isExistsChannelName(channels, channelName)) {
        actions.setFieldError(
          'channelName',
          'Имя канало должно быть уникально!'
        );
      } else {
        socket.emit('renameChannel', { id, name: channelName });
        toggleModal();
      }
    },
  });

  return (
    <>
      <Dropdown.Item eventKey="2" onClick={toggleModal}>
        Переименовать
      </Dropdown.Item>

      <Modal show={showModal} onHide={toggleModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Переименовать канал</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Control
                className={
                  errors.channelName
                    ? 'form-control is-invalid'
                    : 'form-control'
                }
                id="channelName"
                type="text"
                value={values.channelName}
                placeholder="Введите имя канала"
                autoFocus
                onChange={handleChange}
              />
            </Form.Group>
            <Alert show={!!errors.channelName} variant="danger">
              {errors.channelName}
            </Alert>
          </Modal.Body>
          <Modal.Footer>
            <Button type="button" variant="secondary" onClick={toggleModal}>
              Отменить
            </Button>
            <Button type="submit" variant="danger" disabled={!isValid}>
              Переименовать
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
