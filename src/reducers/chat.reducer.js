//  Dependencies
import _ from 'lodash';

// Action Types
import {CHAT_ADD_COMMIT, FETCH_CHAT_COMMITS} from '../actionTypes';

const initialState = {
  commits: [],
  emitter: {
    name: 'Rick',
    lastname: 'Sánchez',
    avatar: 'https://res.cloudinary.com/miyoexcellent/image/upload/v1568494018/InterWare/rick_bxyzml.png',
    backgroundImage: 'https://res.cloudinary.com/miyoexcellent/image/upload/v1568505450/InterWare/rick_morty_bg_jbt0ju.png',
    status: 'active',
    location: 'Trabajando remoto',
  },
  isFetching: false
};

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CHAT_COMMITS:
      return {
        ...state,
        commits: action.payload
      };

    case CHAT_ADD_COMMIT:
      let commits = state.commits;
      commits = _.union(action.payload, commits);
      return {...state, commits};

    default:
      return state;
  }
}
