import React, { useEffect, useState } from "react";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import { Link, useParams } from "react-router-dom";

import "./projet.css";

//Components
import ScrollForMore from "../components/scrollForMore";

//Ease
const transition = { duration: 1.4, delay: 2, ease: [0.6, 0.01, -0.05, 0.9] };

const firstName = {
  initial: {
    y: 0,
  },
  animate: {
    y: 0,
    transition: {
      delayChildren: 0.6,
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
};
const lastName = {
  initial: {
    y: 0,
  },
  animate: {
    y: 0,
    transition: {
      delayChildren: 0.6,
      staggerChildren: 0.04,
      staggerDirection: 1,
    },
  },
};
const letter = {
  initial: {
    y: 400,
  },
  animate: {
    y: 0,
    transition: { duration: 1, ...transition },
  },
};
const ParseLetter = ({ word }) => {
  return (
    <>
      {word.split("").map((span, index) => {
        return (
          <motion.span variants={letter} key={index}>
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
            className={index === 0 ? "title-word first" : "title-word last"}
            variants={index === 0 ? firstName : lastName}
            key={index}
          >
            <ParseLetter word={word} />
          </motion.span>
        );
      })}
    </>
  );
};

let indexPrevProject;
let indexNextProject;

const Projet = ({ data, imageDetails, currentPage }) => {
  const { scrollYProgress } = useViewportScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.7]);
  const [canScroll, setCanScroll] = useState(false);
  const { slug } = useParams();
  let indexProject;

  data[1].map((projet, index) => {
    if (projet.slug === slug) {
      currentPage = projet;
      indexProject = index;
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

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 2000);

    if (canScroll === false) {
      document.querySelector("body").classList.add("no-scroll");
      // setTimeout(() => {
      //   window.scrollTo({
      //     top: 0,
      //     behavior: "smooth",
      //   });
      // }, 1000);
    } else {
      document.querySelector("body").classList.remove("no-scroll");
    }
  }, [canScroll]);

  return (
    <>
      <Link to={`/`}>
        <h1>TIM</h1>
      </Link>
      <motion.div
        onAnimationComplete={() => setCanScroll(true)}
        className="single"
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="container fluid">
          <div className="row center top-row">
            <div className="top">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: 1.5, ...transition },
                }}
                className="details"
              >
                <div className="location">
                  <span>{currentPage.domaine}</span>
                </div>
                <div className="mua">{currentPage.date}</div>
              </motion.div>
              <motion.div className="model">
                <ParseWord name={currentPage.name} />
              </motion.div>
            </div>
          </div>
          <div className="row bottom-row">
            <div className="bottom">
              <motion.div className="image-container-single">
                <motion.div
                  initial={{
                    y: "-50%",
                    width: imageDetails.width,
                    height: imageDetails.height,
                  }}
                  animate={{
                    y: 0,
                    width: "100%",
                    height: window.innerWidth > 1440 ? 1000 : 800,
                    transition: { delay: 0.2, ...transition },
                  }}
                  className="thumbnail-single"
                >
                  <motion.div
                    className="frame-single"
                    whileHover="hover"
                    transition={transition}
                  >
                    <motion.img
                      src={
                        window.location.origin +
                        `/img/${currentPage.slug}-thumb.jpg`
                      }
                      alt="an image"
                      style={{ scale: scale }}
                      initial={{ scale: 1.0 }}
                      animate={{
                        transition: { delay: 0.2, ...transition },
                        y: window.innerWidth > 1440 ? -200 : 0,
                      }}
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
            <ScrollForMore />
          </div>
        </div>
        <div className="detailed-information">
          <div className="container">
            <div className="row">
              <a
                href={currentPage.projectLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h2 className="title">
                  The insiration behind the artwork & what it means.
                </h2>
              </a>
              <p>{currentPage.description}</p>
            </div>
            <div className="container-media-project">
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
                      <video muted autoPlay loop>
                        <source
                          src={
                            window.location.origin +
                            `/img/${currentPage.slug}-${img}`
                          }
                          type="video/mp4"
                        />
                      </video>
                    </div>
                  );
                }
              })}
            </div>
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
              <Link to={`/projet/${data[1][indexNextProject].slug}`}>
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
        </div>
      </motion.div>
    </>
  );
};

export default Projet;

/*
function tuto() {
  return (
    <motion.div
      onAnimationComplete={() => setCanScroll(true)}
      className="single"
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="container fluid">
        <div className="row center top-row">
          <div className="top">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { delay: 1.2, ...transition },
              }}
              className="details"
            >
              <div className="location">
                <span>28.538336</span>
                <span>-81.379234</span>
              </div>
              <div className="mua">MUA: @mylifeascrystall</div>
            </motion.div>
            <motion.div className="model">
              <motion.span className="first" variants={firstName}>
                <motion.span variants={letter}>Y</motion.span>
                <motion.span variants={letter}>a</motion.span>
                <motion.span variants={letter}>s</motion.span>
                <motion.span variants={letter}>m</motion.span>
                <motion.span variants={letter}>e</motion.span>
                <motion.span variants={letter}>e</motion.span>
                <motion.span variants={letter}>n</motion.span>
              </motion.span>
              <motion.span className="last" variants={lastName}>
                <motion.span variants={letter}>T</motion.span>
                <motion.span variants={letter}>a</motion.span>
                <motion.span variants={letter}>r</motion.span>
                <motion.span variants={letter}>i</motion.span>
                <motion.span variants={letter}>q</motion.span>
              </motion.span>
            </motion.div>
          </div>
        </div>
        <div className="row bottom-row">
          <div className="bottom">
            <motion.div className="image-container-single">
              <motion.div
                initial={{
                  y: "-50%",
                  width: imageDetails.width,
                  height: imageDetails.height,
                }}
                animate={{
                  y: 0,
                  width: "100%",
                  height: window.innerWidth > 1440 ? 800 : 400,
                  transition: { delay: 0.2, ...transition },
                }}
                className="thumbnail-single"
              >
                <motion.div
                  className="frame-single"
                  whileHover="hover"
                  transition={transition}
                >
                  <motion.img
                    src={require("../images/yasmeen.webp")}
                    alt="an image"
                    style={{ scale: scale }}
                    initial={{ scale: 1.0 }}
                    animate={{
                      transition: { delay: 0.2, ...transition },
                      y: window.innerWidth > 1440 ? -1200 : -600,
                    }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
          <ScrollForMore />
        </div>
      </div>
      <div className="detailed-information">
        <div className="container">
          <div className="row">
            <h2 className="title">
              The insiration behind the artwork & <br /> what it means.
            </h2>
            <p>
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old. Richard McClintock, a Latin
              professor at Hampden-Sydney College in Virginia, looked up one of
              the more obscure Latin words, consectetur, from a Lorem Ipsum
              passage, and going through the cites of the word in classical
              literature, discovered the undoubtable source. Lorem Ipsum comes
              from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
              Malorum" (The Extremes of Good and Evil) by Cicero, written in 45
              BC. This book is a treatise on the theory of ethics, very popular
              during the Renaissance. The first line of Lorem Ipsum, "Lorem
              ipsum dolor sit amet..", comes from a line in section 1.10.32.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
*/
