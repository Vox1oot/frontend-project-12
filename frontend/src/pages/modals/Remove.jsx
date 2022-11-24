import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
import { useSocketContext } from '../../context/index.js';
import { toastWarning } from '../toasts/index.js';
import unlockElementWithDelay from '../../utils/unlockElementWithDelay.js';
import { modalSelector, closeModal } from '../../redux/slices/modalSlice.js';

const Remove = () => {
  const { t } = useTranslation();
  const [isSubmitting, setSubmitting] = useState(false);
  const { removeChannel } = useSocketContext();
  const { isShowing, payload } = useSelector(modalSelector);
  const dispatch = useDispatch();

  const deleteChannel = () => {
    setSubmitting(true);

    const resolve = () => {
      toastWarning(t('toasts.delete'));
      dispatch(closeModal());
    };

    removeChannel({ id: payload }, resolve);
  };

  const close = () => {
    dispatch(closeModal());
  };

  useEffect(() => {
    if (isSubmitting) {
      const toggle = unlockElementWithDelay(setSubmitting, 3000);
      toggle(false);
    }
  }, [isSubmitting]);

  return (
    <Modal show={isShowing} onHide={close} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('channels.delete')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{t('questions.areYouSure')}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={close} disabled={isSubmitting}>
          {t('buttons.cancel')}
        </Button>
        <Button variant="danger" onClick={deleteChannel} disabled={isSubmitting}>
          {t('buttons.delete')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Remove;
