import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useViewportScroll,
  useTransform,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import ProgressiveImage from "react-progressive-image";

import "./HomeProjects.css";

const customEase = [0.43, 0.13, 0.23, 0.96];
const transitionPage = { duration: 2, ease: customEase };
const transitionContainer = { duration: 0.5, delay: 0.2 };
const transitionImg = { duration: 0.3 };

function ImagesProjects({ slug, imgUrl, index }) {
  let containerTransi, imgTransi;
  if (window.location.pathname === `/projet/${slug}`) {
    containerTransi = {
      margin: 0,
      width: 0,
    };
    imgTransi = {
      y: "100%",
    };
  }
  {
    if (imgUrl.includes(".mp4")) {
      return (
        <motion.div
          className="container-img"
          key={index}
          exit={containerTransi}
          transition={transitionContainer}
        >
          <motion.video
            muted
            autoPlay
            loop
            exit={imgTransi}
            transition={transitionImg}
          >
            <source
              src={window.location.origin + `/img/${slug}-${imgUrl}`}
              type="video/mp4"
            />
          </motion.video>
        </motion.div>
      );
    } else {
      return (
        <motion.div
          className="container-img"
          key={index}
          exit={containerTransi}
          transition={transitionContainer}
        >
          <motion.img
            src={window.location.origin + `/img/${slug}-${imgUrl}`}
            alt="alt text"
            exit={imgTransi}
            transition={transitionImg}
          />
        </motion.div>
      );
    }
  }
}
function MainImgProject({ projet, index }) {
  return (
    <div className="container-img home-thumb" key={index}>
      <ProgressiveImage
        src={window.location.origin + `/img/${projet.slug}-thumb.jpg`}
        placeholder={window.location.origin + `/img/${projet.slug}-thumb.jpg`}
      >
        {(src) => <motion.img src={src} alt="alt text" />}
      </ProgressiveImage>
    </div>
  );
}
const ParseLetter = ({ word }) => {
  return (
    <>
      {word.split("").map((span, index) => {
        if (span === " ") {
          return (
            <span
              key={index}
              className="space-letter"
              style={{
                "--data-letter": index,
                height: 25,
                width: 7,
              }}
            >
              {span}
            </span>
          );
        } else {
          return (
            <span key={index} style={{ "--data-letter": index }}>
              {span}
            </span>
          );
        }
      })}
    </>
  );
};
let direction;
const transitionScroll = { duration: 0.5, ease: customEase };
function ContentMarquee({ projet, index, image, containerInfo }) {
  const { scrollYProgress } = useViewportScroll();
  // console.log(
  //   containerInfo.top / document.body.offsetHeight,
  //   containerInfo.end / document.body.offsetHeight
  // );

  if (index % 2) {
    direction = window.innerWidth; // window.innerWidth;
  } else {
    direction = -window.innerWidth;
  }

  let translateY = useTransform(
    scrollYProgress,
    [
      containerInfo.top / document.body.offsetHeight,
      containerInfo.end / document.body.offsetHeight,
    ],
    [0, direction]
  );

  // console.log(
  //   containerInfo.top / document.body.offsetHeight,
  //   containerInfo.end / document.body.offsetHeight
  // );
  return (
    <article className="project" key={index}>
      <Link
        to={`/projet/${projet.slug}`}
        onClick={() => {
          var scrollYProgress = 0;
        }}
      >
        <motion.div
          className="project-info"
          exit={{ opacity: 0 }}
          transition={transitionPage}
        >
          <h3>
            <ParseLetter word={projet.name} />
          </h3>
          <h5>
            <ParseLetter word={projet.domaine} />
          </h5>
        </motion.div>

        <motion.div
          className="project-img"
          ref={image}
          style={{
            x: translateY,
          }}
        >
          <MainImgProject projet={projet} index={index} />
          {projet.imgsHome.map((img, index) => {
            return (
              <ImagesProjects
                slug={projet.slug}
                imgUrl={img}
                key={index}
                image={image}
              />
            );
          })}
        </motion.div>
      </Link>
    </article>
  );
}

const HomeProjects = ({ data, projets, imageDetails }) => {
  const projectsContainer = useRef(null);
  const { current } = projectsContainer;
  const [containerInfo, setContainerInfo] = useState({ top: 0, end: 0 });

  const infoContainer = () => {
    setContainerInfo({
      top:
        projectsContainer.current.getBoundingClientRect().top +
        window.pageYOffset,
      end: containerInfo.top + projectsContainer.current.clientHeight,
    });
  };
  // console.log(containerInfo);
  useEffect(infoContainer, [current]);

  return (
    <section className="container-projects" ref={projectsContainer}>
      <div className="title-projet">
        <h3>Projets</h3>
      </div>

      {projets &&
        projets.map((projet, i) => {
          return (
            <ContentMarquee
              imageDetails={imageDetails}
              projet={projet}
              key={i}
              index={i}
              containerInfo={containerInfo}
            />
          );
        })}
    </section>
  );
};

export default HomeProjects;
