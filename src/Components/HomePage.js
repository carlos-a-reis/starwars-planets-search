import React from 'react';
import arrow from '../images/arrow.png';
import '../CSS/homePage.css';

function HomePage() {
  return (
    <div className="home-page" id="home-page">
      <h1 className="home-img">HOME</h1>

      { /* link para a parte da tabela da página */ }
      <a href="#table" className="table-link">
        <img className="arrow-table" src={ arrow } alt="arrow" />
      </a>
    </div>
  );
}

export default HomePage;
