import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Update = () => {
    const { id } = useParams();
    const [values, setValues] = useState({
        name: '',
        email: '',
    });
    useEffect(() => {
        axios.get('http://localhost:8000/read/' + id)
            .then(res => {
                setValues({ ...values, name: res.data[0].name, email: res.data[0].email })
                console.log(res.data)
            })
            .catch((err) => console.log(err))
        // eslint-disable-next-line
    }, [id])
    const navigate = useNavigate();

    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put('http://localhost:8000/update/' + id, values)
            .then((res) => {
                console.log(res)
                navigate('/')
            })
            .catch((err) => console.log(err));
    }
    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={handleUpdate}>
                    <h2>Update Student</h2>
                    <div className="mb-2">
                        <label htmlFor="">Name</label>
                        <input type="text" placeholder='Enter Name' className='form-control' value={values.name} onChange={(e) => setValues({ ...values, name: e.target.value })} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Email</label>
                        <input type="email" placeholder='Enter Email' className='form-control' value={values.email} onChange={(e) => setValues({ ...values, email: e.target.value })} />
                    </div>
                    <button className='btn btn-success'>Update</button>
                </form>
            </div>
        </div>
    )
}

export default Update