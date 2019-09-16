import {CHAT_ADD_COMMIT} from "../actionTypes";

export default function chatAddCommit({commits = [], dispatch}) {
  dispatch({type: CHAT_ADD_COMMIT, payload: commits});
}
