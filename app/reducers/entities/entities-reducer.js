/**
 * user-reducer.js
 */

import {
  REFRESH,
  UPDATE,
  DELETE
} from 'actions/entity-actions'

import * as _ from 'lodash'

export const initial_state = {
  documents: []
}

export default function entities_reducer(
  state = initial_state,
  action) {

  switch (action.type) {

    case [REFRESH]: {
      // replace key completely

      const { entity, data } = action.payload

      return {
        ...state,
        [entity]: data
      }

      break;
    }
    
    case [UPDATE]: {
      // update value in key

      const { entity, data } = action.payload

      return {
        ...state,
        [entity]: [
          ...state[entity].filter(x => x.id !== data.id),
          data
        ]
      }
    }
    
    case [DELETE]: {
      // remove value from key

      const { entity } = action.payload

      return {
        ...state,
        [entity]: state[entity].filter(x => x.id !== data.id)
      }
    }

    default:
      return state

  }

}
