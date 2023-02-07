import React, { useEffect } from 'react'
import { FaCog, FaLock } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const Top = () => {

    const navigate = useNavigate();

    const logoutHandler = (e) => {
        localStorage.removeItem('adminInfo');
        toast.success('successfully logged out as an admin')
        navigate('/login')

    }
    useEffect(() => {
        if (!localStorage.getItem('adminInfo')) {
            localStorage.getItem('adminInfo');
            navigate('/login')
        }
    }, [navigate]);

    return (
        <div className='t-container'>
            <div className="t-row">
                <div className="t-link">
                    <Link to='/settings' className='t-settings'>
                        <FaCog />
                        Settings
                    </Link>
                    <span className='t-logout' onClick={logoutHandler}>
                        <FaLock /> Logout
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Top