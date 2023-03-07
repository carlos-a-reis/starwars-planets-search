import React from 'react';
import '../CSS/homePage.css';
import star from '../images/star.png';
import wars from '../images/wars.png';
import planets from '../images/planets-search.png';

function HomePage() {
  return (
    <div className="home-page" id="home-page">
      <img src={ star } alt="gif com a logo de Star Wars" className="star-img" />
      <img
        src={ planets }
        alt="gif com a logo de Star Wars"
        className="planets-search-img"
      />
      <img src={ wars } alt="gif com a logo de Star Wars" className="wars-img" />
    </div>
  );
}

export default HomePage;
