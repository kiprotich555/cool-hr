import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AddUser = ({ setOpen }) => {

    const navigate = useNavigate();

    const [userId, setUserId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [role, setRole] = useState('');
    const [roleType, setRoleType] = useState('');
    const [password, setAPassword] = useState('');
    const [rPassword, setRPassword] = useState('');


    const addUserHandler = async (e) => {
        e.preventDefault();

        if (password !== rPassword) {
            toast.error('Password Does\'t not match');
            return;
        }

        try {
            await axios.post('/api/users/add', {
                userId,
                firstName,
                lastName,
                email,
                mobile,
                role,
                roleType,
                password
            });
            toast.success('User added successfully')
            navigate('/users');
            setOpen(false);

        } catch (error) {
            toast.error('Add Fail.Try Again!')
        }
    }
    return (
        <div className='quick-container'>
            <form className="formAdd" onSubmit={addUserHandler}>
                <div className="card-quick">
                    <div className="card-flex">
                        <div className="card-row">
                            <input type='text'
                                onChange={(event) => setUserId(event.target.value)}
                                required placeholder='User Id' />
                        </div>
                    </div>
                    <div className="card-flex">
                        <div className="card-row">
                            <input type='text'
                                onChange={(e) => setFirstName(e.target.value)}
                                required placeholder='First Name' />
                        </div>
                        <div className="card-row">
                            <input type='text'
                                onChange={(e) => setLastName(e.target.value)}
                                required placeholder='Last Name' />
                        </div>
                    </div>
                    <div className="card-flex">
                        <div className="card-row">
                            <input type='email'
                                onChange={(e) => setEmail(e.target.value)}
                                required placeholder='Email' />
                        </div>
                        <div className="card-row">
                            <input type='text'
                                onChange={(e) => setMobile(e.target.value)}
                                required placeholder='Mobile' />
                        </div>
                    </div>
                    <div className="card-flex">
                        <div className="card-row">
                            <input type='text'
                                onChange={(e) => setRole(e.target.value)}
                                required placeholder='Role' />
                        </div>
                        <div className="card-row">
                            <select name="" id="" onChange={(e) => setRoleType(e.target.value)}>
                                <option value="Super Admin">Super Admin</option>
                                <option value="Admin"> Admin</option>
                                <option value="HR Admin">HR Admin</option>
                                <option value="Employee">Employee</option>
                            </select>
                        </div>
                    </div>
                    <div className="card-flex">
                        <div className="card-row">
                            <input type='password'
                                onChange={(e) => setAPassword(e.target.value)}
                                required placeholder='Password' />
                        </div>
                        <div className="card-row">
                            <input type='password'
                                onChange={(e) => setRPassword(e.target.value)}
                                required placeholder='Retype Password' />
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

export default AddUser
