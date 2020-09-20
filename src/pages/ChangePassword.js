import axios from 'axios'
import React, {useState, useContext} from 'react'
import {Form, Button} from 'react-bootstrap'
import {UserContext} from '../context/UserContext'
import { Alert } from 'antd'

const ChangePassword = () =>{
  const currentUser = JSON.parse(localStorage.getItem("user"))
  const [user,setUser] = useContext(UserContext)
  const [input,setInput] = useState({
    current_password : "",
    new_password : "",
    new_confirm_assword : ""
})
const [messages,setMessages] = useState("");



  const handleChange = (event) => {
    let typeOfInput = event.target.name

    switch (typeOfInput) {
        case "oldPassword":
            setInput({...input,current_password:event.target.value})
            break;
        case "newPassword":
            setInput({...input,new_password:event.target.value})
            break;
        case "confirmPassword":
            setInput({...input,new_confirm_password:event.target.value})
            break;
    
        default:
            break;
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    if (input.current_password !== currentUser.password) {
      setMessages("The old password you've entered is incorrect")
      return
  }

  if (input.new_password !== input.new_confirm_password) {
    setMessages("Password does not match")
    return
}

    axios.post(`https://backendexample.sanbersy.com/api/change-password`,{
      current_password: input.current_password,
      new_password: input.new_password,
      new_confirm_password: input.new_confirm_password
    }).then(
      (res)=> {
        console.log(res)
        localStorage.setItem("user", JSON.stringify({id : currentUser.id,username: currentUser.username, password: input.new_password}))
            setMessages("Password changed successfully!")
      }
    )
    setInput({
      current_password: "",
      new_password:"",
      confirm_new_password:""
  })
  }
    return(
        <div style={{margin: "0 auto", width: "50%", padding: "50px"}}>
        <form onSubmit={handleSubmit}>    
            <h2 style={{textAlign: 'center', marginBottom: '1em'}}>Change Password</h2>
            {
             messages !== "" ? 
              <Alert message={messages} type="info" showIcon closable/>
              : null
            }
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder={user.name} readOnly />
              </Form.Group>

    
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Current Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="oldPassword" onChange={handleChange} value={input.current_password}/>
                
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="newPassword" onChange={handleChange} value={input.new_password}/>
                <Form.Text> password must be at least 6 characters.</Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm Password" name="confirmPassword" onChange={handleChange} value={input.new_confirm_password}/>
                
              </Form.Group>

              <Button variant="primary" type="submit">
                Change Password
              </Button>
        </form>
    </div>
    )
}

export default ChangePassword