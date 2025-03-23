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

  useEffect(() => {
    console.log("Loading state changed:", loading);
  }, [loading]);

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon}></img>
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello,Dev</span>
              </p>
              <p>How Can i Help you Today ? </p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest Beautiful Places to see upcoming trip</p>
                <img src={assets.compass_icon}></img>
              </div>
              <div className="card">
                <p>Suggest Beautiful Places to see upcoming trip</p>
                <img src={assets.bulb_icon}></img>
              </div>
              <div className="card">
                <p>Suggest Beautiful Places to see upcoming trip</p>
                <img src={assets.message_icon}></img>
              </div>
              <div className="card">
                <p>Suggest Beautiful Places to see upcoming trip</p>
                <img src={assets.code_icon}></img>
              </div>
            </div>
          </>
        ) : (
          <>
            {" "}
            <div className="result">
              <div className="result-title">
                <img src={assets.user_icon}></img>
                <p>{recentPrompt}</p>
              </div>
              <div className="result-data">
                <img src={assets.gemini_icon} alt="Gemini Icon" />
                {loading && 
                  <div className="loader">
                    <hr />
                    <hr />
                    <hr />
                  </div>
}
                  <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                
              </div>
            </div>
          </>
        )}

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
            Gemini May display inaccurate info , including about people , so
            double check it
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
