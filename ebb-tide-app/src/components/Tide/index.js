import React from "react";
import Api from "../Api";
import Header from "../Header";
import Current from "../Current";
import Wave from "../Wave";
import { useDispatch } from "react-redux";
import 'moment-timezone';
import momentjs from "moment";
import './tide.scss';

function Tide({match}){
  // Redux function variable
  const dispatchRedux = useDispatch();
 
  // Set state variables in Redux
  dispatchRedux({ type: "setStation", payload: match.params.slug });
  dispatchRedux({ type: "setTideDate", payload: momentjs(new Date()) });
  
  return(
    <div className="tide">
      <Header />
      <main className="main">
        <Current /> 
        <Api />
        <Wave /> 
      </main>
    </div>
  )
}

export default Tide;