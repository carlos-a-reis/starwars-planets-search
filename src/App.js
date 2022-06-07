import React, { useState, useEffect } from 'react';
import './App.css';
import Context from './context/Context';
import Filters from './Components/Filters';
import Table from './Components/Table';
import fetchPlanets from './Helpers/FetchPlanets';

function App() {
  const [value, setValue] = useState({});

  useEffect(() => {
    const getData = async () => {
      const dataPlanets = await fetchPlanets();
      setValue({
        data: dataPlanets,
        filterData: dataPlanets,
        setValue,
      });
    };
    getData();
  }, []);

  return (
    <Context.Provider value={ value }>
      <Filters />
      <Table />
    </Context.Provider>
  );
}

export default App;
