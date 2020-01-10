import React from "react";
import Api from "../Api";
import Header from "../Header";

function Tide({match}){
//  console.log(match.params.slug);
  const initialStation = match.params.slug;
  const [station, setStation] = React.useState(initialStation);
  console.log(station);
  
  return(
    <>
      <Header />
      <section>
        Tide Info
        <Api station={station} /> 
      </section>
    </>
  )
}

export default Tide;