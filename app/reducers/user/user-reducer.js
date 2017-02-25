/**
 * user-reducer.js
 */

import * as _ from 'lodash'

export const initial_state = []

export default function user_reducer(
  state = initial_state,
  action) {

  switch(action.type) {

    case 'GET_USERS':
      return action.payload
    break;

    case 'GET_SINGLE_USER':
      const newState = replaceUser(state, action.payload)
    break;

    default:
      return state

  }

}

function replaceUser(state, user) {
  const oldUsers = state.filter(x => x.id !== user.id)
  return oldUsers.concat([user])
  return [
    ...oldUsers,
    user
  ]
}
