import React from "react";
import { useDispatch } from "react-redux";

function StationList({newStationName}) {
	
  // Redux function variable
  const dispatchRedux = useDispatch();
	
  return (
    <div onClick={() => dispatchRedux({ type: "setStationInput", payload: newStationName })}>
        {newStationName}
    </div>
  );
}


export default StationList;