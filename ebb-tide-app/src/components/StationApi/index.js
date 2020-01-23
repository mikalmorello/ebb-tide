import React from "react";
import StationList from '../StationList';
import { useSelector, useDispatch } from "react-redux";


// Station Data API Call
const fetchStationData = async () => {
  const fetchUrl=`https://tidesandcurrents.noaa.gov/mdapi/latest/webapi/stations.json?type=datums&units=english`,
				response = await fetch(fetchUrl),
				json = await response.json();
  return json;
};

// Search Station List
function searchStationList(searchInput, stationList){
  let matches = [];
  const reg = new RegExp(searchInput.split('').join('\\w*').replace(/\W/, ""), 'i');
    stationList.stations.map((station, index) => {
      if (station.name.match(reg)) {
        let newStation = new Object();
        newStation.name = station.name;
        newStation.id = station.id;
        matches.push(newStation);
      }
    });
  return matches;
}

// STATION API
function StationApi() {
  
  // Redux function
  const dispatchRedux = useDispatch();
  
  // Redux State
  const stationInput = useSelector(appState => appState.home.stationInput),
				stationData = useSelector(appState => appState.station.stationData);
	
	// Local State
  const [stationMatches, setStationMatches] = React.useState([]);
  
  // Get Station list from Api 
  React.useEffect(() => {
    (async () => {
      const incomingData = await fetchStationData();	
      dispatchRedux({ type: "setStationData", payload: incomingData });
    })();
  }, []);
	
  // Set Station Name
  React.useEffect(() => {
    if(stationData){
      stationData.stations.map((station, index) => {
      });
    }
  }, [stationData]);
	
	// Check station input
  React.useEffect(() => {
    if(stationInput && stationData){
      let stationMatch = searchStationList(stationInput, stationData);
      setStationMatches(stationMatch);
    }
  }, [stationInput, stationData]);

  // If no station matches, return empty
  if(!stationMatches){
    return "";
  }
			
  // Station List View
  return (
    <div className="autocomplete__items">
      {
        stationMatches.map((newStation, index) => (
        	<StationList 
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