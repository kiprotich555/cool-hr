import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Holiday = () => {

    const [holidays, setHolidays] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const resultHolidays = await axios.get('/api/holidays/all');

            const resultHolidaysData = resultHolidays.data;

            setHolidays(resultHolidaysData);
        }
        fetchData();
    }, []);
    return (
        <div className='h-container'>
            <div className="h-row">
                <h3 className="h-title">Holidays</h3>
            </div>
            <div className="h-row">
                <div className="h-table">
                    <table>
                        <thead>
                            <tr>
                                <th>DAY</th>
                                <th>DATE</th>
                                <th>HOLIDAY</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                holidays.length === 0 ? (
                                    <h1>Loading Holidays...</h1>
                                ) : (
                                    holidays.map((item) => (
                                        <tr key={item._id}>
                                            <td>{item.day}</td>
                                            <td>{item.date}</td>
                                            <td>{item.holiday}</td>
                                        </tr>
                                    ))
                                )
                            }


                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Holiday
