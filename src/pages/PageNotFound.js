import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import BtnSwitchColor from "../components/BtnSwitchColor";
import "./PageNotFound.css";

const PageNotFound = ({ toggleTheme }) => {
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
      <div className="container-not-found">
        <h3>404</h3>
      </div>
    </>
  );
};

export default PageNotFound;
