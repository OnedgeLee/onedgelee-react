import * as informConstants from "../../constants/InformConstants";
import update from "immutability-helper";

export function informReducer(
  state = {
    inform: {
      open: false,
      messages: []
    }
  },
  action
) {
  switch (action.type) {
    case informConstants.INFORM_CLOSE:
      return update(state, {
        inform: {
          open: { $set: false },
          messages: { $set: [] }
        }
      });
    case informConstants.INFORM_OPEN:
      return update(state, {
        inform: {
          open: { $set: true },
          messages: { $set: action.messages }
        }
      });
    default:
      return state;
  }
}
