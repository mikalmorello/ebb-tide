import React from "react";

function Home(props){
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
    props.history.push(`/tide/${station}`);
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
            type="text"
          />
          <input
            id="button"
            type="submit"
            value="Search"
          />
        </form>
      </section>
      
    </main>
  )
}

export default Home;