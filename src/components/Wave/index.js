import React from "react";
import { useSelector } from "react-redux";
import Moment from 'react-moment';
import momentjs from "moment";
import 'moment-timezone';
import TideDirectionIcon from '../../svg/TideDirectionIcon';
import "./wave.scss";
import "./tooltip.scss";


// WAVE
function Wave(){
  
  // Redux State
  const tideDate = useSelector(appState => appState.tide.tideDate),
				nextTide = useSelector(appState => appState.api.nextTide),
				isLoading = useSelector(appState => appState.api.isLoading);
	
	// Local State
	const [tidePercentage, setTidePercentage] = React.useState(1),
				[currentTime, setCurrentTime] = React.useState();
  
	// Variables
  let tideHeight = 0,
			tideDirection = '';

  // Format tide height 
  if(nextTide){
    tideHeight = Number(nextTide.v);
    tideHeight = tideHeight.toFixed(2);
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
      setTimeout(() => {
        let tideTime = momentjs(nextTide.t),
						timeDiff = tideTime.diff(tideDate);
        if(nextTide.type === 'L') {
          let timePercentage = Math.abs((((22350000 - timeDiff) / 22350000) * 100) - 100).toFixed(0);
          setTidePercentage(timePercentage);
				} else if (nextTide.type === 'H'){
					let timePercentage = (((22350000 - timeDiff) / 22350000) * 100).toFixed(0);
					setTidePercentage(timePercentage);
				}
      }, 10);
    }
  }, [nextTide, tideDate]);
  
	// Current time
	React.useEffect(() => {
		window.setInterval(function(){
			setCurrentTime(momentjs(new Date()).format("MMMM D hh:mm a"));
		}, 1000);
	});
  
	// Check if data is loading
  if (isLoading) {
    return (
      <>
      </>
    )
  } 
  
  // Check if station data is not defined
	if (typeof nextTide == 'undefined'){
		return (
			<></>
		)
  } 
  
	// Wave View
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
						<span className="tooltip__text">
							<span className="tooltip__time"><Moment format="h:mm">{currentTime}</Moment></span>
							<span className="tooltip__period"><Moment format="a">{currentTime}</Moment></span>
						</span>
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