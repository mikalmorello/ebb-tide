import React from "react";
import { useDispatch } from "react-redux";



	
// STATION LIST
function StationList({newStationName}) {
	
  // Redux function
  const dispatchRedux = useDispatch();
	
	// Local State
  const [stationClicked , setStationClicked] = React.useState(false);
	
	// Convert station name to lowercase if exists
	if(newStationName){
		newStationName = newStationName.toLowerCase();
	}
	
	// Station Clicked
	const stationClick = e => {
		dispatchRedux({ type: "setStationInput", payload: newStationName});
		setStationClicked(true);
	}

	// Station View
  return (
    <div className={`autocomplete__item ${stationClicked ? "autocomplete__item--hidden" : "" }`} onClick={stationClick}>
    	{newStationName.toLowerCase()}
    </div>
  );

}

export default StationList;