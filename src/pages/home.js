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
