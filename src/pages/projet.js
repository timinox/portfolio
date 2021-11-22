import React, { useEffect, useState } from "react";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import { Link, useRouteMatch } from "react-router-dom";

import "./projet.css";

//Components
import ScrollForMore from "../components/scrollForMore";
import BtnSwitchColor from "../components/BtnSwitchColor";
import PageNotFound from "./PageNotFound";

//Ease
const customEase = [0.6, 0.01, -0.05, 0.9];
const transition = { duration: 1, delay: 1, ease: customEase };
const exitProjectContent = {
  duration: 0.6,
  ease: customEase,
};
const firstName = {
  initial: {
    y: -200,
  },
  animate: {
    y: 0,
    transition: {
      duration: 1,
      delayChildren: 0.8,
      staggerChildren: 0.05,
      staggerDirection: 1,
    },
  },
};
const lastName = {
  initial: {
    y: -200,
  },
  animate: {
    y: 0,
    transition: {
      duration: 1,
      delayChildren: 0.8,
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};
let exitProjet = {};
const logoAnim = {
  hidden: { y: 0 },
  show: { transition: { duration: 0.5, delay: 0.5 }, y: 0 },
};
const ParseLetter = ({ word, anim }) => {
  return (
    <>
      {word.split("").map((span, index) => {
        return (
          <motion.span variants={lastName} key={index}>
            {span}
          </motion.span>
        );
      })}
    </>
  );
};
const ParseWord = ({ name }) => {
  return (
    <>
      {name.split(" ").map((word, index) => {
        return (
          <motion.span
            className={
              index === 0
                ? `title-word title-word-${index} first `
                : `title-word title-word-${index} last`
            }
            variants={index === 0 ? firstName : lastName}
            key={index}
          >
            <ParseLetter
              word={word}
              anim={index === 0 ? firstName : lastName}
            />
          </motion.span>
        );
      })}
    </>
  );
};
const VideoParams = ({projectName, mediaName}) => { 
  if(window.innerWidth < 800){
    return(    
    <video controls >
      <source
        src={
          window.location.origin +
          `/img/${projectName}-${mediaName}`
        }
        type="video/mp4"
      />
    </video>
    )
  }else{
    return(    
      <video autoPlay loop muted >
        <source
          src={
            window.location.origin +
            `/img/${projectName}-${mediaName}`
          }
          type="video/mp4"
        />
      </video>
      )
  } 
}

let indexPrevProject, indexNextProject, currentPage, notfound;
const Projet = ({ data, toggleTheme, setgradientDegrees }) => {
  const { scrollYProgress } = useViewportScroll();
  const [windowW, setWindowW] = useState(window.innerWidth);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const [canScroll, setCanScroll] = useState(false);
  const [transitionPage, setTransipage] = useState(null);

  let slug = useRouteMatch(`/projet/:slug`).params.slug;
  let indexProject;

  data[1].map(function (projet, index) {
    if (projet.slug === slug) {
      currentPage = projet;
      indexProject = index;
    }
    if(index == data[1].length - 1){
      console.log("not slug project find in slug url");
      slug = false;
    }
  });


  if (indexProject === 0) {
    indexPrevProject = data[1].length - 1;
  } else {
    indexPrevProject = indexProject - 1;
  }
  if (indexProject >= data[1].length - 1) {
    indexNextProject = 0;
  } else {
    indexNextProject = indexProject + 1;
  }
  const contentObj = () => {
    if(currentPage){
    return currentPage.description.replace(/(?:\r\n|\r|\n)/g, "<br>");
    }
  }
  function handleScroll() {
    if (canScroll === false) {
      document.querySelector("body").classList.add("no-scroll");
    } else {
      document.querySelector("body").classList.remove("no-scroll");
      document.querySelector(".detailed-information").style.display = "block";
    }
  }

  const handleResize = () => {
    setWindowW(window.innerWidth);
  }
  if (transitionPage) {
    //console.log("transi projet");
    window.scrollTo(0, 0);
    logoAnim.hidden.y = 0;
  } else {
    //console.log("transi home");
    exitProjet = { y: window.innerHeight };
  }

  useEffect(() => {
    handleScroll();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    }
  });

  useEffect(() => {
    setgradientDegrees(135);
    if(currentPage){
      document.title = "Timothé Joubert | " + currentPage.name;
    }
  }, []);

  return (
    <>
      {!currentPage && !slug ? (
        <>
        <PageNotFound toggleTheme={toggleTheme} />
        </>
      ) : ( 
        <>
          <Link to={`/`} className="header-project">
            <motion.h1 initial="hidden" animate="show" variants={logoAnim}>
              TIM
            </motion.h1>
          </Link>
          <BtnSwitchColor
            toggleTheme={toggleTheme}
            transitionPage={transitionPage}
          />
          <motion.div
            onAnimationComplete={() => setCanScroll(true)}
            className="single"
            initial="initial"
            animate="animate"
            exit={exitProjet}
          >
            <div className="container fluid">
              <div className="row center top-row">
                <div className="top">
                  <motion.div
                    className="details"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { delay: 1, ...transition },
                    }}
                  >
                    <div className="location">
                      <span>{currentPage.domaine}</span>
                    </div>
                    <div className="date-projet">{currentPage.date}</div>
                  </motion.div>
                  <motion.div className="model">
                    <ParseWord name={currentPage.name} />
                  </motion.div>
                </div>
              </div>
              <div className="bottom-row" style={{height: windowW > 900 ? 700 : 400}}>
                <div className="bottom">
                  <motion.div className="image-container-single">
                    <motion.div
                      initial={{
                        y: "-50%",
                        width: 300,
                        height: 300,
                      }}
                      animate={{
                        y: 0,
                        width: "100%",
                        height: windowW > 900 ? windowW * 0.5 : 400,
                        transition: { delay: 0.2, ...transition },
                      }}
                      
                      className="thumbnail-single"
                    >
                      <div className="frame-single">
                        <motion.img
                          src={
                            window.location.origin +
                            `/img/${currentPage.slug}-thumb.jpg`
                          }
                          alt="an image"
                          style={{ scale: scale }}
                          initial={{ scale: 1.0, opacity: 0.5 }}
                          animate={{
                            transition: { delay: 0.2, ...transition },
                            y: windowW > 900 ? -100 : 0,
                            opacity: 1,
                          }}
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
                <ScrollForMore />
              </div>
            </div>
            <motion.div
              className="detailed-information"
              style={{ display: "none", paddingTop: windowW > 900 ?  windowW * 0.2 : 100}}
              transition={exitProjectContent}
            >
              <div className="container">
                <div className="row">
                  <div className="container-tagline">
                    {currentPage.tagline && (
                      <h2 className="title">{currentPage.tagline}</h2>
                    )}
                    {currentPage.projectLink && (
                      <a
                        href={currentPage.projectLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {currentPage.projectLinkBtn}
                      </a>
                    )}
                  </div>
                  <div>
                    <p>{contentObj()}</p>

                  </div>
                </div>
                <motion.div
                  className="container-media-project"
                  exit={{ opacity: 0 }}
                >
                  {currentPage.imgsAll.map((img, index) => {
                    if (!img.includes(".mp4")) {
                      return (
                        <div className="container-img-project" key={index}>
                          <img
                            src={
                              window.location.origin +
                              `/img/${currentPage.slug}-${img}`
                            }
                            alt="alt text"
                          />
                        </div>
                      );
                    } else {
                      return (
                        <div className="container-img-project" key={index}>
                          <VideoParams projectName={currentPage.slug} mediaName={img}/>
                        </div>
                      );
                    }
                  })}
                </motion.div>
                <section className="switch-project">
                  <Link to={`/projet/${data[1][indexPrevProject].slug}`}>
                    <div className="prev-project">
                      <h3>Prev Projet</h3>
                      <div className="prev-pro-img">
                        <img
                          src={
                            window.location.origin +
                            `/img/${data[1][indexPrevProject].slug}-thumb.jpg`
                          }
                          alt=""
                        />
                      </div>
                    </div>
                  </Link>
                  <Link
                    to={`/projet/${data[1][indexNextProject].slug}`}
                    onClick={() => setTransipage(true)}
                  >
                    <div className="next-project">
                      <h3>Next Projet</h3>
                      <div className="next-pro-img">
                        <img
                          src={
                            window.location.origin +
                            `/img/${data[1][indexNextProject].slug}-thumb.jpg`
                          }
                          alt=""
                        />
                      </div>
                    </div>
                  </Link>
                </section>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </>
  );
};

export default Projet;

/*
https://github.com/wrongakram/framermotion-react-router/blob/master/src/pages/model.js
*/
