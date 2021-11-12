import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//utils
import { mapRange } from "./utils.js";

//Pages
import Home from "./pages/home";
import Projet from "./pages/projet";
import PageNotFound from "./pages/PageNotFound";

import "./App.css";

//data
import TimData from "./TimData.js";

let preloaded = 0;
let images = [];

function App() {
  const [loaded, setLoaded] = useState(false);
  const [webFontsLoaded, setWebFontsLoaded] = useState(false);

  const [data, setData] = useState();
  const [darkTheme, setDarkTheme] = useState();
  const [colorTheme, setcolorTheme] = useState();
  const [gradientDegrees, setgradientDegrees] = useState(135);

  const TransitionDelayAnim = 0.6;

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
    let prc = Math.floor(
      (window.pageYOffset / (document.body.clientHeight - window.innerHeight)) *
        100
    );
    let degrees = mapRange(prc, 0, 100, 135, 425);
    setgradientDegrees(degrees);
  };

  useEffect(() => {
    setData(TimData);
  }, [data]);

  const getIndexImg = (num) => {
    if (num < 10) {
      return "000" + num;
    } else {
      return "00" + num;
    }
  };
  function preLoaderImg(e) {
    for (let i = 0; i < images.length; i++) {
      var tempImage = new Image();
      tempImage.addEventListener("load", progress, true);
      tempImage.src = images[i];
    }
  }
  function progress() {
    preloaded++;
    if (preloaded == images.length) {
      setLoaded(true);
    }
  }

  useEffect(() => {
    const colorTheme = window.localStorage.getItem("website_theme");
    if (colorTheme) {
      setcolorTheme(colorTheme);
    } else {
      window.localStorage.setItem("website_theme", "dark");
      setDarkTheme(true);
    }

    async function areFontsReady() {
      await document.fonts.ready;
      setWebFontsLoaded(true);
    }

    for (let i = 1; i < 61; i++) {
      let url =
        window.location.origin + "/sprite-main/" + getIndexImg(i) + ".png";
      images.push(url.toString());
    }
    areFontsReady();
    window.addEventListener("DOMContentLoaded", preLoaderImg, true);
  }, [loaded]);

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
      <AnimatePresence>
        {!loaded && !webFontsLoaded && (
          <motion.div
            className="container-loader"
            initial={{ opacity: 1 }}
            exit={{
              transition: { duration: TransitionDelayAnim },
              opacity: 0,
              transitionEnd: {
                display: "none",
              },
            }}
          >
            <div className="loader-txt">
              <span>loading</span>
            </div>
            <div className="loader-spinner"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {data && loaded && webFontsLoaded && (
        <Router>
          <Route
            render={({ location }) => (
              <AnimatePresence initial={true}>
                <Switch location={location} key={location.pathname}>
                  <Route
                    exact
                    path="/"
                    render={() => (
                      <Home
                        data={data}
                        toggleTheme={toggleTheme}
                        darkTheme={darkTheme}
                        pageDelay={TransitionDelayAnim}
                      />
                    )}
                  />
                  <Route
                    exact={true}
                    path="/projet/:slug"
                    render={() => (
                      <Projet data={data} toggleTheme={toggleTheme} />
                    )}
                  >
                    <Route>
                      <PageNotFound toggleTheme={toggleTheme} />
                    </Route>
                  </Route>
                  <Route>
                    <PageNotFound toggleTheme={toggleTheme} />
                  </Route>
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
