import { useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import { changeChannel } from '../redux/slices/channelsSlice.js';

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
    <ListGroup>
      {channels.map((channel, index) => (
        <ListGroup.Item
          id={channel.id}
          key={index}
          onClick={handleActiveChannel}
          action="true"
          active={currentChannelId == channel.id}
        >
          <span># </span>
          {channel.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );

};

export default Channels;
