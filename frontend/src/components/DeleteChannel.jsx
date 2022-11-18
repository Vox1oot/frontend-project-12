import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Dropdown } from 'react-bootstrap';

import { useTranslation } from 'react-i18next';
import { useSocketContext } from '../hooks/index.js';

import { toastWarning } from '../toasts/index.js';

import unlockElementWithDelay from '../utils/unlockElementWithDelay.js';

const DeleteChannel = ({ id }) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const { removeChannel } = useSocketContext();

  const toggleModal = () => setShowModal(!showModal);

  const deleteChannel = () => {
    setSubmitting(true);

    const resolve = () => {
      toastWarning(t('toasts.delete'));
      setSubmitting(false);
      toggleModal();
    };

    removeChannel({ id }, resolve);
  };

  useEffect(() => {
    if (isSubmitting) {
      const toggle = unlockElementWithDelay(setSubmitting, 3000);
      toggle(false);
    }
  }, [isSubmitting]);

  return (
    <>
      <Dropdown.Item eventKey="1" onClick={toggleModal}>
        {t('buttons.delete')}
      </Dropdown.Item>

      <Modal show={showModal} onHide={toggleModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{t('channels.delete')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{t('questions.areYouSure')}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleModal} disabled={isSubmitting}>
            {t('buttons.cancel')}
          </Button>
          <Button variant="danger" onClick={deleteChannel} disabled={isSubmitting}>
            {t('buttons.delete')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteChannel;
