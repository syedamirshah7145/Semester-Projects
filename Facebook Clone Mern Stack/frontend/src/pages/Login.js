import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';

export default function Login() {
  const [credentials, setCredentials] = useState({email: "", password: ""});
  
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password})
    })
    const json = await response.json();

    if (!json.success) {
      alert("Enter Valid Credentials");
    }

    if(json.success){
      localStorage.setItem('user',JSON.stringify(json.userData))
      navigate(`/home/${json.userData._id}`);
    }
  }

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <>

      <div className='container mt-5'>
        <form onSubmit={handleSubmit}>
          
          <div className="form-group my-2">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="text" className="form-control my-1" name='email' placeholder="Enter email" defaultValue={credentials.email} onChange={onChange} />
          </div>
          <div className="form-group my-2">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="text" className="form-control my-1" name='password' placeholder="Password" defaultValue={credentials.password} onChange={onChange} />
          </div>

          <button type="submit" className="btn btn-success my-3">Submit</button>
          <Link to={"/createuser"} className="btn btn-danger m-3">New User!</Link>
        </form>
      </div>
    </>
  )
}
