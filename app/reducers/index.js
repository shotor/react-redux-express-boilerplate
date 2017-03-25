import { combineReducers } from 'redux'  
import weather_reducer from './weather-reducer'
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({  
  routing: routerReducer,
  weather: weather_reducer
})

export default rootReducer