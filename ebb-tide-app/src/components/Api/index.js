import React from "react";
import Loader from "../Loader";
import Moment from 'react-moment';
import 'moment-timezone';
import momentjs from "moment";

// High / Low Tide Data API Call
const fetchData = async (station, startDate, endDate) => {
  const fetchUrl=`https://tidesandcurrents.noaa.gov/api/datagetter?product=predictions&application=NOS.COOPS.TAC.WL&begin_date=${startDate}&end_date=${endDate}&datum=MLLW&station=${station}&time_zone=lst_ldt&units=english&interval=hilo&format=json`
	console.log(fetchUrl);
  const response = await fetch(fetchUrl);
  const json = await response.json();
	console.log(json);
  return json;
};


// Format date for Fetch Url
function formatDate(date) {
//	console.log('date format is ' + momentjs(date).format("YYYYMMd HH:mm"));
  let newDate = date.toISOString().slice(0,10);
  newDate = newDate.replace(/-/g,"");
  return newDate;
}

function Api({station}) {
  const [tideData, setTideData] = React.useState();
  const [startDate, setStartDate] = React.useState();
	const [currentDate, setCurrentDate] = React.useState();
  const [endDate, setEndDate] = React.useState();
	const [currentDateTime, setCurrentDateTime] = React.useState();
	const [nextTide, setNextTide] = React.useState();
	const [previousTide, setPreviousTide] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);
 

	  React.useEffect(() => {
			const dateYesterday = momentjs(new Date()).subtract(1, 'days');
      const dateToday = momentjs(new Date());
			setCurrentDateTime(dateToday.format('YYYY-MM-d HH:mm'));
      const dateTomorrow = momentjs(new Date()).add(1,'days');
			const tempStartDate = formatDate(dateYesterday);
			const tempCurrentDate = formatDate(dateToday);
      const tempEndDate = formatDate(dateTomorrow);
      setStartDate(tempStartDate);
			setCurrentDate(tempCurrentDate);
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
	
	
	// Determine High Tide and Low Tide based off of date set
	React.useEffect(() => {
		if(tideData) {
			
			tideData.predictions.map((tide, index) => {
				let currentTime = momentjs(new Date());
				let tideTime = momentjs(tide.t);
				let timeDiff = tideTime.diff(currentTime);
				console.log(`
					current time: ${currentTime}
					tide time: ${tideTime}
					difference: ${timeDiff}
				`);
				
				// Find the next tide
				if((timeDiff > 0) && (timeDiff < 22350000)){
					 console.log('the next tide is' + tide.t);
					 console.log('the array index is' + index);
					 setNextTide(tideData.predictions[index]);
				}
				
				// Find the previous tide										 
				if((timeDiff < 0) && (timeDiff > -22350000)){
					 console.log('the previous tide is' + tide.t);
					 console.log('the array index is' + index);
					 setPreviousTide(tideData.predictions[index]);
				}
			});
			
	 	}
   }, [tideData ]);
	
	
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
				Current Date: {currentDate} <br />
			  Start Date: {startDate} <br />
				End Date: {endDate} <br />
			 <hr />
			 Current Date and Time is: <br />
			{currentDateTime} <br />
			Tide data times: <br />
			{tideData.predictions.map((tide, index) => (
         <div>
			     {tide.t}
			     {index}
				 </div>
        ))}
			<hr />
				Previous Tide: {previousTide.t}<br />
				Previous Tide Type: {previousTide.type}<br />
	      Next Tide: {nextTide.t}<br />
	      Next Tide Type:{nextTide.type}<br />
			</section>
		</main>
  );
}


export default Api;