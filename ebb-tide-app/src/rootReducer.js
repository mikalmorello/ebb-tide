import { combineReducers } from "redux"
import api from "./components/Api/reduxReducer"
import tide from "./components/Tide/reduxReducer"


const appReducers = combineReducers({
  api,
  tide
})

// const rootReducer = (state, action) => {
//   console.log(JSON.stringify(state, null, 4))
//   return appReducers(state, action)
// }

export default appReducers
