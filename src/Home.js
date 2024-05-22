import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

const Home = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8000/')
            .then((res) => setData(res.data))
            .catch((err) => console.log(err))
    }, [])
    const handleDelete = (e, id) => {
        e.preventDefault();
        axios.delete(`http://localhost:8000/delete/` + id)
            .then((res) => {
                console.log(res)
                window.location.reload();
            })
            .catch((err) => console.log(err))
    }
    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <h2>Student List</h2>
                <div className='d-flex justify-content-end'>
                    <Link to="/create" className='btn btn-success'>Create +</Link>
                </div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((student, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{student.id}</td>
                                        <td>{student.name}</td>
                                        <td>{student.email}</td>
                                        <td><Link to={`read/${student.id}`} className='btn btn-primary btn-sm'>Read</Link>
                                            <Link to={`edit/${student.id}`} className='btn btn-warning btn-sm mx-2'>Edit</Link>
                                            <button onClick={(e) => handleDelete(e, student.id)} className='btn btn-danger btn-sm'>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home