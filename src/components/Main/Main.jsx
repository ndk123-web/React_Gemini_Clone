import React, { useContext, useEffect } from "react";
import "./main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/context";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  // Log loading state change for debugging
  useEffect(() => {
    console.log("Loading state changed:", loading);
  }, [loading]);

  return (
    <div className="main">
      {/* Navbar */}
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon}></img>
      </div>

      {/* Main Content */}
      <div className="main-container">
        {!showResult ? (
          <>
            {/* Greeting Section */}
            <div className="greet">
              <p>
                <span>Hello, Dev</span>
              </p>
              <p>How Can I Help You Today?</p>
            </div>
            {/* Suggestion Cards */}
            <div className="cards">
              {["compass_icon", "bulb_icon", "message_icon", "code_icon"].map(
                (icon, index) => (
                  <div key={index} className="card">
                    <p>Suggest Beautiful Places to See on Your Trip</p>
                    <img src={assets[icon]}></img>
                  </div>
                )
              )}
            </div>
          </>
        ) : (
          <>
            {/* Result Section */}
            <div className="result">
              <div className="result-title">
                <img src={assets.user_icon}></img>
                <p>{recentPrompt}</p>
              </div>
              <div className="result-data">
                <img src={assets.gemini_icon} alt="Gemini Icon" />
                {loading && (
                  <div className="loader">
                    <hr />
                    <hr />
                    <hr />
                  </div>
                )}
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              </div>
            </div>
          </>
        )}

        {/* Input Box */}
        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter prompt here"
            ></input>
            <div>
              <img src={assets.gallery_icon}></img>
              <img src={assets.mic_icon}></img>
              <img onClick={() => onSent(input)} src={assets.send_icon}></img>
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, so double-check it.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
