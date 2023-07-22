import { useState } from 'react'
import  Table from './components/table/Table'
import './App.css'
import fakeData from './DATA_F.json'

export default function App() {
  return (
    <div className='app'>
      <Table tableData={[...fakeData]}/>
    </div>
  )
}