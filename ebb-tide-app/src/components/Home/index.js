import React from "react";
import Footer from "../Footer";
import EbbtideWordmark from '../../svg/EbbtideWordmark';
import EbbtideLogo from '../../svg/EbbtideLogo';
import SearchIcon from '../../svg/SearchIcon';
import StationApi from '../StationApi';
import { useSelector, useDispatch } from "react-redux";

import "./homepage.scss";
import "./waves.scss";
import "./form.scss";



function stationMatch(formInput, stationList, props){
    stationList.stations.map((station, index) => {
      if((formInput === station.name) || (formInput === station.id)) {
        props.history.push(`/tide/${station.id}`);
      }
    });
}


function Home(props){
	
  // Redux function variable
  const dispatchRedux = useDispatch();
  
  // From API Redux
  const stationInput = useSelector(appState => appState.home.stationInput); 
  const stationData = useSelector(appState => appState.station.stationData);

  // Handle Form Change
  const handleChange = e => {
    const newTypedStation = e.target.value;
    dispatchRedux({ type: "setStationInput", payload: newTypedStation });
  };

  // Handle Form Submit
  const handleSubmit = async e => {
    e.preventDefault();
    dispatchRedux({ type: "setHomeStation", payload: stationInput });
    console.log(stationData);
    stationMatch(stationInput, stationData, props);
  };
  
  return(
    <div className="homepage">
      <header className="branding">
        <EbbtideLogo />
        <h1><EbbtideWordmark /></h1>
      </header>
      <main className="main">
        <section>
          <form className="station-form" onSubmit={handleSubmit} >
            <div className="autocomplete">
              <input
                className="station-form__input"
                onChange={handleChange}
                placeholder='tide location...'
                value={stationInput}
                type="text"
              />
              <button
                className="station-form__button"
                id="button"
                type="submit"
              >
                <SearchIcon />
              </button>
    {/*<StationApi stationInput={stationInput} />*/}
    <StationApi stationInput={stationInput} />
            </div>
          </form>
		      
          <div className="waves"></div>
          <div className="waves"></div>
          <div className="waves"></div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Home;