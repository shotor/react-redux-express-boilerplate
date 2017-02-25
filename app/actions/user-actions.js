/**
 * user-actions.js
 */

/**
 * Action Types
 */

export const ACTION = 'ACTION'

/**
 * Dispatchers
 */

const dispatch_action = payload => {
  return { type: ACTION, payload }
}

/**
 * Action Creators
 */

export const start_action = payload => {
  return dispatch => {
    fetch('/api/users', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(json => {
        dispatch(dispatch_action(json))
      })
  }
}
