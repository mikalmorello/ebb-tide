import React from "react";
import Loader from "../Loader";
import Moment from 'react-moment';
import 'moment-timezone';
import momentjs from "moment";
import { useSelector, useDispatch } from "react-redux";

// High / Low Tide Data API Call
const fetchData = async (station, startDate, endDate) => {
  const fetchUrl=`https://tidesandcurrents.noaa.gov/api/datagetter?product=predictions&application=NOS.COOPS.TAC.WL&begin_date=${startDate}&end_date=${endDate}&datum=MLLW&station=${station}&time_zone=lst_ldt&units=english&interval=hilo&format=json`
  console.log(fetchUrl);
  const response = await fetch(fetchUrl);
  const json = await response.json();
  return json;
};

// Station Data API Call
const fetchStationData = async (station) => {
  const fetchUrl=`https://tidesandcurrents.noaa.gov/mdapi/v1.0/webapi/stations/${station}.json`
  const response = await fetch(fetchUrl);
  const json = await response.json();
  return json;
};

// API Functionality

//function Api({station, tideDate}) {
function Api() {
  
  // Redux function variable
  const dispatchRedux = useDispatch();
  
  // From Tide Redux
  const station = useSelector(appState => appState.tide.station);
  const tideDate = useSelector(appState => appState.tide.tideDate);
  
  // From API Redux
  const tideData = useSelector(appState => appState.api.tideData);
  const startDate = useSelector(appState => appState.api.startDate);
  const endDate = useSelector(appState => appState.api.endDate);
  const nextTide = useSelector(appState => appState.api.nextTide); 
  const previousTide = useSelector(appState => appState.api.previousTide);
  const stationData = useSelector(appState => appState.api.stationData);
  const stationName = useSelector(appState => appState.api.stationName);
  const tideDirection = useSelector(appState => appState.api.tideDirection);
//  const currentTime = useSelector(appState => appState.api.currentTime);
  const isLoading = useSelector(appState => appState.api.isLoading);
	
	// Determine date range based upon selected date
	React.useEffect(() => {
      const previousDay = momentjs(tideDate).subtract(1, 'days').format('YYYYMMD'),
            nextDay = momentjs(tideDate).add(1, 'days').format('YYYYMMD');
      dispatchRedux({ type: "setStartDate", payload: previousDay });
      dispatchRedux({ type: "setEndDate", payload: nextDay });
  }, [startDate, endDate, tideDate]);

  
  // Call High / Low tide API 
  React.useEffect(() => {
    if(station && startDate && endDate){
      (async () => {
        const incomingData = await fetchData(station, startDate, endDate);
        dispatchRedux({ type: "setTideData", payload: incomingData });
        dispatchRedux({ type: "setIsLoading", payload: false });
      })();
    }
  }, [station, startDate, endDate ]);
	
	
	// Determine previous and next tides based off API call
	React.useEffect(() => {
      if(tideData) {
        tideData.predictions.map((tide, index) => {
          let tideTime = momentjs(tide.t);
          let timeDiff = tideTime.diff(tideDate);

          // Find the next tide, set tide array index
          if((timeDiff > 0) && (timeDiff < 22350000)){
            dispatchRedux({ type: "setNextTide", payload: tideData.predictions[index] });
          }

          // Find the previous tide, set tide array index									 
          if((timeDiff < 0) && (timeDiff > -22350000)){
            dispatchRedux({ type: "setPreviousTide", payload: tideData.predictions[index] });
          }
        });
      }
   }, [tideData, tideDate]);
	
	
	// Set Tide Direction
	React.useEffect(() => {
    if(previousTide){
      if(previousTide === 'L') {
        dispatchRedux({ type: "setTideDirection", payload: 1 });
      } else {
        dispatchRedux({ type: "setTideDirection", payload: 0 });
      }
    }
  }, [previousTide]);
	
	
	// Call Station API
  React.useEffect(() => {
    if(station){
      (async () => {
        const incomingData = await fetchStationData(station);
        dispatchRedux({ type: "setStationData", payload: incomingData });
      })();
    }
  }, [station]);
	
	
	// Set Station Name
	React.useEffect(() => {
    if(stationData){
      let tempStationName = stationData.stations[0].name,
		tempStationState = stationData.stations[0].state;
      let tempStationFullName = `${tempStationName}, ${tempStationState}`;
      dispatchRedux({ type: "setStationName", payload: tempStationFullName });
    }
  }, [stationData]);

	
//	// Current time
//  React.useEffect(() => {
//		window.setInterval(function(){
////    	setCurrentTime(momentjs(new Date()).format("MMMM D hh:mm a"));
//        dispatchRedux({ type: "setCurrentTime", payload: momentjs(new Date()).format("MMMM D hh:mm a") });
//		}, 1000);
//  });
	
	

			
  // Active state after api has run
  return (
		<main>
		</main>
  );
}


export default Api;