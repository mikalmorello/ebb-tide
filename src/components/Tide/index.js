import React from "react";
import Api from "../Api";
import Header from "../Header";
import Current from "../Current";
import Wave from "../Wave";
import { useDispatch } from "react-redux";
import 'moment-timezone';
import momentjs from "moment";
import './tide.scss';


// TIDE
function Tide({match}){
	
  // Redux Function
  const dispatchRedux = useDispatch();
 
  // Redux Set State
  dispatchRedux({ type: "setStation", payload: match.params.slug });
  dispatchRedux({ type: "setTideDate", payload: momentjs(new Date()) });
  
	// Tide View
  return(
    <div className="tide">
      <Header />
      <main className="main">
				<Api />
        <Current /> 
        <Wave /> 
      </main>
    </div>
  )
	
}

export default Tide;