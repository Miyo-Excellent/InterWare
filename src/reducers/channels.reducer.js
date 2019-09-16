// Action Types
import {} from '../actionTypes';

const initialState = {
  data: [
    {name: 'Channel 1'},
    {name: 'Channel 2'},
    {name: 'Channel 3'},
    {name: 'Channel 4'},
  ]
};

export default function channelsReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
