import Add from './Add';
import Rename from './Rename';
import Remove from './Remove';

const modals = {
  adding: Add,
  rename: Rename,
  remove: Remove,
};

export default (modalType) => modals[modalType];
