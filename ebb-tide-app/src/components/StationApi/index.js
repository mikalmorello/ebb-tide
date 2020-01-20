import React from "react";
import { useSelector, useDispatch } from "react-redux";
import TodoItem from '../TodoItem';


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
			if (station.name.match(reg)) {
					var newStation = new Object();
					newStation.name = station.name;
					newStation.id = station.id;
					matches.push(newStation);
//				matches.push(station.name);
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
	const [stationMatches, setStationMatches] = React.useState([]);
  

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
			setStationMatches(stationMatch);
    }
  }, [stationInput]);

	
	if(!stationMatches){
		   return "";
		 }
			
  // Active state after api has run
  return (
		<div className="autocomplete-items">
		 	{
				stationMatches.map((newStation, index) => (
					<TodoItem 
						key={index}
						newStationName={newStation.name}
						newStationId={newStation.id}
					/>
				))
			}
		</div>
  );
}


export default StationApi;