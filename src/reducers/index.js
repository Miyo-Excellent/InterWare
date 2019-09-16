// Dependencies
import {combineReducers} from 'redux';

//  Reducers
import chat from './chat.reducer';
import channels from './channels.reducer';
import favorites from './favorites.reducer';
import people from './people.reducer';
import recent from './recent.reducer';
import user from './user.reducer';

export default combineReducers({
  chat,
  channels,
  favorites,
  people,
  recent,
  user
});
