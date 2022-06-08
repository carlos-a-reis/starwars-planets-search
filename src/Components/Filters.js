import React, { useContext } from 'react';
import Context from '../context/Context';

function Filters() {
  const { setFilterName } = useContext(Context);

  const handleFilterName = ({ target }) => {
    setFilterName(target.value);
  };

  return (
    <div>
      <input type="text" onChange={ handleFilterName } data-testid="name-filter" />
      <form>
        <select data-testid="column-filter">
          <option>population</option>
          <option>orbital_period</option>
          <option>diameter</option>
          <option>rotation_period</option>
          <option>surface_water</option>
        </select>
        <select data-testid="comparison-filter">
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
        <input type="number" data-testid="value-filter" />
        <button type="button" data-testid="button-filter">Filtrar</button>
      </form>
    </div>
  );
}

export default Filters;
