import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Dropdown } from 'react-bootstrap';

import { useTranslation } from 'react-i18next';

export const DeleteChannel = ({ socket, id }) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  const deleteChannel = () => {
    setSubmitting(true);

    socket.emit('removeChannel', { id }, (response) => {
      if (response.status === 'ok') {
        setSubmitting(false);
        toggleModal();
      }
    });
  };

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
          <Button variant="secondary" onClick={toggleModal}>
            {t('buttons.cancel')}
          </Button>
          <Button variant="danger" onClick={deleteChannel} disabled={isSubmitting}>
            {t('buttons.delete')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}