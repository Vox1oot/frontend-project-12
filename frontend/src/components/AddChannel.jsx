import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import { useTranslation } from 'react-i18next';
import { useSocketContext } from '../hooks/index.js';

import { channelSchema } from '../schemas/index.js';
import isExistsChannelName from '../utils/isExistsChannelName.js';

import toastSuccess from '../toasts/index.js';

import unlockElementWithDelay from '../utils/unlockElementWithDelay.js';

const AddChannel = () => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState();
  const { channels } = useSelector((state) => state.channels);
  const { addNewChannel } = useSocketContext();

  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    validationSchema: channelSchema,
    onSubmit: ({ channelName }, actions) => {
      const resolve = () => {
        setShowModal(!showModal);
        formik.resetForm();
        toastSuccess(t('toasts.add'));
      };

      if (isExistsChannelName(channels, channelName)) {
        actions.setFieldError('channelName', 'uniq');
        return;
      }

      addNewChannel({ name: channelName }, resolve);
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
      <Button variant="outline-success" size="sm" onClick={toggleModal}>
        +
      </Button>
      <Modal show={showModal} onHide={toggleModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{t('channels.addChannel')}</Modal.Title>
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
                disabled={formik.isSubmitting}
              />
              <Form.Label className="visually-hidden" htmlFor="channelName">Имя канала</Form.Label>
            </Form.Group>
            <Alert show={!!formik.errors.channelName} variant="danger">{formik.errors.channelName && t(`errors.${formik.errors.channelName}`)}</Alert>
          </Modal.Body>
          <Modal.Footer>
            <Button type="button" variant="secondary" onClick={toggleModal} disabled={formik.isSubmitting}>
              {t('buttons.cancel')}
            </Button>
            <Button type="submit" variant="primary" disabled={!formik.isValid || formik.isSubmitting}>
              {t('buttons.send')}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default AddChannel;
