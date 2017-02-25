import { combineReducers } from 'redux'  
import user_reducer from './user/user-reducer'  
import product_reducer from './product/product-reducer'
import customer_reducer from './customer/customer-reducer'
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({  
  users: user_reducer,
  products: product_reducer,
  customers: customer_reducer,
  routing: routerReducer
})

export default rootReducer