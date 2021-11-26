import React, {useEffect} from "react";

//component
import Header from "../components/header";
import IntroDescription from "../components/IntroDescription";
import HomeProjects from "../components/HomeProjects";
import LastPartHome from "../components/LastPartHome";
import Footer from "../components/Footer";

const Home = ({
  data,
  toggleTheme,
  darkTheme,
  pageDelay,
}) => {
  useEffect(() => {
    document.title = "Timothé Joubert | Portfolio";
  }, []);
  return (
    <>
      <Header
        data={data}
        toggleTheme={toggleTheme}
        darkTheme={darkTheme}
        pageDelay={pageDelay}
      />
      <main id="ancre-description">
        <IntroDescription content={data[0]} />
        <HomeProjects
          data={data}
          projets={data[1]}
        />
        <LastPartHome data={data} />
      </main>
      <Footer />
    </>
  );
};

export default Home;
