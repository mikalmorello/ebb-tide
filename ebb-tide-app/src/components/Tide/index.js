import React from "react";
import Api from "../Api";
import Header from "../Header";
import 'moment-timezone';
import momentjs from "moment";


function Tide({match}){
//  console.log(match.params.slug);
  const initialStation = match.params.slug;
	const initialDate = momentjs(new Date());
  const [station, setStation] = React.useState(initialStation);
	const [tideDate, setTideDate] = React.useState(initialDate);
  return(
    <>
      <Header />
      <section>
        Tide Info
        <Api station={station} tideDate={tideDate}/> 
      </section>
    </>
  )
}

export default Tide;