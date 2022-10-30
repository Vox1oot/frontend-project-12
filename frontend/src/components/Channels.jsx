import React, { useEffect } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
//import { ListGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import { changeChannel } from '../redux/slices/channelsSlice.js';

import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

const Channels = () => {
  const { channels, currentChannelId } = useSelector((state) => state.channels);
  const dispatch = useDispatch();

  const handleActiveChannel = (e) => {
    dispatch(changeChannel(Number(e.target.id)));
  };

  useEffect(() => {
    dispatch(changeChannel(currentChannelId));
  }, [dispatch, currentChannelId]) // currentChannelId render twice 

  return (
    channels.map((channel, index) => (
      <ButtonGroup key={index}>

        <Button
          className='btn-channel'
          variant="light" 
          id={channel.id} 
          active={currentChannelId == channel.id}
          onClick={handleActiveChannel}
        >
        {`# ${channel.name}`}
        </Button>

        {channel.removable && 
        <DropdownButton as={ButtonGroup} title="" id="bg-nested-dropdown" variant="light">
          <Dropdown.Item eventKey="1">Удалить</Dropdown.Item>
          <Dropdown.Item eventKey="2">Переименовать</Dropdown.Item>
        </DropdownButton>}

      </ButtonGroup>
    ))
  );

};

export default Channels;
