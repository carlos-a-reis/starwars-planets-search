import React, { useState, useEffect } from 'react';
import './App.css';
import Context from './context/Context';
import Filters from './Components/Filters';
import Table from './Components/Table';
import fetchPlanets from './Helpers/FetchPlanets';

function App() {
  const [data, setData] = useState({});
  const [value, setValue] = useState({});

  const [filterName, setFilterName] = useState('');

  useEffect(() => {
    const getData = async () => {
      const dataPlanets = await fetchPlanets();
      setData(dataPlanets);
    };
    getData();
  }, []);

  useEffect(() => {
    if (data.length > 1) {
      setValue({
        data,
        setFilterName,
        filterByName: {
          name: filterName,
        },
      });
    }
  }, [data, filterName]);

  return (
    <Context.Provider value={ value }>
      <Filters />
      <Table />
    </Context.Provider>
  );
}

export default App;
