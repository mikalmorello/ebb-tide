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
	console.log('station match running');
	// If form input exists, convert it to lowercase
	if(formInput){
		formInput = formInput.toLowerCase();
	}
	// Loopm through stations to see if it matches the input name
	stationList.stations.map((station, index) => {
		if((formInput === (station.name).toLowerCase()) || (formInput === station.id)) {
			props.history.push(`/tide/${station.id}`);
		} else {
			dispatchRedux({ type: "errorCheck", payload: true });
		}
		return;
	});
}

function errorMessage(errors){
	console.log('error function is running ' + errors);
	if(errors){
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
		e.preventDefault();
		dispatchRedux({ type: "errorCheck", payload: false });
    dispatchRedux({ type: "setHomeStation", payload: stationInput });
    stationMatch(stationInput, stationData, props, dispatchRedux);
  };
	
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