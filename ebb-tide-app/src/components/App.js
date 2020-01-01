import React from "react";

/*
  INSTRUCTIONS:
  - MAKE AN API CALL IN COMPONENTDIDMOUNT AND UPDATE STATE BY STORING THE 
    RETURNED DATA IN WEATHER
  - 
*/

const fetchData = async station => {
  const response = await fetch(
    `https://tidesandcurrents.noaa.gov/api/datagetter?product=predictions&application=NOS.COOPS.TAC.WL&begin_date=20200101&end_date=20200102&datum=MLLW&station=${station}&time_zone=lst_ldt&units=english&interval=hilo&format=json`
  );
  const json = await response.json();
  return json;
};

function App() {
  console.log("render");
  const initialStation = "8447505";
  const [station, setStation] = React.useState(initialStation);
	const [stationInput, setStationInput] = React.useState(initialStation);
  const [tideData, setTideData] = React.useState();
	const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      const incomingData = await fetchData(station);
      setTideData(incomingData);
//      console.log(incomingData);
      setIsLoading(false);
    })();
  }, [station]);

  const handleChange = e => {
    console.log(e.target.value);
    const newTypedStation = e.target.value;
    setStationInput(newTypedStation);
  };

  // async / await
  const handleSubmit = async e => {
    e.preventDefault();
    setStation(stationInput);
  };
		
		
// CONDITIONAL LOGIC TO HANDLE EMPTY STATE DATA
if (isLoading) return <div>Loading...</div>;

//  console.log(tideData.predictions);
  return (
    <div className="App">
			
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            value={stationInput}
            className="searchbar transparent"
            id="zip"
            type="text"
            placeholder="enter city, country"
          />
          <input
            className="button transparent"
            id="button"
            type="submit"
            value="GO"
          />
			
        </form>
<div className="panel">
          <h2 className="city" id="city">{station}</h2>
</div>
      {tideData.predictions[0].t}
    </div>
  );
}

export default App;
