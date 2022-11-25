import { React } from 'react';

import Header from '../../components/Header/Header';
import Promo from '../../components/Promo/Promo';
import AboutProject from '../../components/AboutProject/AboutProject';
import Techs from '../../components/Techs/Techs';
import AboutMe from '../../components/AboutMe/AboutMe';
import Portfolio from '../../components/Portfolio/Portfolio';
import Footer from '../../components/Footer/Footer';
import Content from '../../components/Content/Content';

function Main() {
  return (
    <>
      <Header isDarkTheme />
      <Content>
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </Content>
      <Footer />
    </>
  );
}

export default Main;
