import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { useTranslation } from 'react-i18next';
import { channelSchema } from '../../schemas/index.js';
import { useSocketContext } from '../../context/index.js';
import isExistsChannelName from '../../utils/isExistsChannelName.js';
import { channelsSelector } from '../../redux/slices/channelsSlice.js';
import { modalSelector, closeModal } from '../../redux/slices/modalSlice.js';
import { toastInfo } from '../toasts/index.js';

import unlockElementWithDelay from '../../utils/unlockElementWithDelay.js';

const Rename = () => {
  const { t } = useTranslation();
  const channels = useSelector(channelsSelector);
  const { isShowing, payload } = useSelector(modalSelector);
  const { renameChannelName } = useSocketContext();
  const dispatch = useDispatch();
  const input = useRef();

  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    validationSchema: channelSchema,
    onSubmit: ({ channelName }, actions) => {
      const resolve = () => {
        formik.resetForm();
        toastInfo(t('toasts.rename'));
        dispatch(closeModal());
      };

      if (isExistsChannelName(channels, channelName)) {
        actions.setFieldError('channelName', 'uniq');
        return;
      }

      renameChannelName({ id: payload, name: channelName }, resolve);
    },
  });

  const close = () => {
    formik.resetForm();
    dispatch(closeModal());
  };

  useEffect(() => {
    if (formik.isSubmitting) {
      const toggle = unlockElementWithDelay(formik.setSubmitting, 3000);
      toggle(false);
    }

    setTimeout(() => input.current.focus(), 1);
  }, [formik.isSubmitting, formik.setSubmitting]);

  return (
    <Modal show={isShowing} onHide={close} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('channels.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Control
              ref={input}
              className={formik.errors.channelName && 'form-control is-invalid'}
              id="channelName"
              type="text"
              value={formik.values.channelName}
              placeholder={t('channels.typeChannelName')}
              autoComplete="off"
              onChange={formik.handleChange}
            />
            <Form.Label className="visually-hidden" htmlFor="channelName">Имя канала</Form.Label>
          </Form.Group>
          <Alert show={!!formik.errors.channelName} variant="danger">{formik.errors.channelName && t(`errors.${formik.errors.channelName}`)}</Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" variant="secondary" onClick={close} disabled={formik.isSubmitting}>
            {t('buttons.cancel')}
          </Button>
          <Button type="submit" variant="danger" disabled={!formik.isValid || formik.isSubmitting}>
            {t('buttons.rename')}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default Rename;
