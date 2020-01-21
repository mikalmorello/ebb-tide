import React from "react";
import { useSelector} from "react-redux";
import StationList from '../StationList';


// Station Data API Call
const fetchStationData = async () => {
  const fetchUrl=`https://tidesandcurrents.noaa.gov/mdapi/latest/webapi/stations.json?type=datums&units=english`
  const response = await fetch(fetchUrl);
  const json = await response.json();
  return json;
};

function searchStationList(searchInput, stationList){
  let matches = [];
  var reg = new RegExp(searchInput.split('').join('\\w*').replace(/\W/, ""), 'i');
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

// API Functionality

function StationApi() {
  
  // From Home Redux
  const stationInput = useSelector(appState => appState.home.stationInput);
  const [stationData, setStationData] = React.useState();
  const [stationMatches, setStationMatches] = React.useState([]);
  

  // Get Station list from Api 
  React.useEffect(() => {
    (async () => {
      const incomingData = await fetchStationData();
      setStationData(incomingData);	
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

  // If not station matches, return empty
  if(!stationMatches){
    return "";
  }
			
  // Active state after api has run
  return (
    <div className="autocomplete-items">
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