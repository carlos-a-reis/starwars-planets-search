import React from 'react';
import './App.css';
import Context from './context/Context';

function App() {
  return (
    <Context.Provider>
      <span>Hello!</span>
    </Context.Provider>
  );
}

export default App;
