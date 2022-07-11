import React from 'react';
import '../CSS/homePage.css';

function HomePage() {
  return (
    <div className="home-page" id="home-page">
      <h1 className="home-img">HOME</h1>

      { /* link para a parte da tabela da página */ }
      <a href="#table" className="table-link">
        TABLE
      </a>
    </div>
  );
}

export default HomePage;
