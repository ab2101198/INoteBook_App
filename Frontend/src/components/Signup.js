import React, { useState } from 'react'
import {useNavigate} from 'react-router'

const Signup = (props) => {
    const[credentials, setCredentials] = useState({name:"", email: "", password:"", cpassword:""})
    let memory = useNavigate() ;
    const {name, email, password} = credentials ;
    const handleSubmit = async (e)=>{
        e.preventDefault() ;
        const response = await fetch("https://inotebook-app-backend.onrender.com/api/auth/createuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name, email, password})
        });
      const json = await response.json(); // parses JSON response into native JavaScript objects
      console.log(json) ;
      if(json.success){
        localStorage.setItem('token', json.jwtDta) ;
        memory("/")
        props.showalert("Account Created Successfully", "success") ;
      }
      else{
          props.showalert("Invalid Details", "danger") ;
      }
    }
     
    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value}) 
    }


  return (
    <div className='container mt-2'>
      <h2 className='my-3'> Create an account to use iNotebook </h2>
      <form onSubmit={handleSubmit}>
      <div className="my-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password"  name="password" onChange={onChange} minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword"  name="cpassword"  onChange={onChange} minLength={5} required/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
