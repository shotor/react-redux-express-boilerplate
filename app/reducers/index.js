import { combineReducers } from 'redux'  
import entities_reducer from './entities-reducer'
import weather_reducer from './weather-reducer'
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({  
  entities: entities_reducer,
  routing: routerReducer,
  weather: weather_reducer
})

export default rootReducer