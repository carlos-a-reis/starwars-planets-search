import React, { useState, useEffect } from 'react';
import './App.css';
import Context from './context/Context';
import Table from './Components/Table';
import fetchPlanets from './Helpers/FetchPlanets';

function App() {
  const [value, setValue] = useState({});

  useEffect(() => {
    const getData = async () => {
      const data = await fetchPlanets();
      setValue({ data });
    };
    getData();
  }, []);

  return (
    <Context.Provider value={ value }>
      <Table />
    </Context.Provider>
  );
}

export default App;
