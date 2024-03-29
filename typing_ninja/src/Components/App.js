import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "../Styles/App.css"
import Main from "../Sites/Main";
import Settings from "../Sites/Settings";
import Context from "./Context";

const App = () => {
  const [cookies, setCookie] = useCookies(["clickSoundIndexCookie"]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (cookies.clickSoundIndexCookie === undefined) {
      setCookie("clickSoundIndexCookie", 1, { path: "/" });
    }
  }, []);

  const handleRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  const updateSoundIndex = (newSoundIndex) => {
    setCookie("clickSoundIndexCookie", newSoundIndex, { path: "/" });
  };

  return (
    <div className="app">
      <Router>
        <nav className="offset-md-3">
          <img
            src={process.env.PUBLIC_URL + "/Images/logo.png"}
            alt="Logo"
            className="logo-image"
          />
          <h1 className="title">Typing ninja</h1>

          <Link to="/TypingNinja" onClick={handleRefresh}>
            <img
              src={process.env.PUBLIC_URL + "/Images/keyboard-image.png"}
              alt="Test"
              className="keyboard-image"
            />
          </Link>

          <Link to="/TypingNinja/settings">
            <img
              src={process.env.PUBLIC_URL + "/Images/settings-image.png"}
              alt="Settings"
              className="settings-image"
            />
          </Link>
          <Link to="https://github.com/Faveq/TypingNinja" target="blank">
          <img
              src={process.env.PUBLIC_URL + "/Images/github-image.png"}
              alt="Github"
              className="github-image"
            />
            </Link>
        </nav>
        <Context.Provider value={cookies.clickSoundIndexCookie}>
          <Routes>
            <Route path="/TypingNinja" exact element={<Main key={refreshKey} />} />
            <Route
              path="/TypingNinja/settings"
              element={
                <Settings
                  currentSoundIndex={cookies.clickSoundIndexCookie}
                  updateSoundIndex={updateSoundIndex}
                />
              }
            />
          </Routes>
        </Context.Provider>
       
      </Router>
    </div>
  );
};

export default App;
