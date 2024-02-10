import "../Styles/Settings.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
const Settings = (props) => {
  const {currentSoundIndex, updateSoundIndex} = props

  const clickSoundsNames = ["NONE", "OSU", "CLICK"]


  return (
      <div className="container">
        <div className="sounds-settings">
          <h3>Sound</h3>
          <div className="sound-buttons">
            {
              clickSoundsNames.map((value,key)=>( 
                <button className={key === currentSoundIndex ? "settings-btn active" : "settings-btn"} key={key} name={key} onClick={()=>updateSoundIndex(key)}>{value}</button>
              ))
            }
          </div>
        </div>
      </div>
  );
};

export default Settings;
