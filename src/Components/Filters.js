import React, { useContext, useState, useEffect } from 'react';
import Context from '../context/Context';
import '../CSS/filters.css';

function Filters() {
  const {
    setFilterByName,
    setFilterByNumericValues,
    filterByNumericValues,
    setOrder,
  } = useContext(Context);

  const options = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];
  const [optionsType, setOptionsType] = useState(options);
  const [optionsTypeDisabled, setOptionsTypeDisabled] = useState(false);

  const [type, setType] = useState(optionsType[0]);
  const [operator, setOperator] = useState('greater than');
  const [value, setValue] = useState(0);

  const [sortType, setSortType] = useState('population');
  const [sortOrder, setSortOrder] = useState('ASC');

  const saveFilter = () => {
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

  const deleteFilter = (deletedFilter) => {
    if (deletedFilter === 'all') {
      setFilterByNumericValues([]);

      setOptionsType(options);

      setOptionsTypeDisabled(false);
    } else {
      const newFilter = filterByNumericValues
        .filter((filter) => filter.column !== deletedFilter);
      setFilterByNumericValues(newFilter);

      const newOptionsType = options.filter((option) => option === deletedFilter
        || optionsType.includes(option));
      setOptionsType(newOptionsType);

      setOptionsTypeDisabled(false);
    }
  };

  useEffect(() => {
    if (optionsType.length === 0) setOptionsTypeDisabled(true);
    setType(optionsType[0]);
  }, [optionsType]);

  return (
    <div className="forms">
      <input
        className="search-input"
        type="text"
        onChange={ ({ target }) => setFilterByName({ name: target.value }) }
      />

      <div className="filter-forms">

        {/* formulario de filtros */}
        <form className="filters">
          <input
            type="text"
            maxLength="15"
            value={ value }
            onChange={ ({ target }) => setValue(target.value) }
            disabled={ optionsTypeDisabled }
          />

          <select
            className="select-filter"
            value={ type }
            onChange={ ({ target }) => setType(target.value) }
            disabled={ optionsTypeDisabled }
          >
            { optionsType.map((typeOption) => (
              <option key={ typeOption }>{ typeOption }</option>
            )) }
          </select>

          <select
            className="select-comparation"
            value={ operator }
            onChange={ ({ target }) => setOperator(target.value) }
            disabled={ optionsTypeDisabled }
          >
            <option>greater than</option>
            <option>less than</option>
            <option>equal to</option>
          </select>

        </form>

        {/* formulario de ordem */}
        <form className="orders">
          <select
            onChange={ ({ target }) => setSortType(target.value) }
          >
            { options.map((option) => <option key={ option }>{ option }</option>) }
          </select>

          <label htmlFor="ASC">
            Ascending
            <input
              type="radio"
              value="ASC"
              id="ASC"
              name="sort"
              onClick={ ({ target }) => setSortOrder(target.value) }
            />
          </label>

          <label htmlFor="DESC">
            Descending
            <input
              type="radio"
              value="DESC"
              id="DESC"
              name="sort"
              onClick={ ({ target }) => setSortOrder(target.value) }
            />
          </label>

        </form>
      </div>

      <div className="buttons">
        <button
          className="filter-button"
          type="button"
          onClick={ saveFilter }
          disabled={ optionsTypeDisabled }
        >
          Filter
        </button>

        <button
          className="filter-button"
          type="button"
          onClick={ () => setOrder({ column: sortType, sort: sortOrder }) }
        >
          Order
        </button>
        {/* remover todos os filtros */}
        <button
          className="remove-filters"
          type="button"
          onClick={ () => deleteFilter('all') }
        >
          Remove Filters
        </button>
      </div>

      {/* lista de filtros */}
      <ul className="filter-list">
        { filterByNumericValues !== undefined && filterByNumericValues
          .map((filter) => (
            <li
              className="filter-item"
              key={ filter.column }
            >
              {`${filter.column} ${filter.comparison} ${filter.value}`}
              <button
                type="button"
                onClick={ () => deleteFilter(filter.column) }
              >
                X
              </button>
            </li>
          )) }
      </ul>
    </div>
  );
}

export default Filters;
