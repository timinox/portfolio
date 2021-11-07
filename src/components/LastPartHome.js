import React from "react";
import "./LastPartHome.css";
import Insta from "./Insta";
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
            <a href="test.html" target="_blank" rel="noopener noreferrer">
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
            <a href="test.html" target="_blank" rel="noopener noreferrer">
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
            <a href="test.html" target="_blank" rel="noopener noreferrer">
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

function Contact({ data }) {
  return (
    <section className="container-contact">
      <h5>N'hésitez pas à me contacter pour </h5>
      <h5>
        Je suis ouvert à tout projet de site web, motion design et d'identité de
        marque
      </h5>
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
