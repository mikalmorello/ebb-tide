import React from "react";
import { useDispatch } from "react-redux";


// STATION LIST
function StationList({newStationName}) {
	
  // Redux function
  const dispatchRedux = useDispatch();
	
	// Convert station name to lowercase if exists
	if(newStationName){
		newStationName = newStationName.toLowerCase();
	}
	
	// Station View
  return (
    <div className="autocomplete__item" onClick={() => dispatchRedux({ type: "setStationInput", payload: newStationName})}>
    	{newStationName.toLowerCase()}
    </div>
  );

}

export default StationList;