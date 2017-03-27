export const FETCH_REQUEST = 'FETCH_REQUEST'
export const FETCH_SUCCESS = 'FETCH_SUCCESS'
export const UPDATE_TITLE = 'UPDATE_TITLE'
export const TOGGLE_UNITS = 'TOGGLE_UNITS'
export const TOGGLE_WIND = 'TOGGLE_WIND'
export const SAVE_WIDGET = 'SAVE_WIDGET'
export const DELETE_WIDGET = 'DELETE_WIDGET'
export const UPDATE_POSITION = 'UPDATE_POSITION'

function getUrl(lat, lng) {
  const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=imperial&APPID=0178071df571d264eadf3c545ad00122`
  return url
}

export function updatePosition(lat, lng) {
  return dispatch => {
    dispatch({ type: UPDATE_POSITION, position: { lat, lng }})
  }
}

export function fetchData(lat, lng) {
  return dispatch => {
    dispatch({ type: FETCH_REQUEST });
    return fetch(getUrl(lat, lng))
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

export function toggleUnits(unit) {
  return dispatch => {
    dispatch({ type: TOGGLE_UNITS, unit })
  }
}

export function toggleWind(show) {
  return dispatch => {
    dispatch({ type: TOGGLE_WIND, show })
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