import React from 'react';
import { Link } from 'react-router-dom';
import { useTable, useSortBy, useGlobalFilter } from 'react-table';
import TextBox from './TextBox';

import searchIcon from 'assets/icons/search.svg';

function GlobalFilter({ globalFilter, setGlobalFilter, searchText }) {
  return (
    <TextBox
      value={globalFilter || ''}
      onChange={e => {
        setGlobalFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={searchText || 'Pesquisar...'}
      icon={searchIcon}
    />
  );
}

export default function Table({ columns, data, linkTo, TopHeaderComponent, searchText }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy
  );

  return (
    <>
      <div className="top-header">
        <GlobalFilter
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
          searchText={searchText}
        />
        {TopHeaderComponent}
      </div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {/* Add a sort direction indicator */}
                  {/* TODO: format sort drection indicator using CSS classes */}
                  <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>
                      {/* Render link if column name is 'code' */}
                      {cell.column.id === 'code'
                        ? cell.render(<Link to={`/${linkTo}/${cell.value}`}>{cell.value}</Link>)
                        : cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
