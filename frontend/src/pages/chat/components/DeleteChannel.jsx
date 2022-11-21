import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { openModal, setPayload } from '../../../redux/slices/modalSlice.js';

const DeleteChannel = ({ id }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const showModal = () => {
    dispatch(openModal('remove'));
    dispatch(setPayload(id));
  };

  return (
    <Dropdown.Item eventKey="1" onClick={showModal}>
      {t('buttons.delete')}
    </Dropdown.Item>
  );
};

export default DeleteChannel;
