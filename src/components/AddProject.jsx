import { useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'








const AddProject = ({ setOpen }) => {

    const navigate = useNavigate();

    const [clientName, setClientName] = useState('');
    const [project, setProject] = useState('');
    const [projectCost, setProjectCost] = useState('');
    const [payment, setPayment] = useState('');
    const [status, setStatus] = useState('');

    const addProjectHandler = async (e) => {
        e.preventDefault();

        try {
            await axios.post('/api/projects/add', {
                clientName,
                project,
                projectCost,
                payment,
                status
            });
            toast.success(' added successfully')
            navigate('/');
            setOpen(false);

        } catch (error) {
            toast.error('Add Fail.Try Again!')
        }
    }

    return (
        <div className='quick-container'>
            <form className="formAdd" onSubmit={addProjectHandler}>
                <div className="card-quick">
                    <div className="card-flex">

                    </div>
                    <div className="card-flex">
                        <div className="card-row">
                            <input type='text'
                                onChange={(e) => setClientName(e.target.value)}
                                required placeholder='Client Name' />
                        </div>
                        <div className="card-row">
                            <input type='text'
                                onChange={(e) => setProject(e.target.value)}
                                required placeholder='Project' />
                        </div>
                    </div>
                    <div className="card-flex">
                        <div className="card-row">
                            <input type='number'
                                onChange={(e) => setProjectCost(e.target.value)}
                                required
                                defaultValue={0}
                                min={0}
                                placeholder='Project cost' />
                        </div>
                        <div className="card-row">
                            <input type='text'
                                onChange={(e) => setPayment(e.target.value)}
                                required placeholder='Payment' />
                        </div>
                    </div>
                    <div className="card-flex">
                        <div className="card-row">
                            <input type='text'
                                onChange={(e) => setStatus(e.target.value)}
                                required placeholder='Status' />
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

export default AddProject
