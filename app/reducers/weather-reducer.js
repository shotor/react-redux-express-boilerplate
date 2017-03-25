import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  UPDATE_TITLE,
  TOGGLE_UNITS,
  TOGGLE_WIND,
  SAVE_WIDGET,
  DELETE_WIDGET
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
  saved: window.localStorage.getItem('saved') ? JSON.parse(window.localStorage.getItem('saved')) : []
};

export default function weather_reducer(
  state = initialState,
  action) {

  switch (action.type) {
    case FETCH_REQUEST:
      return state;

    case FETCH_SUCCESS:
      const {
        location: { city },
        item: { forecast, condition },
        atmosphere: { humidity },
        wind: { speed }
      } = action.json.query.results.channel;

      const { date, day, high, low } = forecast[0];
      const { code, temp, text } = condition;

      return {
        ...state,
        local: city,
        date: date,
        humidity: humidity,
        windSpeed: speed,
        day: day,
        high: high,
        low: low,
        type: text,
        code: code,
        degree: temp,
        forecast: forecast
      };

    case UPDATE_TITLE:
      return {
        ...state,
        title: action.title
      }
      break

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
          ...state.saved,
          {
            id: uuidV4(),
            title: state.title,
            units: state.units,
            showWind: state.showWind
          }
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