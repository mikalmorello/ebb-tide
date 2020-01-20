import React from "react";
import { useSelector } from "react-redux";
import TideDirectionIcon from '../../svg/TideDirectionIcon';
import "./wave.scss";

function Wave(){
  
  // From API Redux
  const nextTide = useSelector(appState => appState.api.nextTide);
  const isLoading = useSelector(appState => appState.api.isLoading);
  let tideHeight = 0;
  let tideDirection = '';
  
  // Format tide height 
  if(nextTide){
    tideHeight = Number(nextTide.v);
    tideHeight = tideHeight.toFixed(2);
    console.log(tideHeight);
  }
  
  // Set class for tide direction 
  function setTideClass(tideType) {
      if(tideType === 'L') {
        tideDirection = 'low';
      } else if (tideType === 'H'){
        tideDirection = 'high';
      }
      return tideDirection;
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
          <div className={`wave__tide-direction ${setTideClass(nextTide.type)}`}>
            <TideDirectionIcon />
          </div>
          <div className="wave__tide-height">
            {tideHeight}
          </div>
          <span className="wave__header-unit">ft</span>
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