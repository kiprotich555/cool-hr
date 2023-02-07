import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const AddDepartment = ({ setOpen }) => {

    const navigate = useNavigate();

    const [departmentName, setDepartmentName] = useState('');
    const [departmentHead, setDepartmentHead] = useState('');
    const [totalEmployees, setTotalEmployee] = useState(0);


    const addDepartmentHandler = async (e) => {
        e.preventDefault();

        try {
            await axios.post('/api/departments/add', {
                departmentName,
                departmentHead,
                totalEmployees,

            });
            toast.success('Department added successfully')
            navigate('/department');
            setOpen(false);

        } catch (error) {
            toast.error('Add Fail.Try Again!')
        }
    }
    return (
        <div className='quick-container'>
            <form className="formAdd" onSubmit={addDepartmentHandler}>
                <div className="card-quick">
                    <div className="card-flex">
                        <div className="card-row">
                            <input type='text' required
                                onChange={(e) => setDepartmentName(e.target.value)}
                                placeholder='Department Name' />
                        </div>
                    </div>
                    <div className="card-flex">
                        <div className="card-row">
                            <input type='text'
                                className='department-input'
                                onChange={(e) => setDepartmentHead(e.target.value)}
                                required placeholder='Department Head' />
                        </div>

                    </div>
                    <div className="card-flex">
                        <div className="card-row">
                            <input type='number'
                                className='department-input'
                                onChange={(e) => setTotalEmployee(e.target.value)}
                                placeholder='Total Employee(s)'
                                defaultValue={0}
                                min={0} required />
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

export default AddDepartment
