import React from "react";
import { useSelector, useDispatch } from "react-redux";

function TodoItem({newStationName, newStationId}) {
	
	// Redux function variable
  const dispatchRedux = useDispatch();
	
	
  return (
		<div onClick={() => dispatchRedux({ type: "setStationInput", payload: newStationName })}>
			{newStationName}
		</div>
  );
}


export default TodoItem;