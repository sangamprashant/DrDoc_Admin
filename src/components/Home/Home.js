import React from 'react'
import Welcome from './Welcome'
import Transictions from './Transictions/Transictions'
import "./Home.css"
import CashFlow from './CashFlow'
import Employee from '../EmployeeList/Employee'
function Home() {
  return (
    <div className='row'>
    <Welcome/>
    <Transictions/>
    <CashFlow/>
    <Employee/>
    </div>
  )
}

export default Home
