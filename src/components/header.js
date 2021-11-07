import React, { useEffect } from "react";
import { mapRange, myDist } from "../utils";

// import Home from "../pages/home";

import "./header.css";

const Header = ({ toggleTheme, data }) => {
  var maxDist;
  var mouse = { x: 0, y: 0 };
  var cursor = {
    x: window.innerWidth,
    y: window.innerHeight,
  };

  window.addEventListener("mousemove", function (e) {
    cursor.x = e.clientX;
    cursor.y = e.clientY;
  });

  window.addEventListener(
    "touchmove",
    function (e) {
      var t = e.touches[0];
      cursor.x = t.clientX;
      cursor.y = t.clientY;
    },
    {
      passive: false,
    }
  );

  var Char = function (container, char, el) {
    var span = document.createElement("span");
    span.setAttribute("data-char", char);
    span.innerText = char;
    container.appendChild(span);
    this.el = el;

    this.getDist = function () {
      this.pos = span.getBoundingClientRect();
      return myDist(
        mouse.x,
        mouse.y,
        this.pos.x + this.pos.width,
        this.pos.y + this.pos.height
      );
    };
    this.getAttr = function (dist, min, max) {
      var wght = max - Math.abs((max * dist) / maxDist);
      return Math.max(min, wght + min);
    };
    this.update = function (args) {
      var dist = this.getDist();
      this.wdth = args.wdth ? ~~this.getAttr(dist, 50, 200) : 100;
      this.wght = args.wght ? ~~this.getAttr(dist, 100, 900) : 400;
      this.alpha = args.alpha ? this.getAttr(dist, 0.08, 0.2).toFixed(2) : 0.3;
      this.ital = args.ital ? this.getAttr(dist, 0, 1).toFixed(2) : 0;
      this.draw();
    };
    this.draw = function () {
      if (el === "bg-tim") {
        var style = "";
        style += "opacity: " + this.alpha + ";";
        // style += "justify-self: " + this.stretch() ? "stretch" : "center" + ";";
        style +=
          "font-variation-settings: 'wght' " +
          this.wght +
          ", 'wdth' " +
          this.wdth +
          ", 'ital' " +
          this.ital +
          ", 'slnt' " +
          this.ital * -10 +
          ";";
      } else {
        var style = "";
        style +=
          "font-variation-settings: 'wght' " +
          mapRange(this.wght, 100, 900, 250, 900) +
          ", 'wdth' " +
          mapRange(this.wdth, 50, 200, 90, 180) +
          ", 'ital' " +
          this.ital +
          ", 'slnt' " +
          this.ital * -10 +
          ";";
      }
      span.style = style;
    };
    return this;
  };

  var VFont = function (id) {
    this.el = id;
    this.scale = false;
    this.flex = false;
    this.alpha = true;
    this.stroke = false;
    this.width = true;
    this.weight = true;
    this.italic = true;
    this.stretch = false;
    var title,
      chars = [];
    let str = "Tim";

    this.init = function () {
      title = document.getElementById(this.el);
      //str = title.innerText;
      if (this.el === "bg-tim") {
        title.innerHTML = "";
        for (let i = 0; i < 64; i++) {
          let _char = new Char(title, str, this.el);
          chars.push(_char);
        }
      } else {
        str = title.innerText;
        title.innerHTML = "";
        for (let i = 0; i < str.length; i++) {
          let _char = new Char(title, str[i], this.el);
          chars.push(_char);
        }
      }
      this.set();
      window.addEventListener("resize", this.setSize.bind(this));
    };

    this.set = function () {
      title.className = "";
      title.className += this.flex ? " flex" : "";
      title.className += this.stroke ? " stroke" : "";
      this.setSize();
    };

    this.setSize = function () {
      var fontSize = window.innerWidth / str.length;
      if (this.scale) {
        var scaleY = (
          window.innerHeight / title.getBoundingClientRect().height
        ).toFixed(2);
        var lineHeight = scaleY * 0.8;
        title.style =
          "font-size: " +
          fontSize +
          "px; transform: scale(1," +
          scaleY +
          "); line-height: " +
          lineHeight +
          "em;";
      }
    };

    this.animate = function () {
      mouse.x += (cursor.x - mouse.x) / 10;
      mouse.y += (cursor.y - mouse.y) / 10;
      requestAnimationFrame(this.animate.bind(this));
      this.render();
    };

    this.render = function () {
      if (this.el === "bg-tim") {
        maxDist = title.getBoundingClientRect().width / 3.5;
      } else {
        maxDist = title.getBoundingClientRect().width / 2.5;
      }
      //maxDist = 400;
      for (let i = 0; i < chars.length; i++) {
        chars[i].update({
          wght: this.weight,
          wdth: this.width,
          ital: this.italic,
          alpha: this.alpha,
        });
      }
    };
    this.init();
    this.animate();
    return this;
  };

  useEffect(() => {
    let url = window.location.href.split("/");
    let target = url[url.length - 1].toLowerCase();
    let element = document.getElementById(target);
    element && element.scrollIntoView({ behavior: "smooth", block: "start" });
    new VFont("bg-tim");
  }, []);

  return (
    <header>
      <div id="bg-tim"></div>
      <div className="container-header">
        <h1>Tim</h1>
        <h2>Designer & front-end developper</h2>
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

      <div className="dark-mode-container" onClick={toggleTheme}>
        <svg
          width="31"
          height="31"
          viewBox="0 0 31 31"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="bg-picto-dark-mode"
            d="M23.8462 15.5C23.8462 20.1094 20.1095 23.8461 15.5 23.8461C10.8906 23.8461 7.15387 20.1094 7.15387 15.5C7.15387 10.8905 10.8906 7.15381 15.5 7.15381C20.1095 7.15381 23.8462 10.8905 23.8462 15.5Z"
            fill="#1B2229"
          />
          <mask
            id="mask0_236:63"
            style={{ maskType: "alpha" }}
            maskUnits="userSpaceOnUse"
            x="9"
            y="9"
            width="13"
            height="13"
          >
            <path
              d="M21.4615 15.5001C21.4615 18.7926 18.7925 21.4617 15.5 21.4617C12.2075 21.4617 9.53845 18.7926 9.53845 15.5001C9.53845 12.2076 12.2075 9.53857 15.5 9.53857C18.7925 9.53857 21.4615 12.2076 21.4615 15.5001Z"
              fill="#454B52"
            />
          </mask>
          <g id="cercle-dark-mode" mask="url(#mask0_236:63)">
            <path
              className="center-sun"
              d="M15.1025 3.17969H25.4359V29.4105H15.1025V3.17969Z"
            />
          </g>
          <g id="lines-container">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.5 0.794922C16.1585 0.794922 16.6923 1.32874 16.6923 1.98723L16.6923 4.37184C16.6923 5.03034 16.1585 5.56415 15.5 5.56415C14.8415 5.56415 14.3077 5.03034 14.3077 4.37185L14.3077 1.98723C14.3077 1.32874 14.8415 0.794922 15.5 0.794922Z"
              className="line-dark-mode"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.5 24.6411C16.1585 24.6411 16.6923 25.2639 16.6923 26.0321L16.6923 28.8142C16.6923 29.5824 16.1585 30.2052 15.5 30.2052C14.8415 30.2052 14.3077 29.5824 14.3077 28.8142L14.3077 26.0321C14.3077 25.2639 14.8415 24.6411 15.5 24.6411Z"
              className="line-dark-mode"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M22.8805 22.1086C23.4081 21.581 24.2636 21.581 24.7912 22.1086L26.6361 23.9535C27.1637 24.4811 27.1637 25.3366 26.6361 25.8642C26.1085 26.3918 25.253 26.3918 24.7254 25.8642L22.8805 24.0193C22.3529 23.4917 22.3529 22.6362 22.8805 22.1086Z"
              className="line-dark-mode"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M26.6361 4.73756C27.1637 5.26518 27.1637 6.12062 26.6361 6.64824L24.7912 8.49314C24.2635 9.02076 23.4081 9.02076 22.8805 8.49314C22.3529 7.96552 22.3529 7.11009 22.8805 6.58247L24.7254 4.73756C25.253 4.20995 26.1084 4.20995 26.6361 4.73756Z"
              className="line-dark-mode"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.96584 4.73802C4.49345 4.2104 5.34889 4.2104 5.87651 4.73802L7.72141 6.58292C8.24903 7.11054 8.24903 7.96598 7.72141 8.4936C7.1938 9.02122 6.33836 9.02122 5.81074 8.4936L3.96584 6.6487C3.43822 6.12108 3.43822 5.26564 3.96584 4.73802Z"
              className="line-dark-mode"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.7379 25.864C4.21028 25.3364 4.21028 24.4809 4.7379 23.9533L6.5828 22.1084C7.11042 21.5808 7.96586 21.5808 8.49348 22.1084C9.0211 22.636 9.0211 23.4915 8.49348 24.0191L6.64857 25.864C6.12096 26.3916 5.26552 26.3916 4.7379 25.864Z"
              className="line-dark-mode"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M31 15.4999C31 16.1584 30.3772 16.6922 29.609 16.6922L26.8269 16.6922C26.0587 16.6922 25.4359 16.1584 25.4359 15.4999C25.4359 14.8414 26.0587 14.3076 26.8269 14.3076L29.609 14.3076C30.3772 14.3076 31 14.8414 31 15.4999Z"
              className="line-dark-mode"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.56409 15.4999C5.56409 16.1584 4.9413 16.6922 4.17306 16.6922L1.39101 16.6922C0.622767 16.6922 -1.58165e-05 16.1584 -1.57877e-05 15.4999C-1.5759e-05 14.8414 0.622767 14.3076 1.39101 14.3076L4.17306 14.3076C4.9413 14.3076 5.56409 14.8414 5.56409 15.4999Z"
              className="line-dark-mode"
            />
          </g>
        </svg>
      </div>
    </header>
  );
};

export default Header;
