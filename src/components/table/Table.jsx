import React, {useMemo} from 'react'
import { useTable, useFilters } from 'react-table'
import {CSVLink} from 'react-csv'
import ColumnFilter from './ColumnFilter'
import './Table.css'

export default function Table({tableData}) {
    const data = useMemo(() => tableData, [])

    const MultipleFilter = (rows, accessor, filterValue) => {
        const filteredRows = []
        rows.forEach((row) => {
          if (filterValue.includes(row.original[accessor])) filteredRows.push(row)
        })
    
        return filteredRows
    }

    const columns = useMemo(() => [
      {header: "Coluna 1", accessor:"col1", Filter:ColumnFilter, filter:MultipleFilter},
      {header: "Coluna 2", accessor:"col2", Filter:ColumnFilter, filter: MultipleFilter},
      {header: "Coluna 3", accessor:"col3", Filter:ColumnFilter, filter: MultipleFilter}
    ], [])

    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = useTable({ columns, data }, useFilters)

    const csvRowsData = rows.map((row)=>{
        prepareRow(row)
        return row.cells.map((cell) => cell.value)
    })
    csvRowsData.unshift(["Coluna 1", "Coluna 2", "Coluna 3"])

  return (
    <div className='table-container'>
      {headerGroups.map((headerGroup) => (
        <div className='filter-container' {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, i) => (
            <div key={i}>
                {column.canFilter ? column.render('Filter') : null}
            </div>)
            )}
        </div>))
      }
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                        {column.render("header")}
                    </th>
                    ))}
                </tr>))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row)
                    return (
                    <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => (
                            <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
                        ))}
                    </tr>
                    );
                })}
            </tbody>
        </table>
        <CSVLink data={csvRowsData}>Download me</CSVLink>
    </div>
  )
}
