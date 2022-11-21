export const channelIdSelector = (state) => state.channels.currentChannelId;
export const messagesSelector = (state) => state.messages;
export const modalSelector = (state) => state.modal;
export default (state) => state.channels.channels;
