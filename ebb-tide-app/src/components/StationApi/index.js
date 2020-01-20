import React from "react";
import { useSelector, useDispatch } from "react-redux";


// Station Data API Call
const fetchStationData = async () => {
  const fetchUrl=`https://tidesandcurrents.noaa.gov/mdapi/latest/webapi/stations.json?type=datums&units=english`
  const response = await fetch(fetchUrl);
  const json = await response.json();
  return json;
};

// API Functionality

function StationApi() {
  
  // Redux function variable
  const dispatchRedux = useDispatch();
  
  // From Tide Redux
  const station = useSelector(appState => appState.tide.station);
	const [stationData, setStationData] = React.useState();
  

  // Get Station list from Api 
  React.useEffect(() => {
		(async () => {
			const incomingData = await fetchStationData();
			setStationData(incomingData);	
//			console.log(incomingData);
		})();
  }, []);

	
	
  // Set Station Name
  React.useEffect(() => {
    if(stationData){
			console.log(stationData);
			stationData.stations.map((station, index) => {
				console.log(station.name);
			});
    }
  }, [stationData]);

			
  // Active state after api has run
  return (
		<main>
		  xxx
		</main>
  );
}


export default StationApi;