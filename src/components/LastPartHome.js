import React, { useState, useEffect, useRef } from "react";
import "./LastPartHome.css";

import { mapRange, clamp } from "../utils";
import Insta from "./Insta";

import { motion, useViewportScroll, useTransform } from "framer-motion";

function About({ data }) {
  return (
    <section className="container-cv">
      <article className="container-formation">
        <div className="title-cv">
          <h3>Formations</h3>
        </div>
        <div className="content-cv">
          <div className="box-cv">
            <h4>Master 2</h4>
            <p>Faculté Lyon 2, Lyon</p>
          </div>
          <div className="box-cv">
            <h4>DSAA</h4>
            <p>Lycée La Martinière Diderot, Lyon</p>
          </div>
          <div className="box-cv">
            <h4>DEC</h4>
            <p>Cégep de Matane, Québec</p>
          </div>
          <div className="box-cv">
            <h4>BTS</h4>
            <p>Lycée L. D. Vinci, Villefontaine</p>
          </div>
        </div>
      </article>

      <article className="container-experience">
        <div className="title-cv">
          <h3>Expériences</h3>
        </div>
        <div className="content-cv">
          <div className="box-cv">
            <h4>En recherche de stage</h4>
            <p>De 4 à 6 mois à partir de février 2021</p>
          </div>
          <div className="box-cv">
            <a
              href="https://www.screen-club.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h4 className="link">Screen Club</h4>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1.04102 17.2217L17.041 1.22168" />
                <path d="M1 1L17 1L17 17" />
              </svg>
            </a>
            <p>Développeur indépendant - Lyon </p>
          </div>
          <div className="box-cv">
            <a
              href="https://monolith.agency/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h4>Monolith</h4>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1.04102 17.2217L17.041 1.22168" />
                <path d="M1 1L17 1L17 17" />
              </svg>
            </a>
            <p>Studio de design graphique et de création web - Montréal</p>
          </div>
          <div className="box-cv">
            <a
              href="http://www.lesabattoirs.fr/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h4>Les abattoirs</h4>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1.04102 17.2217L17.041 1.22168" />
                <path d="M1 1L17 1L17 17" />
              </svg>
            </a>
            <p>Scène de musique urbaine - Villefontaine</p>
          </div>
        </div>
      </article>

      <article className="container-reference">
        <div className="title-cv">
          <h3>Référence</h3>
        </div>
        <div className="content-cv">
          <a
            href="https://diplomes.etapes.com/pogote-moi-cette-fonte/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="box-cv">
              <p>Publication</p>
              <p>Etape</p>
              <p>2021</p>
            </div>
          </a>
          <a
            href="https://www.lamartinierediderot.fr/jpo/jpo2021_jeu.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="box-cv">
              <p>Site web Expérimental</p>
              <p>La martinière diderot</p>
              <p>2020</p>
            </div>
          </a>
        </div>
      </article>
    </section>
  );
}
let startContainer;
let stopContainer;
function Contact({ data }) {
  const { scrollYProgress } = useViewportScroll();
  const containerContact = useRef(null);
  const imgLength = 15;
  // const [startContainer, setStartContainer] = useState(0);
  // const [stopContainer, setStopContainer] = useState(0);

  const initContainerSize = () => {
    startContainer =
      containerContact.current.getBoundingClientRect().top +
      window.innerHeight / 2 +
      window.pageYOffset;
    stopContainer =
      startContainer -
      window.innerHeight / 2 +
      containerContact.current.clientHeight;
  };

  let value = clamp(
    Math.floor(
      mapRange(
        scrollYProgress.current,
        startContainer / document.body.scrollHeight,
        stopContainer / document.body.scrollHeight,
        0,
        imgLength
      )
    ),
    0,
    imgLength
  );
  console.log(value);
  useEffect(() => {
    initContainerSize();
    // console.log(value, startContainer, stopContainer);
  });

  return (
    <section className="container-contact" ref={containerContact}>
      <h5>N'hésitez pas à me contacter</h5>
      <div className="container-img-contact">
        <img
          src={window.location.origin + `/sprite-at/_At_Sign-${value}.png`}
          alt="alt text"
        />
      </div>
    </section>
  );
}

const LastPartHome = ({ data }) => (
  <>
    <About data={data[2]} />
    <Insta />
    <Contact data={data[3]} />
  </>
);

export default LastPartHome;
