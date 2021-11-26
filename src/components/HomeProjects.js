import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import ProgressiveImage from "react-progressive-image";

import "./HomeProjects.css";

const customEase = [0.43, 0.13, 0.23, 0.96];
const transitionPage = {
  duration: 0.6,
  ease: customEase,
  delayChildren: 1.2,
  staggerChildren: 0.25,
};
let direction;

const textMotion = {
  rest: {
    y: 40,
  },
  hover: {
    y: 0,
  },
};

function ImagesProjects({ slug, name, imgUrl, index }) {
  {
    if (imgUrl.includes(".mp4")) {
      return (
        <div className="container-img" key={index}>
          <video muted autoPlay loop>
            <source
              src={window.location.origin + `/img/${slug}-${imgUrl}`}
              type="video/mp4"
            />
          </video>
        </div>
      );
    } else {
      return (
        <div className="container-img" key={index}>
          <img
            src={window.location.origin + `/img/${slug}-${imgUrl}`}
            alt={`Projet ${name}`}
          />
        </div>
      );
    }
  }
}
function MainImgProject({ projet, index }) {
  // const refThumb = useRef(null);
  // const getThumbSize = () => {
  //   let thumbSize = {
  //     width: refThumb.current.innerHeight,
  //     height: refThumb.current.innerWidth,
  //   };
  // };
  // useEffect(() => {
  //   getThumbSize();
  // }, []);

  return (
    <div className="container-img home-thumb" key={index}>
      <ProgressiveImage
        src={window.location.origin + `/img/${projet.slug}-thumb-hd.jpg`}
        placeholder={window.location.origin + `/img/${projet.slug}-thumb.jpg`}
        alt={`Projet ${projet.name} | thumbnail`}
      >
        {(src) => <motion.img src={src} alt={`Projet ${projet.name} | thumbnail`} />}
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
            <motion.span
              key={index}
              className="space-letter"
              style={{
                "--data-letter": index,
                width: 7,
              }}
            >
              {span}
            </motion.span>
          );
        } else {
          return (
            <motion.span key={index} style={{ "--data-letter": index }}>
              {span}
            </motion.span>
          );
        }
      })}
    </>
  );
};

function ContentMarquee({ projet, index, image, containerInfo }) {
  const { scrollYProgress } = useViewportScroll();
  const [translateY, setTranslateY] = useState(0);

  if (index % 2) {
    direction = window.innerHeight * 1.2; // window.innerWidth;
  } else {
    direction = -window.innerHeight * 1.2;
  }

  const move = useTransform(
    scrollYProgress,
    [
      (containerInfo.top - window.innerHeight) / document.body.offsetHeight ,
      (containerInfo.end + window.innerHeight * 2) / document.body.offsetHeight,
    ],
    [0, direction]
  );

  useEffect(() => {
    setTranslateY(move);
  }, []);

  return (
    <motion.article
      className="project"
      key={index}
      transition={transitionPage}
      // initial="rest"
      // whileHover="hover"
      // animate="rest"
      exit={{ x: -direction * 2, opacity: 0 }}
    >
      <Link to={`/projet/${projet.slug}`}>
        <motion.div className="project-info">
          <h3>
            <ParseLetter word={projet.name} />
          </h3>
          <h5>
            <ParseLetter word={projet.domaine} variants={textMotion} />
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
                name={projet.name}
                imgUrl={img}
                key={index}
                image={image}
              />
            );
          })}
        </motion.div>
      </Link>
    </motion.article>
  );
}

const HomeProjects = ({ data, projets }) => {
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
      <motion.div
        className="title-projet"
        exit={{ opacity: 0 }}
        transition={transitionPage}
      >
        <h3>Projets</h3>
      </motion.div>

      {projets &&
        projets.map((projet, i) => {
          return (
            <ContentMarquee
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
