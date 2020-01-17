import React from "react";
import "./current.scss";

function Current(){
  return(
    <article className="current">
      <section className="current__container">
        <div className="current__date"><time>Monday, April 22</time></div>
        <div className="current__tide">High Tide</div>
        <div className="current__time-container">
          <span className="current__time-pre">at</span>
          <time className="current__time">5:03</time>
          <span className="current__time-post">pm</span>
        </div>
        <div className="current__location">Cape Cod, MA</div>
      </section> 
    </article>
  )
}

export default Current;