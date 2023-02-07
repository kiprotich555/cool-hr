import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'

const Login = () => {
    const navigate = useNavigate()
    const [adminId, setAdminId] = useState('');
    const [adminPassword, setAdminPassword] = useState('');

    const loginHandler = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post('/api/admins/login', {
                adminId,
                adminPassword,
            });

            //console.log(data);

            if (data.isAdmin === true) {
                localStorage.setItem('adminInfo', JSON.stringify(data));
                toast.success('Successfully logged in as Admin.')
                navigate('/')
            } else {
                toast.error('Invalid AdminId or Password.')
            }
        } catch (error) {
            toast.error('Invalid AdminId or Password.')
        }
    }

    useEffect(() => {
        if (localStorage.getItem('adminInfo')) {
            localStorage.getItem('adminInfo');
            navigate('/')
        }
    }, [navigate])
    return (
        <div className='l-container'>
            <div className="l-row">
                <form onSubmit={loginHandler}>
                    <div className="l-groups">
                        <h2 className="l-title">Titania HR App</h2>
                        <div className="l-group">
                            <label htmlFor="ID">Admin ID</label>
                            <input type="text" id='ID'
                                onChange={(e) => setAdminId(e.target.value)}
                                required spellCheck='false' />
                        </div>
                        <div className="l-group">
                            <label htmlFor="pass">Admin Password </label>
                            <input type="password" id='pass' required
                                onChange={(e) => setAdminPassword(e.target.value)}
                            />
                        </div>
                        <div className="l-group">
                            <button className='l-btn'>Login</button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Login
