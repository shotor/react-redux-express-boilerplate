/**
 * user-actions.js
 */

/**
 * Action Types
 */

export const GET_USERS = 'GET_USERS'

/**
 * Dispatchers
 */

const dispatch_get_users = payload => {
  return { type: GET_USERS, payload }
}

const dispatch_get_single_users = payload => {
  return { type: GET_USERS, payload }
}

/**
 * Action Creators
 */

export const get_users = payload => {
  return dispatch => {
    fetch('/api/articles', {
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
