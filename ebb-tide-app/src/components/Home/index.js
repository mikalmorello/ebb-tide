import React from "react";
import Footer from "../Footer";
import EbbtideWordmark from '../../svg/EbbtideWordmark';
import EbbtideLogo from '../../svg/EbbtideLogo';
import SearchIcon from '../../svg/SearchIcon';

import "./homepage.scss";
import "./wave.scss";
import "./form.scss";

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
		<div className="homepage">
			<header className="branding">
				<EbbtideLogo />
				<h1><EbbtideWordmark /></h1>
		    
			</header>
			<main className="main">
				<section>
					<form className="station-form" onSubmit={handleSubmit} >
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
						><SearchIcon /></button>
					</form>
		      <div className="wave"></div>
					<div className="wave"></div>
					<div className="wave"></div>
				</section>
			</main>
			<Footer />
		</div>
  )
}

export default Home;