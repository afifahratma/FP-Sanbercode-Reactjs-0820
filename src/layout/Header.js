import React, { useContext } from 'react'
import {Navbar, Nav, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { Avatar, Popover } from 'antd';
import {useHistory} from 'react-router-dom'


const HeaderBar = () => {
  let history = useHistory()
  const [user,setUser] = useContext(UserContext)
 /*  const content = (
    <div>
      <strong>Hi, {user.name}!</strong>
    </div>
  ) */

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem("user")
    alert("You've Been Logged Out")
    history.push("/")
  }
    return(
    <div>
      <Navbar bg="dark" variant="dark">
      <Nav className="mr-auto">
        <Nav.Link><Link to="/">Home</Link></Nav.Link>
        {
          user !== null && (
            <>
          <Nav.Link><Link to="/movie-list">Movie Editor</Link></Nav.Link>
          <Nav.Link><Link to="/game-list">Game Editor</Link></Nav.Link>
          </>
          )
        }
      </Nav>

      
        {
          user === null && (
            <>
            <Button variant="outline-info" style={{marginRight: '15px'}}><Link to="/Register">Register</Link></Button>
            <Button variant="outline-info"><Link to="/Login">Login</Link></Button>
            </>
          )
        }
       {
          user !== null && (
            <>
           
              <Avatar size={40} style={{marginRight: '15px', backgroundColor:'rgb(23,162,184)'}}>{user.name}</Avatar>
        
            
            <Button variant="outline-info" style={{marginRight: '15px'}}><Link to="/ChangePassword">Change Password</Link></Button>
            <Button variant="outline-info" onClick={handleLogout}>Logout</Button>
            </>
          )
        }
  
  </Navbar> 

      </div>
    )
}

export default HeaderBar