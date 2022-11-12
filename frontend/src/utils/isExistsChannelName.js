const isExistsChannelName = (channels, channelName) => channels
  .find((channel) => channel.name === channelName);
export default isExistsChannelName;
