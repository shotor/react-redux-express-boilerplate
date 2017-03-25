import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  UPDATE_TITLE,
  TOGGLE_UNITS,
  TOGGLE_WIND,
  SAVE_WIDGET,
  DELETE_WIDGET,
  UPDATE_POSITION
} from 'actions/weather-widget-actions';

import uuidV4 from 'uuid/v4'

const initialState = {
  local: 'Loading',
  day: 'unknow',
  degree: '--',
  high: '--',
  low: '--',
  forecast: [],
  units: 'F',
  city: 'Taiwan Taichung',
  title: 'It\'s a Beautiful Day',
  showWind: true,
  saved: window.localStorage.getItem('saved') ? JSON.parse(window.localStorage.getItem('saved')) : [],
  lat: 0,
  lng: 0
};

export default function weather_reducer(
  state = initialState,
  action) {

  switch (action.type) {

    case FETCH_REQUEST:
      return state;

    case FETCH_SUCCESS:

      const {
        city: { name },
        list: [{ deg, speed, weather: [{ icon }] }]
      } = action.json

      return {
        ...state,
        icon,
        city: name,
        windSpeed: speed,
        degree: deg,
      }

    case UPDATE_POSITION:
      return {
        ...state,
        lat: action.lat,
        lng: action.lng
      }

    case UPDATE_TITLE:
      return {
        ...state,
        title: action.title
      }

    case TOGGLE_UNITS:

      return {
        ...state,
        units: state.units === 'F' ? 'C' : 'F'
      }

    case TOGGLE_WIND:
      return {
        ...state,
        showWind: !state.showWind
      }

    case SAVE_WIDGET:
      const afterSave = {
        ...state,
        saved: [
          {
            id: uuidV4(),
            title: state.title,
            units: state.units,
            showWind: state.showWind
          },
          ...state.saved,
        ]
      }
      window.localStorage.setItem('saved', JSON.stringify(afterSave.saved))
      return afterSave

    case DELETE_WIDGET:
      const afterDelete = {
        ...state,
        saved: [
          ...state.saved.filter(x => x.id !== action.id)
        ]
      }
      window.localStorage.setItem('saved', JSON.stringify(afterDelete.saved))
      return afterDelete

    default:
      return state;
  }
}