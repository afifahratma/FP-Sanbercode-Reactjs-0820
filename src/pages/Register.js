import React, { useContext, useState } from "react"
import {UserContext} from "../context/UserContext"
import axios from "axios"
import {Form, Button} from 'react-bootstrap'
import {Link, useHistory} from "react-router-dom"

const Register = () =>{
  let history = useHistory()
  const [, setUser] = useContext(UserContext)
  const [input, setInput] = useState({name: "", email: "" , password: ""})

  const submitHandle = (event) =>{
    event.preventDefault()
    axios.post(`https://backendexample.sanbersy.com/api/register`, {
      name: input.name, 
      email: input.email, 
      password: input.password
    }).then(
      (res)=>{
        console.log(res)
        var user = res.data.user
        var token = res.data.token
        var currentUser = {name: user.name, email: user.email, token }
        setUser(currentUser)
        localStorage.setItem("user", JSON.stringify(currentUser))
        history.push("/")
      }
    ).catch((err)=>{
      alert(err)
    })
  }

  const handleChange = (event) =>{
    let value = event.target.value
    let name = event.target.name
    switch (name){
      case "name":{
        setInput({...input, name: value})
        break;
      }
      case "email":{
        setInput({...input, email: value})
        break;
      }
      case "password":{
        setInput({...input, password: value})
        break;
      }
      default:{break;}
    }
  }

  return(
  <div>
   {/*   <div style={{margin: "0 auto", width: "25%", padding: "50px"}}>
        <form onSubmit={submitHandle}>
          <label>Username: </label>
          <input type="text" name="name" onChange={handleChange} value={input.name}/>
          <br/>
          <label>Email: </label>
          <input type="email" name="email" onChange={handleChange} value={input.email}/>
          <br/>
          <label>Password: </label>
          <input type="password" name="password" onChange={handleChange} value={input.password}/>
          <br/>
          <button>Register</button>
        </form>
      </div>  */}
    
       
    <div style={{margin: "0 auto", width: "40%", padding: "50px"}}>
    <form onSubmit={submitHandle}>    
      <h2 style={{textAlign: 'center'}}>Register</h2>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" name="name" onChange={handleChange} value={input.name}/>
        </Form.Group>
        
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name="email" onChange={handleChange} value={input.email}/>
        </Form.Group>
        

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange} value={input.password}/>
          <Form.Text> password must be at least 6 characters.</Form.Text>
        </Form.Group>
      
        <Button variant="primary" type="submit" block>
          Register
        </Button><br/>
        <p style={{textAlign: 'center'}}>  already have an account? <Link to="/Login">Login</Link></p>
        

      </form>
    </div>
 </div>
  )
}

export default Register