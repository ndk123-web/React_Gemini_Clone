import React, { useState, useContext } from "react";
import "./sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/context";
import run from "../../config/gemini";

const Sidebar = () => {
  const [extended, setExtended] = useState(false); // Sidebar toggle state
  const { onSent, prevPrompt, setRecentPrompt, setInput, input, newChat } =
    useContext(Context);

  // Load and execute previous prompt
  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    setInput(prompt);
    await onSent(prompt);
  };

  return (
    <div className="sidebar">
      <div className="top">
        {/* Toggle sidebar */}
        <img
          onClick={() => setExtended((prev_value) => !prev_value)}
          className="menu"
          src={assets.menu_icon}
          alt=""
        ></img>
        {/* Start new chat */}
        <div onClick={() => newChat()} className="new-chat">
          <img src={assets.plus_icon}></img>
          {extended ? <p>New Chat</p> : null}
        </div>
        {/* Show previous prompts if extended */}
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recents</p>
            {prevPrompt.map((history, index) => (
              <div
                key={index}
                onClick={() => loadPrompt(history)}
                className="recent-entry"
              >
                <img src={assets.message_icon}></img>
                <p>{history.slice(0, 18)} ...</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
      {/* Sidebar bottom options */}
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon}></img>
          {extended ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon}></img>
          {extended ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon}></img>
          {extended ? <p>Setting</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
