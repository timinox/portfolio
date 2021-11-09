import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

//utils
import { mapRange } from "./utils.js";

//Pages
import Home from "./pages/home";
import Projet from "./pages/projet";

//data
import TimData from "./TimData.js";

//Styles
// import "./App.scss";
import "./App.css";

function App() {
  const [data, setData] = useState();
  const [darkTheme, setDarkTheme] = useState();
  const [colorTheme, setcolorTheme] = useState();
  const [gradientDegrees, setgradientDegrees] = useState(135);

  const getCurrentTheme = () => {
    const colorTheme = window.localStorage.getItem("website_theme");
    if (colorTheme) {
      setcolorTheme(colorTheme);
    } else {
      window.localStorage.setItem("website_theme", "dark");
      setDarkTheme(true);
    }
  };

  const toggleTheme = () => {
    console.log(darkTheme, colorTheme);
    if (darkTheme) {
      setDarkTheme(false);
      window.localStorage.setItem("website_theme", "light");
    } else {
      setDarkTheme(true);
      window.localStorage.setItem("website_theme", "dark");
    }
  };

  window.onscroll = () => {
    moveGrandient(window.pageYOffset);
  };

  const moveGrandient = (y) => {
    let prc = Math.floor(
      (y / (document.body.clientHeight - window.innerHeight)) * 100
    );
    let degrees = mapRange(prc, 0, 100, 135, 325);
    setgradientDegrees(degrees);
  };

  useEffect(() => {
    setData(TimData);
  }, [data]);

  useEffect(() => {
    getCurrentTheme();
  }, []);

  return (
    <div
      className={
        darkTheme ? "container-pages light_mode" : "container-pages dark_mode"
      }
    >
      <div
        className="grain-effect"
        style={{
          backgroundImage: "url(" + window.location.origin + "/grain.png)",
          "--angleGradient": gradientDegrees + "deg",
        }}
      ></div>
      {data && (
        <Router>
          <Route
            render={({ location }) => (
              <AnimatePresence initial={true}>
                <Switch location={location} key={location.pathname}>
                  <Route
                    exact
                    path="/"
                    render={() => (
                      <Home data={data} toggleTheme={toggleTheme} />
                    )}
                  />
                  <Route
                    exact
                    path="/projet/:slug"
                    render={() => (
                      <Projet data={data} toggleTheme={toggleTheme} />
                    )}
                  />
                </Switch>
              </AnimatePresence>
            )}
          />
        </Router>
      )}
    </div>
  );
}

export default App;
