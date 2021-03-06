import React, { useContext, useState } from "react"
import {UserContext} from "../context/UserContext"
import { Form, Button } from 'react-bootstrap';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from "axios";
import {useHistory} from 'react-router-dom'

const Login = () =>{
  let history = useHistory()
  const [, setUser] = useContext(UserContext)
  const [input, setInput] = useState({username: "" , password: ""})

  const handleSubmit = (event) =>{
    event.preventDefault()
    axios.post(`https://backendexample.sanbersy.com/api/user-login`, {
      email: input.email, 
      password: input.password
    }).then(
      (res) =>{
        var user = res.data.user
        var token = res.data.token
        var currentUser = {name: user.name, email: user.email, token }
        setUser(currentUser)
        localStorage.setItem("user", JSON.stringify(currentUser))
        history.push("/")
      }
    ).catch((err) => {
      alert(err)
    })
  }

  const handleChange = (event) =>{
    let value = event.target.value
    let name = event.target.name
    switch (name){
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
      <div style={{margin: "0 auto", width: "30%", padding: "50px"}}>
    <form onSubmit={handleSubmit}>    
        <h2 style={{textAlign: 'center'}}>Login</h2>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name="email" onChange={handleChange} value={input.email}/>
          </Form.Group>
          

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange} value={input.password}/>
            <Form.Text> password must be at least 6 characters.</Form.Text>
          </Form.Group>
        
          <Button variant="primary" type="submit">
            Login
          </Button>

      </form>
    </div>
  )
}

export default Login
