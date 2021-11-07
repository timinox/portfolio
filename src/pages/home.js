import React from "react";

//component
import Header from "../components/header";
import IntroDescription from "../components/IntroDescription";
import HomeProjects from "../components/HomeProjects";
import LastPartHome from "../components/LastPartHome";
import Footer from "../components/Footer";

const Home = ({ imageDetails, image, data, toggleTheme }) => {
  return (
    <>
      <Header data={data} toggleTheme={toggleTheme} />
      <main id="ancre-description">
        <IntroDescription content={data[0]} />
        <HomeProjects
          data={data}
          projets={data[1]}
          imageDetails={imageDetails}
        />
        <LastPartHome data={data} />
      </main>
      <Footer />
    </>
  );
};

export default Home;

{
  /* <>
      <div className="container">
        <div className="row center">
          <div className="image-container">
            <div
              className="thumbnail"
              ref={image}
              style={{
                width: imageDetails.width,
                height: imageDetails.height,
              }}
            >
              <div className="frame">
                <Link to={`/projet/yasmeen`}>
                  <ProgressiveImage
                    src={require("../images/yasmeen.webp")}
                    placeholder={require("../images/compressed-image.jpg")}
                  >
                    {(src) => (
                      <motion.img
                        src={src}
                        alt="Yasmeen Tariq"
                        whileHover={{ scale: 1.1 }}
                        transition={transition}
                      />
                    )}
                  </ProgressiveImage>
                </Link>
              </div>
            </div>
            <motion.div
              exit={{ opacity: 0 }}
              transition={transition}
              className="information"
            >
              <div className="title">Yasmeen Tariq</div>
              <div className="location">
                <span>28.538336</span>
                <span>-81.379234</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
  </> */
}
