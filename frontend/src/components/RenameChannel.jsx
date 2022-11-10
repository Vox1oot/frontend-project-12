import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';

import { channelSchema } from '../schemas/index.js';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { Dropdown } from 'react-bootstrap';

import { useTranslation } from 'react-i18next';

import isExistsChannelName from '../utils/isExistsChannelName.js';

import { toastInfo } from '../toasts/index.js';

import unlockElementWithDelay from '../utils/unlockElementWithDelay.js';

export const RenameChannel = ({ socket, id }) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const { channels } = useSelector((state) => state.channels);

  const toggleModal = () => {
    resetForm();
    return setShowModal(!showModal);
  }

  const { values, handleChange, handleSubmit, errors, isValid, resetForm, isSubmitting, setSubmitting } = useFormik({
    initialValues: {
      channelName: '',
    },
    validationSchema: channelSchema,
    onSubmit: ({ channelName }, actions) => {
      if (isExistsChannelName(channels, channelName)) {
        actions.setFieldError('channelName','uniq');
      } else {
        socket.emit('renameChannel', { id, name: channelName }, ({ status }) => {
          if (status) {
            toggleModal();
            toastInfo(t('toasts.rename'));
          }
        });
      }
    },
  });

  useEffect(() => {
    if (isSubmitting) {
      const toggle = unlockElementWithDelay(setSubmitting, 3000);
      toggle(false);
    }
  }, [isSubmitting, setSubmitting]);

  return (
    <>
      <Dropdown.Item eventKey="2" onClick={toggleModal}>
        {t('buttons.rename')}
      </Dropdown.Item>
      <Modal show={showModal} onHide={toggleModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{t('channels.renameChannel')}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Control
                className={errors.channelName && 'form-control is-invalid'}
                id="channelName"
                type="text"
                value={values.channelName}
                placeholder={t('channels.typeChannelName')}
                autoComplete="off"
                autoFocus
                onChange={handleChange}
              />
            </Form.Group>
            <Alert show={!!errors.channelName} variant="danger">{errors.channelName && t(`errors.${errors.channelName}`)}</Alert>
          </Modal.Body>
          <Modal.Footer>
            <Button type="button" variant="secondary" onClick={toggleModal} disabled={isSubmitting}>
            {t('buttons.cancel')}
            </Button>
            <Button type="submit" variant="danger" disabled={!isValid || isSubmitting}>
            {t('buttons.rename')}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
