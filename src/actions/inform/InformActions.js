import * as informConstants from "../../constants/InformConstants";

/* INFORM */
export function informClose() {
  return {
    type: informConstants.INFORM_CLOSE
  };
}
export function informOpen(messages) {
  return {
    type: informConstants.INFORM_OPEN,
    messages
  };
}
