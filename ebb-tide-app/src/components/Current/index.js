import React from "react";
import { useSelector} from "react-redux";
import Moment from 'react-moment';
import 'moment-timezone';
import Loader from "../Loader";
import "./current.scss";


// Readable name for tide type
function formatTideType(tideType) {
	if(tideType === 'L') {
      tideType = 'Low Tide';
	} else if (tideType === 'H'){
      tideType = 'High Tide';
	}
	return tideType;
}


function Current(){
  
  // From API Redux
  const nextTide = useSelector(appState => appState.api.nextTide); 
  const stationName = useSelector(appState => appState.api.stationName);
  const isLoading = useSelector(appState => appState.api.isLoading);
  
  if (isLoading) {
    return (
      <Loader />
    )
  } 
      
  return(
    <section className="current">
      <div className="current__container">
        <div className="current__date">
          <Moment format="dddd, MMMM D">{nextTide.t}</Moment>
        </div>
        <div className="current__tide">
          {formatTideType(nextTide.type)}
        </div>
        <div className="current__time-container">
          <span className="current__time-pre">at</span>
          <time className="current__time">
            <Moment format="h:mm">{nextTide.t}</Moment>
          </time>
          <span className="current__time-post">
            <Moment format="a">{nextTide.t}</Moment>
          </span>
        </div>
        <div className="current__location">
          {stationName}
        </div>
      </div> 
    </section>
  )
}

export default Current;