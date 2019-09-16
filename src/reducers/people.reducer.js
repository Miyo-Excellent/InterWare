// Action Types
import {} from '../actionTypes';

const initialState = {
  users: [
    {
      active: true,
      name: 'Bender',
      avatar: 'https://res.cloudinary.com/miyoexcellent/image/upload/v1568493908/InterWare/bender_ubdfej.png',
      backgroundImage: 'https://res.cloudinary.com/miyoexcellent/image/upload/v1568505752/InterWare/futurama_bg_oja2ii.png',
      status: 'active'
    },
    {
      active: false,
      name: 'Rick',
      avatar: 'https://res.cloudinary.com/miyoexcellent/image/upload/v1568494018/InterWare/rick_bxyzml.png',
      backgroundImage: 'https://res.cloudinary.com/miyoexcellent/image/upload/v1568505450/InterWare/rick_morty_bg_jbt0ju.png',
      status: 'inactive'
    },
    {
      active: true,
      name: 'Finn',
      avatar: 'https://res.cloudinary.com/miyoexcellent/image/upload/v1568493909/InterWare/finn_ayiwm4.png',
      backgroundImage: 'https://res.cloudinary.com/miyoexcellent/image/upload/v1568505697/InterWare/adventure_time_bg_pigxya.png',
      status: 'sleep'
    },
    {
      active: false,
      name: 'Jake',
      avatar: 'https://res.cloudinary.com/miyoexcellent/image/upload/v1568493908/InterWare/jake_ro6sam.png',
      backgroundImage: 'https://res.cloudinary.com/miyoexcellent/image/upload/v1568505697/InterWare/adventure_time_bg_pigxya.png',
      status: 'inactive'
    },
  ]
};

export default function peoplesReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
