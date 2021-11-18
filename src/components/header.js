import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { mapRange, myDist } from "../utils";

import BtnSwitchColor from "./BtnSwitchColor";

// import { mapRange } from "./../utils.js";

import "./header.css";

const SpanItem = ({children, cursor, spanClass, spanData}) => {
  let currentSpan = useRef(null);
  let maxDist = window.innerWidth/4;

  const changeStyle = () => {
    spanData.opacity = getAttr(spanData.dist, 0.06, 0.1);
    spanData.width = getAttr(spanData.dist, 80, 200);
    spanData.weight = getAttr(spanData.dist, 250, 900);
    spanData.slant = mapRange(getAttr(spanData.dist, 0, 10), 0, 10, 0, -10);
  }

  const getAttr = (dist, min, max) => {
    var wght = max - Math.abs((max * dist) / maxDist);
    return Math.max(min, wght + min);
  };

  if(currentSpan.current){
    let left = currentSpan.current.getBoundingClientRect().x;
    let top = currentSpan.current.getBoundingClientRect().y;
    let w = Math.floor(currentSpan.current.getBoundingClientRect().width);
    let h = Math.floor(currentSpan.current.getBoundingClientRect().height);

    let currentDist = myDist(cursor.x ,cursor.y, left + w,top + h)
    spanData.dist = currentDist;
    if(spanData.dist !== 0){
      changeStyle();
    }
  }

  useEffect(() => {
    return () => {
    }
  }, [cursor])

  return(
    <>
    <span 
      ref={currentSpan}
      className={spanClass} 
      style={{
        position: "relative",
        opacity: spanData.opacity,
        fontVariationSettings: `"wght" ${spanData.weight}, "wdth" ${spanData.width}, "slnt" ${spanData.slant}`
      }}
    >
      {children}
      {/* <span style={{
        position:"absolute", 
        display: "block",
        left:-5,
        right:-5,
        top:-5,
        bottom:-5,
        // border: "10px solid red",
        zIndex: -2,
        backgroundColor: "black",
        }}></span> */}
    </span>
    </>
  )
}


const Header = ({ toggleTheme, data, darkTheme, pageDelay }) => {
  const headerContainer = useRef(null);
  const [cursor, setCursor] = useState({
    x: window.innerWidth,
    y: window.innerHeight,
  });

  const handleMouseMove = (e) => {
    setCursor({
      x: e.clientX,
      y: e.clientY
    });
  }
  const handleTouchMove = (e) => {
    var t = e.touches[0];
    setCursor({
      x: t.clientX,
      y: t.clientY
    });
  }

  let spanArray = [];
  const printSpan = () => {
    let nb = 64;
    if(window.innerWidth < 600){
      nb = 40;
    }
    for (var i = 0; i < nb; i++) {
      let sItem = {
        index: null,
        posX: null,
        posY: null,
        width: null,
        height: null,
        opacity: 0.06,
        width: 80,
        weight: 250,
        slant: 0,
      }
      spanArray.push(sItem);
    }
    //console.log(spanArray);
    return spanArray;
  };
  printSpan();

  useEffect(() => {
    if(headerContainer.current){
      headerContainer.current.addEventListener("mousemove", handleMouseMove);
      headerContainer.current.addEventListener("touchmove", handleTouchMove, {passive: false,});
    }
    return () => {
      headerContainer.current.removeEventListener("mousemove", handleMouseMove);
      headerContainer.current.removeEventListener("touchmove", handleTouchMove, {passive: false,});
    }
  }, [spanArray]);

  return (
    <header ref={headerContainer}>
      <motion.div id="bg-tim"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          transition: { duration: 0.5, delay: pageDelay + 0.3 },
          scale: 1,
          opacity: 1,
        }}
      >
        {spanArray.length > 1 && (
          spanArray.map( (content, i) => {
            return( 
              <SpanItem key={i} spanClass={`spanItem-${i}`} spanData={content} cursor={cursor}>Tim</SpanItem>
            )
          })
        )}
      </motion.div>

      <div className="container-header">
        <motion.h1
          initial={{
            color: !darkTheme ? "#C4C4C4" : "#1B2229",
            textShadow:
              "0 0 0 var(--light-color), 0 0 0 var(--light-color), 0 0 0 var(--light-color), 0 0 0 var(--light-color)",
          }}
          animate={{
            transition: { duration: 0.5, delay: pageDelay },
            color: !darkTheme ? "#1B2229" : "#C4C4C4",
            textShadow:
              "1px 0 0 var(--light-color), 0 1px 0 var(--light-color), -1px 0 0 var(--light-color), 0 -1px 0 var(--light-color)",
          }}
        >
          Tim
        </motion.h1>
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          animate={{
            transition: { duration: 0.5, delay: pageDelay + 0.3 },
            y: 0,
            opacity: 1,
          }}
        >
          Designer & front-end developper
        </motion.h2>
      </div>

      <a
        href="/"
        className="scroll-down"
        onClick={(e) => {
          let ancre = document.getElementById("ancre-description");
          e.preventDefault();
          ancre && ancre.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
      >
        <span>Continuer</span>
      </a>
      <BtnSwitchColor toggleTheme={toggleTheme} />
    </header>
  );
};

export default Header;
