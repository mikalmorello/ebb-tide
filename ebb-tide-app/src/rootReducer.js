import { combineReducers } from "redux"
import api from "./components/Api/reduxReducer";
import tide from "./components/Tide/reduxReducer";
import home from "./components/Home/reduxReducer";
import station from "./components/StationApi/reduxReducer";


const appReducers = combineReducers({
  api,
  tide, 
  home,
  station
})

// const rootReducer = (state, action) => {
//   console.log(JSON.stringify(state, null, 4))
//   return appReducers(state, action)
// }

export default appReducers
