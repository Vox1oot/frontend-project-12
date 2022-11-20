import React, { useEffect } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import Dropdown from 'react-bootstrap/Dropdown';
import { changeChannel } from '../../../redux/slices/channelsSlice.js';
import DeleteChannel from './DeleteChannel.jsx';
import RenameChannel from './RenameChannel.jsx';

const Channels = ({ socket }) => {
  const { channels, currentChannelId } = useSelector((state) => state.channels);
  const dispatch = useDispatch();

  const handleActiveChannel = (e) => {
    dispatch(changeChannel(Number(e.target.id)));
  };

  useEffect(() => {
    dispatch(changeChannel(currentChannelId));
  }, [dispatch, currentChannelId]);

  return (
    channels.map((channel, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <li className="nav-item w-100" key={index}>
        <Dropdown className="w-100" as={ButtonGroup}>
          <Button
            className="w-100 br-0 btn-channel text-truncate text-start"
            variant="light"
            id={channel.id}
            active={currentChannelId === channel.id}
            onClick={handleActiveChannel}
          >
            <span className="me-1">#</span>
            {channel.name}
          </Button>

          {channel.removable
        && (
        <Dropdown.Toggle className="br-0" split variant="light" id="dropdown-split-basic">
          <span className="visually-hidden">Управление каналом</span>
        </Dropdown.Toggle>
        )}

          <Dropdown.Menu>
            <DeleteChannel socket={socket} id={channel.id} />
            <RenameChannel socket={socket} id={channel.id} />
          </Dropdown.Menu>
        </Dropdown>
      </li>
    ))
  );
};

export default Channels;