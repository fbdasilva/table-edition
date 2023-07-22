import React, {useMemo, useState} from 'react'

export default function ColumnFilter({column: { filterValue = [], setFilter, preFilteredRows, id }}) {

  const [visible, setVisible] = useState(false)
  
  const filterOptions = useMemo(() => {
    const rowsValues = new Set()
    preFilteredRows.forEach((row) => {rowsValues.add(row.values[id])})

    return [...rowsValues.values()]
  }, [id, preFilteredRows])
  
  function setFilteredValues(filterValues, value) {
    if (filterValues.includes(value)) filterValues = filterValues.filter((n) => n!== value)
    else filterValues.push(value)

    if(filterValues.length === 0) filterValues = undefined
  
    return filterValues
  }

  return (
    <div className='add-filter'>
      <span onClick={()=>{setVisible((current)=>!current)}}>Filtro</span>
      {visible ? 
      <div>{filterOptions.map((option, i) => {
        return (
            <div key={i}>
              <input id={option} name={option} value={option} type="checkbox" 
                    onChange={(e) => { setFilter(setFilteredValues(filterValue, e.target.value));}}></input>
              <label htmlFor={option}>{option}</label>
            </div>
        )
      })}</div>: null}
    </div>
  )
}
