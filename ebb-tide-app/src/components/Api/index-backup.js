import React from "react";
import Loader from "../Loader";
import Moment from 'react-moment';
import 'moment-timezone';
import momentjs from "moment";

// High / Low Tide Data API Call
const fetchData = async (station, startDate, endDate) => {
	console.log('start date is ' + startDate);
	console.log('end date is ' + endDate);
  const fetchUrl=`https://tidesandcurrents.noaa.gov/api/datagetter?product=predictions&application=NOS.COOPS.TAC.WL&begin_date=${startDate}&end_date=${endDate}&datum=MLLW&station=${station}&time_zone=lst_ldt&units=english&interval=hilo&format=json`
	console.log(fetchUrl);
  const response = await fetch(fetchUrl);
  const json = await response.json();
//	console.log(json);
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
	console.log('date format is ' + momentjs(date).format("YYYYMMd HH:mm"));
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

// Low tide or high tide?



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
	const [currentTime, setCurrentTime] = React.useState();
	const [tideHeight, setTideHeight] = React.useState();
	const [previousTide, setPreviousTide] = React.useState('');
  
  
  //  Determine start and end date for api call
//  React.useEffect(() => {
//      const dateToday = new Date();
//      const dateTomorrow = new Date(dateToday)
//        dateTomorrow.setDate(dateTomorrow.getDate() + 1);
//      const tempStartDate = formatDate(dateToday);
//      const tempEndDate = formatDate(dateTomorrow);
//      setStartDate(tempStartDate);
//      setEndDate(tempEndDate);
//  }, [startDate, endDate]);
	
	
	  React.useEffect(() => {
			const datePreviousTide = momentjs(new Date()).subtract(372.5, 'minutes');
//			console.log('last tide ' + datePreviousTide.format("dddd, MMMM Do YYYY, h:mm:ss a");
			console.log('last tide ' + datePreviousTide.toISOString());
			setPreviousTide(datePreviousTide);
      const dateToday = momentjs(new Date());
			console.log('today is ' + dateToday.format("dddd, MMMM Do YYYY, h:mm:ss a"));
      const dateTomorrow = momentjs(new Date()).add(1,'days');
			console.log('tomorrow is ' + dateTomorrow.format("dddd, MMMM Do YYYY, h:mm:ss a"));
//      const tempStartDate = formatDate(dateToday);
			const tempStartDate = formatDate(datePreviousTide);
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
   
  
  // Get tide type
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
  
	// Get next tide date 
  React.useEffect(() => {
    if(tideData){
      let tempTideDate = '';
      tempTideDate = new Date(tideData.predictions[0].t);
//      tempTideDate = tempTideDate.toUTCString();
      setTideDate(tempTideDate);
    }
  }, [tideData]);
	
  // Get tide height 
  React.useEffect(() => {
    if(tideData){
      let tempTideHeight = tideData.predictions[0].v;
			tempTideHeight = Math.round( tempTideHeight * 100 ) / 100;
      setTideHeight(tempTideHeight);
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
	
	
	// Current time
  React.useEffect(() => {
		window.setInterval(function(){
    	setCurrentTime(momentjs(new Date()).format("MMMM D hh:mm a"));
		}, 1000);
  });
	
	
  
  // Loading state while api is running
  if (isLoading) {
    return (
      <Loader />
    )
  } 
      
  // Active state after api has run
  return (
		<main>
			<section>
			  Current tide is: 
			  Next tide is <Moment format="MMMM D hh:mm a">{tideDate}</Moment> <br />
			  // <br />
			
				Current tide date is: <Moment format="MMMM D">{tideDate}</Moment> <br />
				day of week: <Moment format="dd">{tideDate}</Moment><br />
				tide time is: <Moment format="hh:mm">{tideDate}</Moment><br />
				am or pm: <Moment format="a">{tideDate}</Moment><br />
				current time: <Moment></Moment><br />
				time from now: <Moment fromNow> {tideDate} </Moment> <br />
				Next tide is: {nextTide}   <br />
				Api station Name is: {stationName}<br />
				current time is: {currentTime};<br />
				tide height is: {tideHeight}ft<br />
				previous tide date: <Moment>{previousTide}</Moment>
			</section>
			<hr />
			<section>
			</section>
		</main>
  );
}


export default Api;