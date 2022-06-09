import React, { useState, useContext, useEffect } from 'react';
import Context from '../context/Context';

function Table() {
  const { data, filterByName, filterByNumericValues, order } = useContext(Context);

  const [renderData, setRenderData] = useState({});
  const [numericFilterPlanets, setNumericFilterPlanets] = useState([]);

  useEffect(() => {
    if (data) {
      // filtro por nome
      const filterPlanets = data.filter((planet) => planet.name
        .toLowerCase().includes(filterByName.name));

      // filtros numericos
      const resultFilter = filterByNumericValues.reduce((acc, filter) => (
        acc.filter((planet) => {
          switch (filter.comparison) {
          case 'maior que':
            return planet[filter.column] > Number(filter.value);
          case 'menor que':
            return planet[filter.column] < Number(filter.value);
          case 'igual a':
            return planet[filter.column] === filter.value;
          default:
            return filterPlanets;
          }
        })
      ), filterPlanets);

      setNumericFilterPlanets(resultFilter);
      setRenderData(resultFilter);
    }
  }, [data, filterByName, filterByNumericValues]);

  useEffect(() => {
    // ordena os planetas pelos filtros numericos
    const compare = (a, b) => {
      const value = -1;
      if (Number(a[order.column]) < Number(b[order.column])) {
        return value;
      }
      if (Number(a[order.column]) > Number(b[order.column])) {
        return 1;
      }
      return 0;
    };

    if (order !== undefined && order.column) {
      const numberFilter = numericFilterPlanets
        .filter((filter) => filter[order.column] !== 'unknown');
      numberFilter.sort(compare);
      const unknownFilter = numericFilterPlanets
        .filter((filter) => filter[order.column] === 'unknown');

      if (order.sort === 'DESC') {
        numberFilter.reverse();
      }

      setRenderData([...numberFilter, ...unknownFilter]);
    }
  }, [order, numericFilterPlanets]);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>

      <tbody>
        { renderData.length !== undefined && renderData.map((planet) => (
          <tr key={ planet.name }>
            <td data-testid="planet-name">{ planet.name }</td>
            <td>{ planet.rotation_period }</td>
            <td>{ planet.orbital_period }</td>
            <td>{ planet.diameter }</td>
            <td>{ planet.climate }</td>
            <td>{ planet.gravity }</td>
            <td>{ planet.terrain }</td>
            <td>{ planet.surface_water }</td>
            <td>{ planet.population }</td>
            <td>{ planet.films.map((film) => film) }</td>
            <td>{ planet.created }</td>
            <td>{ planet.edited }</td>
            <td>{ planet.url }</td>
          </tr>
        )) }
      </tbody>
    </table>
  );
}

export default Table;
