import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//utils
import { mapRange } from "./utils.js";

//Pages
import Home from "./pages/home";
import Projet from "./pages/projet";
import PageNotFound from "./pages/PageNotFound";

//data
import TimData from "./TimData.js";

//analytics
import RouteAnalytics from "./pages/RouteAnalytics";
import ReactGA from 'react-ga';
const TRACKING_ID = "G-CP9BK30SFK"; 
ReactGA.initialize(TRACKING_ID);

//global var
let preloaded = 0;
let nodeImgs = [];
const getIndexImg = (num) => {
  if (num < 10) {
    return "000" + num;
  } else {
    return "00" + num;
  }
};
function preLoaderImg() {
  for (let i = 1; i < 61; i++) {
      let url = window.location.origin + "/sprite-main/" + getIndexImg(i) + ".png";
      var tempImage = new Image();
      tempImage.src = url.toString();
      nodeImgs.push(tempImage);
    }
}
preLoaderImg();

function App() {
  const [data, setData] = useState([]);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const [isLoading, setIsloading] = useState(true);

  const [darkTheme, setDarkTheme] = useState();
  const [colorTheme, setcolorTheme] = useState();
  const [gradientDegrees, setgradientDegrees] = useState(135);
  const TransitionDelayAnim = 0.6;

  const toggleTheme = () => {
    if (darkTheme) {
      setDarkTheme(false);
      window.localStorage.setItem("website_theme", "light");
    } else {
      setDarkTheme(true);
      window.localStorage.setItem("website_theme", "dark");
    }
  };
  const getColorTheme = () => {
    const colorTheme = window.localStorage.getItem("website_theme");
    if (colorTheme) {
      setcolorTheme(colorTheme);
    } else {
      window.localStorage.setItem("website_theme", "dark");
      setDarkTheme(true);
    }
    //console.log("color theme loaded", window.localStorage.getItem("website_theme"));
  }
  window.onscroll = () => {
    let prc = Math.floor(
      (window.pageYOffset / (document.body.clientHeight - window.innerHeight)) *
        100
    );
    let degrees = mapRange(prc, 0, 100, 135, 425);
    setgradientDegrees(degrees);
  };

  const initData = () => {
    setData(TimData)
  }

  function initFont() {
    //'Anybody[slnt,wdth,wght].ttf'
    document.fonts.ready
    .then( () =>  {
        setFontsLoaded(true);
        //console.log("fonts loaded");
      })
      .catch( () => console.log("error loading font"));
    }

  const checkImgLoad = () => {
    if(!imgLoaded){ 
      preloaded++;
      if (preloaded === 60) {
        setImgLoaded(true);
        console.log("all img load", imgLoaded);
      }
    }
  };

  useEffect(() => {
    //init data
    initData();
    
    //init color theme
    getColorTheme();

    if(!imgLoaded){
      nodeImgs.forEach( (img) => {
        img.addEventListener("load", checkImgLoad, true);
      });
    }

    //init fonts
    window.addEventListener("load", initFont);

    //console.log(data, fontsLoaded, imgLoaded);
    
    if(data.length > 1 && fontsLoaded && imgLoaded){
      setIsloading(false);
      //console.log("toggle loading", isLoading);
      document.title = "Timothé Joubert | Portfolio";
    }else{
      document.title = "Timothé Joubert | Loading";
    }
  }, [data, fontsLoaded, imgLoaded])

  useEffect(() => {
    document.querySelector("body").classList.remove("no-scroll");

  }, []);
  return ( <div
      className={
        darkTheme ? "container-pages light_mode" : "container-pages dark_mode"
      }
    >
      <div
        className="grain-effect"
        style={{
          "--angleGradient": gradientDegrees + "deg",
        }}
      ></div>
      <AnimatePresence>
        {isLoading && (
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
              <span>Loading</span>
            </div>
            <div className="loader-spinner"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && (
        <Router>
          <RouteAnalytics/>
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
                      <Projet data={data} toggleTheme={toggleTheme} setgradientDegrees={setgradientDegrees} />
                    )}
                  ></Route>

                  <Route path="*">
                    <PageNotFound toggleTheme={toggleTheme}/>
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
