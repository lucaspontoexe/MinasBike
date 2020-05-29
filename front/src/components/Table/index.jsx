import React from 'react';
import { Link } from 'react-router-dom';
import { useTable, useSortBy, useGlobalFilter } from 'react-table';
import TextBox from 'components/TextBox';

import searchIcon from 'assets/icons/search.svg';

import './styles.scss';

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

export default function Table({
  columns,
  data,
  withFilter,
  linkTo,
  updateData,
  TopHeaderComponent,
  searchText,
}) {
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
      updateData,
    },
    useGlobalFilter,
    useSortBy
  );

  return (
    <>
      <div className="top-header">
        {withFilter && (
          <GlobalFilter
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
            searchText={searchText}
          />
        )}
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
                  <div className="table-head-cell">
                    <span>{column.render('Header')}</span>
                    {/* Add a sort direction indicator */}
                    <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.length === 0 && headerGroups.length > 0 && (
            <tr>
              <td
                colSpan={headerGroups[0].headers.length}
                style={{ textAlign: 'center ', height: 96 }}
              >
                Nenhum item
              </td>
            </tr>
          )}

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
