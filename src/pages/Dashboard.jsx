import React, { useEffect, useState } from 'react'
import { FaCalendar, FaHotel, FaIdCard, FaUserAlt } from 'react-icons/fa'
import Project from '../components/Project'

import axios from 'axios'

const Dashboard = () => {

    const [users, setUsers] = useState(0);
    const [holidays, setHolidays] = useState(0);
    const [events, setEvents] = useState(0);
    const [accountNumber, setAccountNumber] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const resultUsers = await axios.get('/api/users/countUsers');
            setUsers(resultUsers.data);

            const resultHolidays = await axios.get('/api/holidays/countHolidays');
            setHolidays(resultHolidays.data);

            const resultAccoutNumber = await axios.get('/api/accounts/countAccounts');
            setAccountNumber(resultAccoutNumber.data);

            const resultEvents = await axios.get('/api/events/countEvents');
            setEvents(resultEvents.data);

        }
        fetchData();
    }, [])

    const adminInfo = localStorage.getItem('adminInfo')
        ? JSON.parse(localStorage.getItem('adminInfo'))
        : null;
    return (
        <div className='d-container'>
            <div className="d-row">
                <h1 className="d-title">Welcome {adminInfo.adminName} </h1>
            </div>
            <div className="d-row">
                <div className="d-groups">
                    <div className="d-group">
                        <div className="d-badge">{users?.count}</div>
                        <div className="d-content">

                            <FaUserAlt />
                            <span className='d-subtitle'>Users</span>
                        </div>
                    </div>
                    <div className="d-group">
                        <div className="d-badge">{holidays?.count}</div>
                        <div className="d-content">

                            <FaHotel />
                            <span className='d-subtitle'>Holidays</span>
                        </div>
                    </div>
                    <div className="d-group">
                        <div className="d-badge">{events?.count}</div>
                        <div className="d-content">

                            <FaCalendar />
                            <span className='d-subtitle'>Events</span>
                        </div>
                    </div>
                    <div className="d-group">
                        <div className="d-badge">{accountNumber?.count}</div>
                        <div className="d-content">

                            <FaIdCard />
                            <span className='d-subtitle'>Accounts</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-row">
                {/* <div className="d-charts">
                    <div className="d-chart">
                        <SalaryChart />
                    </div>
                    <div className="d-chart">
                        <RevenueChart />
                    </div>
                </div> */}
                <div className="d-projects">
                    <Project />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
