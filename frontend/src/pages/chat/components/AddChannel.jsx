import React from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { openModal } from '../../../redux/slices/modalSlice.js';

const AddChannel = () => {
  const dispatch = useDispatch();

  const showModal = () => {
    dispatch(openModal('adding'));
  };

  return (
    <Button variant="outline-success" size="sm" onClick={showModal}>+</Button>
  );
};

export default AddChannel;
