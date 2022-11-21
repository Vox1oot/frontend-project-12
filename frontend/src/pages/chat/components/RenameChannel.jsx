import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { openModal, setPayload } from '../../../redux/slices/modalSlice.js';

const RenameChannel = ({ id }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const showModal = () => {
    dispatch(openModal('rename'));
    dispatch(setPayload(id));
  };

  return (
    <Dropdown.Item eventKey="2" onClick={showModal}>
      {t('buttons.rename')}
    </Dropdown.Item>
  );
};

export default RenameChannel;
