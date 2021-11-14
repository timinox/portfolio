import React from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

import BtnSwitchColor from "../components/BtnSwitchColor";
import "./PageNotFound.css";

const customEase = [0.43, 0.13, 0.23, 0.96];
const transitionPage = {
  duration: 0.5,
  ease: customEase,
};

const PageNotFound = ({ toggleTheme }) => {
  let location = useLocation().pathname;
  return (
    <>
      <Link to={`/`} className="header-project">
        <motion.h1
          initial={{ y: -60 }}
          animate={{
            transition: { duration: 0.5, delay: 0.5 },
            y: 0,
          }}
        >
          TIM
        </motion.h1>
      </Link>
      <BtnSwitchColor toggleTheme={toggleTheme} />
      <motion.div
        className="container-not-found"
        transition={transitionPage}
        initial={{ y: 0, opacity: 1 }}
        exit={{ y: -window.innerHeight, opacity: 0 }}
      >
        <h3>404</h3>
        {location.includes("projet") ? (
          <>
            <p>Pas de projet existant</p>
          </>
        ) : (
          <>
            <p>Pas de page existante</p>
          </>
        )}
      </motion.div>
    </>
  );
};

export default PageNotFound;
