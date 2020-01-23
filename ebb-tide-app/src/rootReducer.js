import { combineReducers } from "redux"
import api from "./components/Api/reduxReducer";
import tide from "./components/Tide/reduxReducer";
import home from "./components/Home/reduxReducer";
import station from "./components/StationApi/reduxReducer";


// Reducer List
const appReducers = combineReducers({
  api,
  tide, 
  home,
  station
})

export default appReducers;
