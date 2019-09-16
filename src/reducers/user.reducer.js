// Action Types
import {} from '../actionTypes';

const initialState = {
  data: {
    name: 'Bender',
    lastname: 'Bending Rodriguez',
    age: 7,
    video: 'https://futurama.fandom.com/wiki/Bender_Bending_Rodr%C3%ADguez?jwsource=cl',
    photo: 'https://res.cloudinary.com/miyoexcellent/image/upload/v1568493908/InterWare/bender_ubdfej.png',
    backgroundImage: 'https://res.cloudinary.com/miyoexcellent/image/upload/v1568505752/InterWare/futurama_bg_oja2ii.png',
    location: 'Trabajando remoto',
    status: 'active'
  },
  isFetching: false
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
