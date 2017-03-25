export const FETCH_REQUEST = 'FETCH_REQUEST'
export const FETCH_SUCCESS = 'FETCH_SUCCESS'
export const UPDATE_TITLE = 'UPDATE_TITLE'
export const TOGGLE_UNITS = 'TOGGLE_UNITS'
export const TOGGLE_WIND = 'TOGGLE_WIND'
export const SAVE_WIDGET = 'SAVE_WIDGET'
export const DELETE_WIDGET = 'DELETE_WIDGET'
const API_URL = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22nome%2C%20:city%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';

export function fetchData(city) {
  return dispatch => {
    dispatch({ type: FETCH_REQUEST });
    return fetch(API_URL.replace(/:city/, city))
      .then(res => res.json())
      .then(json => dispatch({
        type: FETCH_SUCCESS,
        json
      }));
  };
}

export function updateTitle(title) {
  return dispatch => {
    dispatch({ type: UPDATE_TITLE, title })
  }
}

export function toggleUnits() {
  return dispatch => {
    dispatch({ type: TOGGLE_UNITS })
  }
}

export function toggleWind() {
  return dispatch => {
    dispatch({ type: TOGGLE_WIND })
  }
}

export function saveWidget() {
  return dispatch => {
    dispatch({ type: SAVE_WIDGET })
  }
}

export function deleteWidget(id) {
  return dispatch => {
    dispatch({ type: DELETE_WIDGET, id })
  }
}