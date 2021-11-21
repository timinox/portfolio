import React from "react";
import "./Footer.css";

const Footer = () => {
  const mobilReturn = () => {
    if(window.innerWidth < 500){
        return <p>Un site <strong>crée from scratch</strong> avec <br/>  <strong>html | css | réact</strong></p>
    }else{
        return <p>Un site <strong>crée from scratch</strong> avec <strong>html | css | réact</strong></p>
    }
  }
  return (
    <footer>
      {mobilReturn()}
      <p>
        par <strong>Timothé Joubert</strong>
      </p>
    </footer>
  );
};

export default Footer;
