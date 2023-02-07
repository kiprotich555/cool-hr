
import React, { useState } from 'react'
import bcrypt from 'bcryptjs'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const Settings = () => {

    const navigate = useNavigate('')

    const adminInfo = localStorage.getItem('adminInfo')
        ? JSON.parse(localStorage.getItem('adminInfo'))
        : null;
    //console.log(adminInfo);

    const userOldPassword = adminInfo.adminPassword;
    console.log(userOldPassword);

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [rNewPassword, setRNewPassword] = useState('');

    const updateHandler = async (e) => {
        e.preventDefault();

        async function compareIt(oldPassword) {
            const validPassword = await bcrypt.compare(oldPassword, userOldPassword);

            if (validPassword !== true) {
                toast.error('Old password is not correct')
            } else {
                if (newPassword === rNewPassword) {
                    try {

                        const { data } = await axios.put('/api/admins/update', {
                            _id: adminInfo._id,
                            newPassword
                        })
                        localStorage.removeItem('adminInfo', JSON.stringify(data));
                        toast.success('Password Updated Successfully')
                        navigate('/login')

                    } catch (error) {
                        toast.error('Password Not Updated')
                    }
                } else {
                    toast.error('Password does not match!')
                }
            }
        }
        compareIt(oldPassword);
    }

    return (
        <div className='l-container down'>
            <div className="l-row">
                <form onSubmit={updateHandler}>
                    <div className="l-groups">
                        <h2 className="l-title">Settings</h2>
                        <div className="l-group">
                            <label htmlFor="ID">Admin ID</label>
                            <input type="text" id='ID' required spellCheck='false' defaultValue={adminInfo.adminId} />
                        </div>
                        <div className="l-group">
                            <label htmlFor="o_pass">Admin Old Password </label>
                            <input type="password" id='o_pass'
                                onChange={(e) => setOldPassword(e.target.value)}
                                required />
                        </div>
                        <div className="l-group">
                            <label htmlFor="n_pass">Admin New Password </label>
                            <input type="password" id='n_pass'
                                onChange={(e) => setNewPassword(e.target.value)}
                                required />
                        </div>
                        <div className="l-group">
                            <label htmlFor="r_pass">Admin Retype New Password </label>
                            <input type="password" id='r_pass'
                                onChange={(e) => setRNewPassword(e.target.value)}
                                required />
                        </div>
                        <div className="l-group">
                            <button className='l-btn'>Update</button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Settings
