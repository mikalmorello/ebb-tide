import React from "react";

function Home(){
  const initialStation = "8447505";
  const [station, setStation] = React.useState(initialStation);
  const [stationInput, setStationInput] = React.useState(initialStation);
  
  // Handle Form Change
  const handleChange = e => {
    const newTypedStation = e.target.value;
    setStationInput(newTypedStation);
  };

  // Handle Form Submit
  const handleSubmit = async e => {
    e.preventDefault();
    setStation(stationInput);
  };
  
  return(
    <main>
      <section>
        <h1>HOME PAGE</h1>
      </section>
      <section>
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
      </section>
      
    </main>
  )
}

export default Home;