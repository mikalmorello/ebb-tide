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

  
  // Get Tide Date
  let tideDate = '';
  if(tideData){
    tideDate = new Date(tideData.predictions[0].t);
  }
  
  // Get Start Date
//  React.useEffect(() => {
//      const tempDate = new Date();
//      let tempStartDate = `${tempDate.getFullYear()}${tempDate.getMonth()+1}${tempDate.getDate()}`;
//      let tempEndDate = `${tempDate.getFullYear()}${tempDate.getMonth()+1}(${tempDate.getDate()}+1)`;
//      setStartDate(tempStartDate);
//      setEndDate(tempEndDate);
//  });

  
  // On station change, call API
  React.useEffect(() => {
      const dateToday = new Date();
      const dateTomorrow = new Date(dateToday)
        dateTomorrow.setDate(dateTomorrow.getDate() + 1);
      let tempStartDate = formatDate(dateToday);
      let tempEndDate = formatDate(dateTomorrow);
//      setStartDate(tempStartDate);
//      setEndDate(tempEndDate);
    (async () => {
      const incomingData = await fetchData(station, tempStartDate, tempEndDate);
      setTideData(incomingData);
      setIsLoading(false);
    })();
  }, [station]);
  
  // Loading State
  if (isLoading) {
    return (
      <Loader />
    )
  } 
  
  // Active State
  return (
    <div>
      Api station is {currentStation}
      <br />
      { tideDate.toUTCString() }
    </div>
  );
}


export default Api;