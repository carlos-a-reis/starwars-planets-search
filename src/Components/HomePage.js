import React from 'react';
import arrow from '../images/arrow.png';
import '../CSS/homePage.css';
import logo from '../images/star-wars.png';

function HomePage() {
  return (
    <div className="home-page" id="home-page">
      <img src={ logo } alt="gif com a logo de Star Wars" className="home-img" />

      { /* link para a parte da tabela da página */ }
      <a href="#planets-search" className="table-link">
        <img className="arrow-table" src={ arrow } alt="arrow" />
      </a>
    </div>
  );
}

export default HomePage;
