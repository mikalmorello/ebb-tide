import React from "react";
import Api from "../Api";
import Header from "../Header";
import Current from "../Current";
import Wave from "../Wave";
import 'moment-timezone';
import momentjs from "moment";
import './tide.scss';

function Tide({match}){
//  console.log(match.params.slug);
  const initialStation = match.params.slug;
  const initialDate = momentjs(new Date());
  const [station, setStation] = React.useState(initialStation);
  const [tideDate, setTideDate] = React.useState(initialDate);
  
  return(
    <div className="tide">
      <Header />
      <main className="main">
        <Current /> 
    {/*<Api station={station} tideDate={tideDate}/>*/} 
        <Wave /> 
      </main>
    </div>
  )
}

export default Tide;