import { combineReducers } from 'redux'  
import entities_reducer from './entities/entities-reducer'  
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({  
  entities: entities_reducer,
  routing: routerReducer
})

export default rootReducer