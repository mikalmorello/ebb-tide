import React from "react";
import Loader from "../Loader";

// High / Low Tide Data API Call
const fetchData = async (station, startDate, endDate) => {
  const fetchUrl=`https://tidesandcurrents.noaa.gov/api/datagetter?product=predictions&application=NOS.COOPS.TAC.WL&begin_date=${startDate}&end_date=${endDate}&datum=MLLW&station=${station}&time_zone=lst_ldt&units=english&interval=hilo&format=json`
  const response = await fetch(fetchUrl);
  const json = await response.json();
  return json;
};

// Station Data API Call
const fetchStationData = async (station) => {
  const fetchUrl=`https://tidesandcurrents.noaa.gov/mdapi/v1.0/webapi/stations/${station}.json`
  const response = await fetch(fetchUrl);
  const json = await response.json();
//  console.log(json);
//	console.log(json.stations[0].name)
  return json;
};


// Format date for Fetch Url
function formatDate(date) {
  let newDate = date.toISOString().slice(0,10);
  newDate = newDate.replace(/-/g,"");
  return newDate;
}

// Title Case Conversion (https://gist.github.com/SonyaMoisset/aa79f51d78b39639430661c03d9b1058#file-title-case-a-sentence-for-loop-wc-js)
var toTitleCase = function (str) {
	str = str.toLowerCase().split(' ');
	for (var i = 0; i < str.length; i++) {
		str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
	}
	return str.join(' ');
};


function Api({station}) {
  const currentStation = station;
  const [tideData, setTideData] = React.useState();
  const [startDate, setStartDate] = React.useState();
  const [endDate, setEndDate] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);
  const [tideDate, setTideDate] = React.useState('no date');
	const [nextTide, setNextTide] = React.useState('');
	const [stationData, setStationData] = React.useState();
	const [stationName, setStationName] = React.useState();
  
  
  //  Determine start and end date for api call
  React.useEffect(() => {
      const dateToday = new Date();
      const dateTomorrow = new Date(dateToday)
        dateTomorrow.setDate(dateTomorrow.getDate() + 1);
      const tempStartDate = formatDate(dateToday);
      const tempEndDate = formatDate(dateTomorrow);
      setStartDate(tempStartDate);
      setEndDate(tempEndDate);
  }, [startDate, endDate]);

  
  // Call API on station or date change
  React.useEffect(() => {
    if(station && startDate && endDate){
      (async () => {
        const incomingData = await fetchData(station, startDate, endDate);
        setTideData(incomingData);
        setIsLoading(false);
      })();
    }
  }, [station, startDate, endDate ]);
   
  
  // Get tide type from api
  React.useEffect(() => {
    if(tideData){
      let tempNextTide = tideData.predictions[0].type;
			if(tempNextTide === 'L') {
				tempNextTide = 'Low Tide';
			} else if (tempNextTide === 'H'){
				tempNextTide = 'High Tide';
			}
//			console.log('temp tide type is ' + tempNextTide);
      setNextTide(tempNextTide);  
    }
    
  }, [tideData]);
  
	// Get next tide type from api
  React.useEffect(() => {
    if(tideData){
      let tempTideDate = '';
      tempTideDate = new Date(tideData.predictions[0].t);
      tempTideDate = tempTideDate.toUTCString();
//      console.log('temp tide date is ' + tempTideDate);
      setTideDate(tempTideDate);
//			console.log('temp tide type is ' + tempTideDate);
    }
  }, [tideData]);
	
	
	
	// Station API Call
  React.useEffect(() => {
    if(station){
      (async () => {
        const incomingData = await fetchStationData(station);
        setStationData(incomingData);
      })();
    }
  }, [station]);
	
	
  // Get tide type from api
  React.useEffect(() => {
    if(stationData){
      let tempStationName = stationData.stations[0].name,
					tempStationState = stationData.stations[0].state;
			
			    tempStationName = toTitleCase(tempStationName);
			
					let tempStationFullName = `${tempStationName}, ${tempStationState}`;
//			console.log(tempStationFullName);
			setStationName(tempStationFullName);
    }
    
  }, [stationData]);
	
	
  
  // Loading state while api is running
  if (isLoading) {
    return (
      <Loader />
    )
  } 
      
  // Active state after api has run
  return (
    <div>
      Api station ID is: {currentStation}<br />
			Api station Name is: {stationName}<br />
      Current tide date is: {tideDate} <br />
			Next tide is: {nextTide}   
    </div>
  );
}


export default Api;