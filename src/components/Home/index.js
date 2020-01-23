import React from "react";
import Footer from "../Footer";
import { useSelector, useDispatch } from "react-redux";
import EbbtideWordmark from '../../svg/EbbtideWordmark';
import EbbtideLogo from '../../svg/EbbtideLogo';
import SearchIcon from '../../svg/SearchIcon';
import StationApi from '../StationApi';
import "./homepage.scss";
import "./waves.scss";
import "./form.scss";


// Station Match
function stationMatch(formInput, stationList, props, dispatchRedux){
	
	// If form input exists, convert it to lowercase
	if(formInput){
		formInput = formInput.toLowerCase();
	}
	// Loopm through stations to see if it matches the input name
	stationList.stations.map((station, index) => {
		if((formInput === (station.name).toLowerCase()) || (formInput === station.id)) {
			props.history.push(`/tide/${station.id}`);
		} else {
			return dispatchRedux({ type: "error", payload: true });
		}
	});
}

function errorMessage(error){
	if(error){
		return(
			<div className="station-form__error">error</div>
		)
	}
}

// HOME
function Home(props){
	
  // Redux function
  const dispatchRedux = useDispatch();
  
  // Redux State
  const stationInput = useSelector(appState => appState.home.stationInput),
				stationData = useSelector(appState => appState.station.stationData),
				error = useSelector(appState => appState.home.error);

  // Handle Form Change
  const handleChange = e => {
    let newTypedStation = e.target.value;
		if(newTypedStation) {
			newTypedStation = newTypedStation.toLowerCase();
		}
    dispatchRedux({ type: "setStationInput", payload: newTypedStation });
  };

  // Handle Form Submit
  const handleSubmit = async e => {
		dispatchRedux({ type: "error", payload: false });
    e.preventDefault();
    dispatchRedux({ type: "setHomeStation", payload: stationInput });
    stationMatch(stationInput, stationData, props, dispatchRedux);
  };
	
	// Check is 
  console.log(error);
	
	// Homepage View
  return (
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
							{errorMessage(error)}
    					<StationApi />
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