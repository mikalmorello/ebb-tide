import React from "react";
import Loader from "../Loader";

// Api Call
const fetchData = async (station, startDate, endDate) => {
  const fetchUrl=`https://tidesandcurrents.noaa.gov/api/datagetter?product=predictions&application=NOS.COOPS.TAC.WL&begin_date=${startDate}&end_date=${endDate}&datum=MLLW&station=${station}&time_zone=lst_ldt&units=english&interval=hilo&format=json`
  const response = await fetch(fetchUrl);
  const json = await response.json();
  console.log(json);
  return json;
};

// Format date for Fetch Url
function formatDate(date) {
  let newDate = date.toISOString().slice(0,10);
  newDate = newDate.replace(/-/g,"");
  return newDate;
}


function Api({station}) {
  const currentStation = station;
  const [tideData, setTideData] = React.useState();
  const [startDate, setStartDate] = React.useState();
  const [endDate, setEndDate] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);
  const [tideDate, setTideDate] = React.useState('no date');
  
  
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

  
  // Call api on station or date change
  React.useEffect(() => {
    if(station && startDate && endDate){
      (async () => {
        const incomingData = await fetchData(station, startDate, endDate);
        setTideData(incomingData);
        setIsLoading(false);
      })();
    }
  }, [station, startDate, endDate ]);
   
  
  // Get tide date from api
  React.useEffect(() => {
    if(tideData){
      let tempTideDate = '';
      tempTideDate = new Date(tideData.predictions[0].t);
      tempTideDate = tempTideDate.toUTCString();
      console.log('temp tide date is ' + tempTideDate);
      setTideDate(tempTideDate);
    }
    
  }, [tideData]);
  
  
  // Loading state while api is running
  if (isLoading) {
    return (
      <Loader />
    )
  } 
      
  
  // Active state after api has run
  return (
    <div>
      Api station is: {currentStation}<br />
      Current tide date is: { tideDate }
    </div>
  );
}


export default Api;