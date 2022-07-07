import React, { useState, useContext, useEffect } from 'react';
import Context from '../context/Context';
import '../CSS/table.css';

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
      const sortValue = -1;
      if (Number(a[order.column]) < Number(b[order.column])) {
        return sortValue;
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
    <table className="main-table">
      <thead>
        <tr>
          <th className="colum-title">Name</th>
          <th className="colum-title">Rotation Period</th>
          <th className="colum-title">Orbital Period</th>
          <th className="colum-title">Diameter</th>
          <th className="colum-title">Climate</th>
          <th className="colum-title">Gravity</th>
          <th className="colum-title">Terrain</th>
          <th className="colum-title">Surface Water</th>
          <th className="colum-title">Population</th>
        </tr>
      </thead>

      <tbody>
        { renderData.length !== undefined && renderData.map((planet) => (
          <tr key={ planet.name }>
            <td className="table-cel">{ planet.name }</td>
            <td className="table-cel">{ planet.rotation_period }</td>
            <td className="table-cel">{ planet.orbital_period }</td>
            <td className="table-cel">{ planet.diameter }</td>
            <td className="table-cel">{ planet.climate }</td>
            <td className="table-cel">{ planet.gravity }</td>
            <td className="table-cel">{ planet.terrain }</td>
            <td className="table-cel">{ planet.surface_water }</td>
            <td className="table-cel">{ planet.population }</td>
            {/* <td className="table-cel">
              <a href={ planet.url } target="_blank" rel="noreferrer">
                <button type="button">
                  more info
                </button>
              </a>
            </td> */}
          </tr>
        )) }
      </tbody>
    </table>
  );
}

export default Table;
