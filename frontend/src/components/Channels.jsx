import React, { useEffect } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import { changeChannel } from '../redux/slices/channelsSlice.js';
import { DeleteChannel } from "./DeleteChannel.jsx";
import { RenameChannel } from "./RenameChannel.jsx";

import DropdownButton from 'react-bootstrap/DropdownButton';

const Channels = ({ socket }) => {
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
      <ButtonGroup className="w-100" key={index}>

        <Button
          className='btn-channel text-truncate text-start'
          variant="light" 
          id={channel.id} 
          active={currentChannelId == channel.id}
          onClick={handleActiveChannel}
        >
        {`# ${channel.name}`}
        </Button>

        {channel.removable && 
        <DropdownButton  as={ButtonGroup} title="" id="bg-nested-dropdown" variant="light">
          <DeleteChannel socket={socket} id={channel.id} />
          <RenameChannel socket={socket} id={channel.id} />
        </DropdownButton>}

      </ButtonGroup>
    ))
  );

};

export default Channels;
