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

function Home(props){
	
	// Redux function variable
  const dispatchRedux = useDispatch();
  
	// From API Redux
  const station = useSelector(appState => appState.home.station);
	const stationInput = useSelector(appState => appState.home.stationInput);
	
	
  // Handle Form Change
  const handleChange = e => {
    const newTypedStation = e.target.value;
//    setStationInput(newTypedStation);
		dispatchRedux({ type: "setStationInput", payload: newTypedStation });
  };

  // Handle Form Submit
  const handleSubmit = async e => {
    e.preventDefault();
//    setStation(stationInput);
		dispatchRedux({ type: "setStation", payload: stationInput });
    props.history.push(`/tide/${station}`);
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