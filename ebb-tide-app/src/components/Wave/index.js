import React from "react";
import TideDirectionIcon from '../../svg/TideDirectionIcon';
import "./wave.scss";

function Wave(){
  
  return(
    <section className="wave">
      <div className="wave__header">
        <div className="wave__header-unitheight">
          <TideDirectionIcon /> 0.12<span className="wave__header-unit">ft</span>
        </div>
        <div className="wave__header-label">
          High
        </div>
      </div>
      <div className="wave__container">
        <div className="percentage percentage-78"></div>
      </div>
      <div className="wave__footer">
        Low
      </div>
    </section>
  )
}

export default Wave;