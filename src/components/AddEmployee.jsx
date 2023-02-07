import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const AddEmployee = ({ setOpen }) => {

    const navigate = useNavigate();

    const [employeeId, setEmployeeId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('');

    const addEmployeeHandler = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/employee/add', {
                employeeId,
                firstName,
                lastName,
                email,
                phone,
                role,
            });
            toast.success('Employee added successfully')
            navigate('/employee');
            setOpen(false);

        } catch (error) {
            toast.error('Add Fail.Try Again!')
        }
    }
    return (
        <div className='quick-container'>
            <form className="formAdd" onSubmit={addEmployeeHandler}>
                <div className="card-quick">
                    <div className="card-flex">
                        <div className="card-row">
                            <input type='text' required
                                onChange={(e) => setEmployeeId(e.target.value)}
                                placeholder='Employee Id' />
                        </div>
                    </div>
                    <div className="card-flex">
                        <div className="card-row">
                            <input type='text' required
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder='First Name' />
                        </div>
                        <div className="card-row">
                            <input type='text' required
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder='Last Name' />
                        </div>
                    </div>
                    <div className="card-flex">
                        <div className="card-row">
                            <input type='email' required
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Email' />
                        </div>
                        <div className="card-row">
                            <input type='text' required
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder='Phone' />
                        </div>
                    </div>
                    <div className="card-flex">
                        <div className="card-row">
                            <input type='text'
                                className='department-input'
                                onChange={(e) => setRole(e.target.value)}
                                required placeholder='Role' />
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

export default AddEmployee
