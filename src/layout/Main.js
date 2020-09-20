
import React from "react"
import { BrowserRouter as Router } from "react-router-dom";
import FooterBar from './Footer'
import HeaderBar from "./Header"
import Section from "./Section"
import {Container} from 'react-bootstrap'



const Main = () =>{
  return(
    <>
      <Router>      
        <HeaderBar/>
        <Container>
          <Section/>
          </Container>
        <FooterBar/>
      </Router>
    </>
  )
}

export default Main