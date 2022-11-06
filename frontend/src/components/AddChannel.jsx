import { useState } from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';

import { useTranslation } from 'react-i18next';

import { channelSchema } from '../schemas/index.js';
import isExistsChannelName from '../utils/isExistsChannelName.js';

const AddChannel = ({ socket }) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState();
  const { channels } = useSelector((state) => state.channels);

  const toggleModal = () => {
    resetForm();
    return setShowModal(!showModal);
  }

  const { values, handleChange, handleSubmit, errors, isValid, resetForm } = useFormik({
    initialValues: {
      channelName: '',
    },
    validationSchema: channelSchema,
    onSubmit: ({ channelName }, actions ) => {
      if (isExistsChannelName(channels, channelName)) {
        actions.setFieldError('channelName', 'uniq');
      } else {
        socket.emit('newChannel', { name: channelName });
        toggleModal();
      }
    }
  })

  return (
    <>
      <Button variant="outline-success" size="sm" onClick={toggleModal}>
        +
      </Button>
      <Modal show={showModal} onHide={toggleModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{t('channels.addChannel')}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3" >
              <Form.Control
                className={ errors.channelName && 'form-control is-invalid' }
                id="channelName"
                type="text"
                value={values.channelName}
                placeholder={t('channels.typeChannelName')}
                autoComplete="off"
                autoFocus
                onChange={handleChange}
                />
            </Form.Group>
            <Alert show={ !!errors.channelName } variant='danger'>{errors.channelName && t(`errors.${errors.channelName}`)}</Alert>
          </Modal.Body>
          <Modal.Footer>
            <Button type="button" variant="secondary" onClick={toggleModal}>
            {t('buttons.cancel')}
            </Button>
            <Button type="submit" variant="success" disabled={!isValid}>
            {t('buttons.add')}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default AddChannel;
