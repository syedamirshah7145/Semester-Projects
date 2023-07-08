import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';


export default function SignUp() {
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({ username: "", email: "", password: "", location: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.username, email: credentials.email, password: credentials.password, location: credentials.location })
        })
        const json = await response.json();

        if (!json.success) {
            alert("Enter Valid Credentials");
        }
        navigate('/login')
    }

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    };

    return (
        <>
            <div className='container mt-5'>
                <form onSubmit={handleSubmit}>
                    <div className="form-group my-2">
                        <label htmlFor="exampleName1">Name</label>
                        <input type="text" className="form-control my-1" name='username' placeholder="Name" defaultValue={credentials.username} onChange={onChange} />
                    </div>
                    <div className="form-group my-2">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="text" className="form-control my-1" name='email' placeholder="Enter email" defaultValue={credentials.email} onChange={onChange} />
                    </div>
                    <div className="form-group my-2">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="text" className="form-control my-1" name='password' placeholder="Password" defaultValue={credentials.password} onChange={onChange} />
                    </div>
                    <div className="form-group my-2">
                        <label htmlFor="exampleInputLocation1">Location</label>
                        <input type="text" className="form-control my-1" name='location' placeholder="Location" defaultValue={credentials.location} onChange={onChange} />
                    </div>
                    <button type="submit" className="btn btn-success my-3">Submit</button>
                    <Link to={"/login"} className="btn btn-danger m-3">Already a user!</Link>
                </form>
            </div>
        </>
    )
}
