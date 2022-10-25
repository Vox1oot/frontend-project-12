import { useEffect } from "react";
import { useState } from "react";
import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";

const Channels = () => {
  const { channels, currentChannelId } = useSelector((state) => state.channels);
  const [id, setID] = useState(null);

  console.log(channels);
  console.log(currentChannelId);

  const handleActiveChannel = (e) => {
    setID(Number(e.target.id));
  };

  useEffect(() => {
    setID(currentChannelId);
  }, [currentChannelId])

  return (
    <ListGroup>
      {channels.map((channel, index) => (
        <ListGroup.Item
          id={channel.id}
          key={index}
          onClick={handleActiveChannel}
          action="true"
          active={id == channel.id}
        >
          {channel.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );

};

export default Channels;
