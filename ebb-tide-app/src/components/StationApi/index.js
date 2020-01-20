import React from "react";
import { useSelector, useDispatch } from "react-redux";


// Station Data API Call
const fetchStationData = async () => {
  const fetchUrl=`https://tidesandcurrents.noaa.gov/mdapi/latest/webapi/stations.json?type=datums&units=english`
  const response = await fetch(fetchUrl);
  const json = await response.json();
  return json;
};



function searchStationList(searchInput, stationList){
	console.log('////////////////// searhc input ' + searchInput);
	let matches = [];
	var reg = new RegExp(searchInput.split('').join('\\w*').replace(/\W/, ""), 'i');
		stationList.stations.map((station, index) => {
//				console.log(station.name);
			if (station.name.match(reg)) {
//				console.log(station.name);
				matches.push(station.name);
			}
			
		});
	return matches;
}

// API Functionality

function StationApi({stationInput}) {
  
  // Redux function variable
  const dispatchRedux = useDispatch();
  
  // From Tide Redux
  const station = useSelector(appState => appState.tide.station);
	const [stationData, setStationData] = React.useState();
	const [stationMatches, setStationMatches] = React.useState();
  

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
//				console.log(station.name);
			});
    }
  }, [stationData]);
	
	// Check station input
  React.useEffect(() => {
    if(stationInput){
			let stationMatch = searchStationList(stationInput, stationData);
			let stationz = '';
			console.log(stationMatch);
			stationMatch.map((station, index) => {
				stationz += `<div>${station}</div>`;
			});
			console.log(stationz); 
			setStationMatches(stationz);
    }
  }, [stationInput]);

			
  // Active state after api has run
  return (
		<main>
		  {stationMatches}
		</main>
  );
}


export default StationApi;