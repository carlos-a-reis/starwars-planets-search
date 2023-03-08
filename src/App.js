import React, { useState, useEffect } from 'react';
import './CSS/App.css';
import Context from './context/Context';
import Filters from './Components/Filters';
import Table from './Components/Table';
import fetchPlanets from './Helpers/FetchPlanets';
import HomePage from './Components/HomePage';

function App() {
  const [data, setData] = useState({});
  const [value, setValue] = useState({});

  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [order, setOrder] = useState({ column: 'name', sort: 'ASC' });
  const TIMEOUT = 5000;

  useEffect(() => {
    const getData = async () => {
      const dataPlanets = await fetchPlanets();
      const sortValue = -1;
      dataPlanets.sort((a, b) => {
        if (a.name < b.name) {
          return sortValue;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      setData(dataPlanets);
    };
    getData();
  }, []);

  useEffect(() => {
    if (data.length > 1) {
      setValue({
        data,
        filterByName,
        setFilterByName,
        filterByNumericValues,
        setFilterByNumericValues,
        order,
        setOrder,
      });
    }
  }, [data, filterByName, filterByNumericValues, order]);

  setTimeout(() => {
    if (data.length !== 0) {
      const component = document.getElementById('planets-search');
      component.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, TIMEOUT);

  return (
    <main className="App">
      <HomePage />
      <Context.Provider value={ value }>
        <div className="planets-search" id="planets-search">
          <Filters />
          <Table />
        </div>
      </Context.Provider>
    </main>
  );
}

export default App;
