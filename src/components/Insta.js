import React, { useEffect, useRef, useState } from "react";
import "./Insta.css";

let width = 0;
let height = 0;


function ContainerInstaMobil() {
  return (
    <div  className="container-img-insta insta-mobil" >
      <h4>Instagram</h4>
    </div>
  )
}

function ContainerInstaDesktop({ posX, posY }) {
  const elToDupli = useRef(null);

  useEffect(() => {
    if(elToDupli.current){
      width = elToDupli.current.offsetWidth / 2;
      height = elToDupli.current.offsetHeight / 2;
    }
  }, []);

  return (
    <div
      className="container-img-insta"
      ref={elToDupli}
      style={{
        left: posX - width + "px",
        top: posY - height + "px",
      }}
    >
    <h4>Click</h4>
  </div>
  );
}

function RepeatDiv({ posX, posY, index, mobilInsta }) {

  return (
    <>
    {posX && posY && (
        <ContainerInstaDesktop 
          mobilInsta={mobilInsta}
          posX={posX}
          posY={posY}
        />  
    )}
    </>
  );
}

let i = 1;
let cDiv, newDiv;
function Insta() {
  const [mousePos, setmousePos] = useState({ x: null, y: null });
  const [customDiv, setCustomDiv] = useState([]);
  const [mobilInsta, setMobilInsta] = useState();
  const [stopMove, setStopMove] = useState(true);
  const containerInsta = useRef(null);
  const help = useRef(null);
  let timerEnd;

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
    timerEnd = setTimeout(mouseStopped, 3000);
  };

  function mouseStopped() {
    if (stopMove) {
      if(cDiv.length < 2){
        help.current.classList.add("help-on");
      }
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
    }, 100);
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
    removeImg();
  }

  const handleWindowResize = () => {
    if(window.innerWidth < 800){
      setMobilInsta(true);
      let insta = containerInsta.current;
      insta.classList.remove("hide");
    }else{
      setMobilInsta(false);
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () =>{
      window.removeEventListener('resize', handleWindowResize);
    }
  });

  useEffect(() => {
    if(!mobilInsta){
      removeImg();
      
      containerInsta.current.addEventListener("mousemove", handleMouseMove); 
      if(window.innerWidth < 800){
        runMobilAnim();
      }
    }
    return () => {
      containerInsta.current.removeEventListener("mousemove", handleMouseMove);
    }
  }, [mouseStopped]);

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
        {mobilInsta ? 
        <>
          <ContainerInstaMobil parent={containerInsta} mobilInsta={mobilInsta}/> 
        </>
        :
        <>
        {customDiv.length > 0 && 
            customDiv.map((cdiv, i) => {
              return (
                <RepeatDiv
                  mobilInsta={mobilInsta} 
                  posX={cdiv.posX ? cdiv.posX : null}
                  posY={cdiv.posY ? cdiv.posY : null}
                  key={i}
                />
              );
            })
          }
          </>
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
