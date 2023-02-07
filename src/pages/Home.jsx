import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Top from '../components/Top'
import Dashboard from './Dashboard'
import Department from './Department'
import Employee from './Employee'
import Users from './Users'
import Events from './Events'
import Holiday from './Holiday'
import Account from './Account'
import Settings from './Settings'


const Home = () => {
    return (
        <div>
            <div className="container">
                <div className="row">
                    <Sidebar />
                </div>
                <div className="row">
                    <div className="col">
                        <Top />
                    </div>
                    <div className="col">
                        <Routes>
                            <Route path='/' element={<Dashboard />} />
                            <Route path='/users' element={<Users />} />
                            <Route path='/department' element={<Department />} />
                            <Route path='/employee' element={<Employee />} />
                            <Route path='/events' element={<Events />} />
                            <Route path='/holidays' element={<Holiday />} />
                            <Route path='/accounts' element={<Account />} />
                            <Route path='/settings' element={<Settings />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
