import React from "react";
import { useSelector } from "react-redux";
import TideDirectionIcon from '../../svg/TideDirectionIcon';
import "./wave.scss";

function Wave(){
  
  // From API Redux
  const nextTide = useSelector(appState => appState.api.nextTide);
  const isLoading = useSelector(appState => appState.api.isLoading);
  let tideHeight = 0;
  
  if(nextTide){
    tideHeight = Number(nextTide.v);
    tideHeight = tideHeight.toFixed(2);
    console.log(tideHeight);
  }
  
  if (isLoading) {
    return (
      <>
      </>
    )
  } 
      
  return(
    <section className="wave">
      <div className="wave__header">
        <div className="wave__header-tide">
          <TideDirectionIcon />{tideHeight}<span className="wave__header-unit">ft</span>
        </div>
        <div className="wave__header-label">
          High
        </div>
      </div>
      <div className="wave__container">
        <div className="percentage percentage-78"></div>
      </div>
      <div className="wave__footer">
        Low
      </div>
    </section>
  )

}

export default Wave;