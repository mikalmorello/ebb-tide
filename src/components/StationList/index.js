import React from "react";
import { useDispatch } from "react-redux";


// STATION LIST
function StationList({newStationName}) {
	
  // Redux function
  const dispatchRedux = useDispatch();
	
	// Station View
  return (
    <div className="autocomplete__item" onClick={() => dispatchRedux({ type: "setStationInput", payload: newStationName })}>
    	{newStationName}
    </div>
  );

}

export default StationList;