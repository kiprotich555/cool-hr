import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const AddEvent = ({ setOpen }) => {
    const navigate = useNavigate();

    const [startAt, setStartAt] = useState('');
    const [endAt, setEndAt] = useState('');
    const [color, setColor] = useState('');
    const [summary, setSummary] = useState('');

    const addEventHandler = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/events/add', {
                startAt,
                endAt,
                summary,
                color,

            });
            toast.success('event added successfully')
            navigate('/events');
            setOpen(false);

        } catch (error) {
            toast.error('Add Fail.Try Again!')
        }
    }
    return (
        <div className='quick-container'>
            <form className="formAdd" onSubmit={addEventHandler}>
                <div className="card-quick">
                    <div className="card-flex">

                    </div>
                    <div className="card-flex">
                        <div className="card-row">
                            <input type='date'
                                onChange={(e) => setStartAt(e.target.value)}
                                required placeholder='Start Date' />
                        </div>
                        <div className="card-row">
                            <input type='date'
                                onChange={(e) => setEndAt(e.target.value)}
                                required placeholder='End Date' />
                        </div>
                    </div>
                    <div className="card-flex">
                        <div className="card-row">
                            <input type='text'
                                onChange={(e) => setSummary(e.target.value)}
                                required placeholder='summary' />
                        </div>
                        <div className="card-row">
                            <input type='color'
                                onChange={(e) => setColor(e.target.value)}
                                required placeholder='color' />
                        </div>
                    </div>
                    <div className="card-flex">
                        <div className="card-row">
                            <button className="add">Add</button>
                        </div>
                    </div>
                </div>
                <button className="back"
                    onClick={() => setOpen(false)}
                >Back</button>
            </form>
        </div>
    )
}

export default AddEvent
