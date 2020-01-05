import React from "react";

const fetchData = async station => {
  const response = await fetch(
    `https://tidesandcurrents.noaa.gov/api/datagetter?product=predictions&application=NOS.COOPS.TAC.WL&begin_date=20200101&end_date=20200102&datum=MLLW&station=${station}&time_zone=lst_ldt&units=english&interval=hilo&format=json`
  );
  const json = await response.json();
  return json;
};

function Api() {
  const initialStation = "8447505";
  const [station, setStation] = React.useState(initialStation);
  const [stationInput, setStationInput] = React.useState(initialStation);
  const [tideData, setTideData] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      const incomingData = await fetchData(station);
      setTideData(incomingData);
      setIsLoading(false);
    })();
  }, [station]);

  const handleChange = e => {
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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          value={stationInput}
          id="zip"
          type="text"
        />
        <input
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


export default Api;