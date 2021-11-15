import React, { useEffect, useRef, useState } from "react";
import "./Insta.css";

let width = 0;
let height = 0;
function RepeatDiv({ posX, posY, index, mobilInsta, parent }) {
  const elToDupli = useRef(null);

  useEffect(() => {
    if(elToDupli.current){
      width = elToDupli.current.offsetWidth / 2;
      height = elToDupli.current.offsetHeight / 2;
    }
  }, []);

  const generateClick = () => {
    let rdX = Math.random() * window.innerWidth;
    let rdY = Math.random() * parent.current.getBoundingClientRect().height;
    return {x: rdX, y: rdY}
  }
  return (
    <>
    {posX && posY && (
      <div
        className={`container-img-insta img-${index}`}
        ref={elToDupli}
        key={index}
        style={{
          left: !mobilInsta ? posX - width + "px" : generateClick().x + "px",
          top: !mobilInsta ? posY - height + "px" : generateClick().y + "px",
        }}
        className="container-img-insta img1"
      >
        <h4>Click</h4>
      </div>
    )}
    </>
  );
}

let i = 1;
let cDiv, newDiv;
function Insta() {
  const [mousePos, setmousePos] = useState({ x: null, y: null });
  const [customDiv, setCustomDiv] = useState([]);
  const [mobilInsta, setMobilInsta] = useState(false);
  const [stopMove, setStopMove] = useState(true);
  const containerInsta = useRef(null);
  const help = useRef(null);
  let timerEnd;

  const cloneEl = () => {
    cDiv = customDiv;
    newDiv = {
      copyNumber: i++,
      posX: Math.floor(mousePos.x),
      posY: Math.floor(mousePos.y),
    };
    cDiv.push(newDiv);
    setCustomDiv(cDiv);

    clearTimeout(timerEnd);
    help.current.classList.remove("help-on");

    containerInsta.current.classList.remove("hide");
    timerEnd = setTimeout(mouseStopped, 2000);
  };

  function mouseStopped() {
    if (stopMove) {
      help.current.classList.add("help-on");
      if(window.innerWidth > 800){
        containerInsta.current.classList.add("hide");
      }
    } else {
      setStopMove(true);
    }
  }

  function removeImg() {
    setTimeout(() => {
      if (cDiv && cDiv.length > 1) {
        cDiv.splice(0, 1);
        setCustomDiv(cDiv);
      }
    }, 500);
  }

  const handleMouseMove = (e) => {
    const scrollDist = containerInsta.current.getBoundingClientRect().top;
    setmousePos({
      x: e.clientX,
      y: e.clientY - scrollDist,
    });
    cloneEl();
  }
  
  const runMobilAnim = () => {
    let i = 0;
    if (++i % 600 == 0){
      removeImg();
    }
    requestAnimationFrame(runMobilAnim)
  }

  useEffect(() => {
    removeImg();
    containerInsta.current.addEventListener("mousemove", handleMouseMove); 
    if(window.innerWidth < 800){
      runMobilAnim();
    }
    return () => {
      containerInsta.current.removeEventListener("mousemove", handleMouseMove);
    }
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
        // onMouseMove={MoveOnInsta}
      >
        {customDiv.length > 0 && 
          customDiv.map((cdiv, i) => {
            return (
              <RepeatDiv
                mobilInsta={window.innerWidth < 800 ? true : false} 
                parent={containerInsta}
                posX={cdiv.posX}
                posY={cdiv.posY}
                index={cdiv.copyNumber}
                key={i}
              />
            );
          })
        }
        <div ref={help} id="indication-move" className="help-on" style={{display: window.innerWidth < 800 ? "none" : "block"}}>
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
