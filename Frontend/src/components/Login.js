import React, { useState } from 'react'
import {useNavigate} from 'react-router'

const Login = (props) => {
    const[credentials, setCredentials] = useState({email: "", password:""})
    let memory = useNavigate() ;
    const handleSubmit = async (e)=>{
        e.preventDefault() ;
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email:credentials.email, password:credentials.password})
        });
      const json = await response.json(); // parses JSON response into native JavaScript objects
      console.log(json) ;
      if(json.success){
        localStorage.setItem('token', json.jwtDta) ;
        props.showalert("Logged In  Successfully", "success") ;
        memory("/")
      }
      else{
        props.showalert("Invalid Credentials", "danger") ;
      }
    }
     
    const onChange = (e)=>{
       
        setCredentials({...credentials, [e.target.name]: e.target.value}) 
    }

    return (
        <div className='mt-3'>
            <h2>Login to continue to iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input onChange={onChange} value={credentials.email} type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input onChange={onChange} value={credentials.password} type="password" className="form-control" id="password" name='password'/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
