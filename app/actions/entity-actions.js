/**
 * entity-actions.js
 */

export const REFRESH = 'REFRESH'
export const UPDATE = 'UPDATE'
export const DELETE = 'DELETE'

const wrap_action = (type, payload) => {
  return { type, payload }
}

export const refresh_entities = entity => {
  return dispatch => {
    // do some request here
    fetch(`path/${entity}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(json => {
        dispatch(wrap_action(entity, json))
      })
  }
}
