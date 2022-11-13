import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { Dropdown } from 'react-bootstrap';

import { useTranslation } from 'react-i18next';
import { channelSchema } from '../schemas/index.js';

import isExistsChannelName from '../utils/isExistsChannelName.js';

import { toastInfo } from '../toasts/index.js';

import unlockElementWithDelay from '../utils/unlockElementWithDelay.js';

const RenameChannel = ({ socket, id }) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const { channels } = useSelector((state) => state.channels);

  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    validationSchema: channelSchema,
    onSubmit: ({ channelName }, actions) => {
      if (isExistsChannelName(channels, channelName)) {
        actions.setFieldError('channelName', 'uniq');
      } else {
        socket.emit('renameChannel', { id, name: channelName }, ({ status }) => {
          if (status) {
            setShowModal(!showModal);
            formik.resetForm();
            toastInfo(t('toasts.rename'));
          }
        });
      }
    },
  });

  const toggleModal = () => {
    formik.resetForm();
    setShowModal(!showModal);
  };

  useEffect(() => {
    if (formik.isSubmitting) {
      const toggle = unlockElementWithDelay(formik.setSubmitting, 3000);
      toggle(false);
    }
  }, [formik.isSubmitting, formik.setSubmitting]);

  return (
    <>
      <Dropdown.Item eventKey="2" onClick={toggleModal}>
        {t('buttons.rename')}
      </Dropdown.Item>
      <Modal show={showModal} onHide={toggleModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{t('channels.renameChannel')}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Control
                className={formik.errors.channelName && 'form-control is-invalid'}
                id="channelName"
                type="text"
                value={formik.values.channelName}
                placeholder={t('channels.typeChannelName')}
                autoComplete="off"
                autoFocus
                onChange={formik.handleChange}
              />
              <Form.Label className="visually-hidden" htmlFor="channelName">Имя канала</Form.Label>
            </Form.Group>
            <Alert show={!!formik.errors.channelName} variant="danger">{formik.errors.channelName && t(`errors.${formik.errors.channelName}`)}</Alert>
          </Modal.Body>
          <Modal.Footer>
            <Button type="button" variant="secondary" onClick={toggleModal} disabled={formik.isSubmitting}>
              {t('buttons.cancel')}
            </Button>
            <Button type="submit" variant="danger" disabled={!formik.isValid || formik.isSubmitting}>
              {t('buttons.rename')}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default RenameChannel;
