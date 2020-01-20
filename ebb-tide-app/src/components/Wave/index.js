import React from "react";
import { useSelector } from "react-redux";
import TideDirectionIcon from '../../svg/TideDirectionIcon';
import Moment from 'react-moment';
import 'moment-timezone';
import momentjs from "moment";
import "./wave.scss";
import "./tooltip.scss";

function Wave(){
  
  // From Tide Redux
  const tideDate = useSelector(appState => appState.tide.tideDate);
  
  // From API Redux
  const nextTide = useSelector(appState => appState.api.nextTide);
  const isLoading = useSelector(appState => appState.api.isLoading);
  let tideHeight = 0;
  let tideDirection = '';
  const [tidePercentage, setTidePercentage] = React.useState(0);
  
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
    
  // Calculate % towards next tide
  React.useEffect(() => {
    if(nextTide){
      let tideTime = momentjs(nextTide.t);
      let timeDiff = tideTime.diff(tideDate);
      let timePercentage = ((22350000 - timeDiff) / 22350000).toFixed(2) * 100;
      setTidePercentage(timePercentage);
    }
  }, [nextTide]);
  
  
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
        <div className={`percentage percentage-${tidePercentage}`}>
					<div className={`tooltip tooltip-${tidePercentage}`}>
						<span className="tooltip__text">12:15pm</span>
					</div>
				</div>
      </div>
      <div className="wave__footer">
        Low
      </div>
    </section>
  )

}

export default Wave;