import React from 'react';
import arrow from '../images/arrow.png';
import '../CSS/homePage.css';
import star from '../images/star.png';
import wars from '../images/wars.png';
import planets from '../images/planets-search.png';

function HomePage() {
  return (
    <div className="home-page" id="home-page">
      <img src={ star } alt="gif com a logo de Star Wars" className="star-img" />
      <img src={ wars } alt="gif com a logo de Star Wars" className="wars-img" />
      <img
        src={ planets }
        alt="gif com a logo de Star Wars"
        className="planets-search-img"
      />

      { /* link para a parte da tabela da página */ }
      <a href="#planets-search" className="table-link">
        <img className="arrow-table" src={ arrow } alt="arrow" />
      </a>
    </div>
  );
}

export default HomePage;
