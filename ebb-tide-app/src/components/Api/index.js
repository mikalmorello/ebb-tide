import React from "react";


// Api Call
const fetchData = async station => {
  const response = await fetch(
    `https://tidesandcurrents.noaa.gov/api/datagetter?product=predictions&application=NOS.COOPS.TAC.WL&begin_date=20200101&end_date=20200102&datum=MLLW&station=${station}&time_zone=lst_ldt&units=english&interval=hilo&format=json`
  );
  const json = await response.json();
  return json;
};


function Api({station}) {
  const currentStation = station;
  const [tideData, setTideData] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);
  
  // On station change, call API
  React.useEffect(() => {
    (async () => {
      const incomingData = await fetchData(station);
      setTideData(incomingData);
      setIsLoading(false);
    })();
  }, [station]);
  
  // Loading State
  if (isLoading) {
    return (
      <div>Loading...</div>
    )
  } 
  
  // Active State
  return (
    <div>
      Api station is {currentStation}
      {tideData.predictions[0].t}
    </div>
  );
}


export default Api;