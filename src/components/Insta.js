import React, { useEffect, useRef, useState } from "react";
import "./Insta.css";

let width = 0;
let height = 0;
function RepeatDiv({ posX, posY, index }) {
  const elToDupli = useRef(null);

  useEffect(() => {
    width = elToDupli.current.offsetWidth / 2;
    height = elToDupli.current.offsetHeight / 2;
  }, []);

  return (
    <div
      className={`container-img-insta img-${index}`}
      ref={elToDupli}
      key={index}
      style={{
        left: posX - width + "px",
        top: posY - height + "px",
      }}
      className="container-img-insta img1"
    >
      <h4>Click</h4>
    </div>
  );
}
let i = 1;
let cDiv, newDiv;
function Insta() {
  const [mousePos, setmousePos] = useState({ x: null, y: null });
  const [customDiv, setCustomDiv] = useState([]);
  const [stopMove, setStopMove] = useState(true);
  const containerInsta = useRef(null);
  const help = useRef(null);
  let timerEnd;

  function MoveOnInsta(e) {
    const scrollDist = containerInsta.current.getBoundingClientRect().top;
    setmousePos({
      x: e.clientX,
      y: e.clientY - scrollDist,
    });
    cloneEl();
  }

  const cloneEl = () => {
    cDiv = customDiv;
    newDiv = {
      copyNumber: i++,
      posX: mousePos.x,
      posY: mousePos.y,
    };
    cDiv.push(newDiv);
    setCustomDiv(cDiv);

    clearTimeout(timerEnd);
    help.current.classList.remove("help-on");

    containerInsta.current.classList.remove("hide");
    timerEnd = setTimeout(mouseStopped, 2000);
  };

  function mouseStopped() {
    setStopMove(true);
    help.current.classList.add("help-on");
    containerInsta.current.classList.add("hide");
  }

  function removeImg() {
    setTimeout(() => {
      if (cDiv && cDiv.length > 0) {
        cDiv.splice(0, 1);
        setCustomDiv(cDiv);
      }
    }, 400);
  }

  useEffect(() => {
    removeImg();
  }, [removeImg]);

  return (
    <section className="playground-insta">
      <div className="title-projet">
        <h3>Voir davantage</h3>
      </div>
      <a
        ref={containerInsta}
        href="https://www.instagram.com/thim_ox/"
        target="_blank"
        rel="noopener noreferrer"
        onMouseMove={MoveOnInsta}
      >
        {customDiv.length > 0 &&
          customDiv.map((cdiv, i) => {
            return (
              <RepeatDiv
                posX={cdiv.posX}
                posY={cdiv.posY}
                index={cdiv.copyNumber}
                key={i}
              />
            );
          })}
        <div ref={help} id="indication-move" className="help-on">
          <p>déplacer votre curseur</p>
          <svg
            className="cursor-help"
            width="62"
            height="77"
            viewBox="0 0 62 77"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M31 1L61 76L31 63L1 76L31 1Z" />
          </svg>
        </div>
      </a>
    </section>
  );
}

export default Insta;
