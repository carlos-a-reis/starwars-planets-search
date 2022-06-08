import React, { useContext, useState, useEffect } from 'react';
import Context from '../context/Context';

function Filters() {
  const {
    setFilterByName,
    setFilterByNumericValues,
    filterByNumericValues,
  } = useContext(Context);

  const [optionsType, setOptionsType] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water']);
  const [optionsTypeDisabled, setOptionsTypeDisabled] = useState(false);

  const [type, setType] = useState(optionsType[0]);
  const [operator, setOperator] = useState('maior que');
  const [value, setValue] = useState(0);

  const handleFilterName = ({ target }) => {
    setFilterByName({ name: target.value });
  };

  const saveFilter = (event) => {
    event.preventDefault();
    setFilterByNumericValues([
      ...filterByNumericValues,
      {
        column: type,
        comparison: operator,
        value,
      },
    ]);

    const newOptionsType = optionsType.filter((option) => option !== type);
    setOptionsType(newOptionsType);
  };

  useEffect(() => {
    if (optionsType.length === 0) setOptionsTypeDisabled(true);
    setType(optionsType[0]);
  }, [optionsType]);

  return (
    <div>
      <input type="text" onChange={ handleFilterName } data-testid="name-filter" />
      <form>

        <select
          value={ type }
          onChange={ ({ target }) => setType(target.value) }
          disabled={ optionsTypeDisabled }
          data-testid="column-filter"
        >
          { optionsType.map((typeOption) => (
            <option key={ typeOption }>{ typeOption }</option>
          )) }
        </select>

        <select
          value={ operator }
          onChange={ ({ target }) => setOperator(target.value) }
          data-testid="comparison-filter"
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>

        <input
          type="number"
          value={ value }
          onChange={ ({ target }) => setValue(target.value) }
          data-testid="value-filter"
        />

        <button
          type="submit"
          onClick={ saveFilter }
          disabled={ optionsTypeDisabled }
          data-testid="button-filter"
        >
          Filtrar
        </button>

      </form>
    </div>
  );
}

export default Filters;
