import React from 'react'
import { Outlet } from 'react-router-dom'
import { AdminNavbar } from '.'

function AdminDashboard() {
  return (
    <div className='container'>
        <AdminNavbar/>
        <Outlet/>  
    </div>
  )
}

export default AdminDashboard