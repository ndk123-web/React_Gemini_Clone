import React, { useState } from "react";
import "./sidebar.css";
import { assets } from "../../assets/assets";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);

  return (
    <div className="sidebar">
      <div className="top">
        <img onClick={ () => setExtended( prev_value => !prev_value )} className="menu" src={assets.menu_icon} alt=""></img>
        <div className="new-chat">
          <img src={assets.plus_icon}></img>
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recents</p>
            <div className="recent-entry">
              <img src={assets.message_icon}></img>
              <p>What is React ...</p>
            </div>
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon}></img>
          {extended ? <p>Help</p> : null }
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon}></img>
          {extended ?<p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon}></img>
          {extended ?<p>Setting</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
