import React, {Component, useState} from "react"
import axios from "axios"
import {Card, Button, Container, Col, Row} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {Layout} from 'antd'
import { BackTop } from 'antd'

function truncateString(str, num) {
  if (str.length <= num) {
    return str
  }
  return str.slice(0, num) + '...'
}

const style = {
  height: 40,
  width: 40,
  lineHeight: '40px',
  borderRadius: 4,
  backgroundColor: '#1088e9',
  color: '#fff',
  textAlign: 'center',
  fontSize: 14,
};

class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      movies: [],
      games: [],
      show: false
    }
    
  }

  componentDidMount(){
    axios.get(`https://www.backendexample.sanbersy.com/api/data-movie`)
    .then(res => {
      let movies = res.data.map(el=>{ return {
        id: el.id, 
        title: el.title, 
        year: el.year,
        rating: el.rating,
        duration: el.duration,
        genre: el.genre,
        description: el.description,
        image_url: el.image_url
      }})
      this.setState({movies})
    })
    axios.get(`https://www.backendexample.sanbersy.com/api/data-game`)
    .then(res => {
      let games = res.data.map(el=>{ return {
        id: el.id, 
        name : el.name,
        genre : el.genre,
        singlePlayer : el.singlePlayer,
        multiPlayer : el.multiplayer,
        platform : el.platform,
         release : el.release,
         image_url : el.image_url
      }})
      this.setState({games})
    })
  }

  
  render(){
    return (

        
      <>
        
        <div className="card">
         
                <div >
                  <Container >
                  <h2 style={{marginTop: '1em'}}>Movie Reviews</h2>
                  <Row md={3} style={{marginBottom:'1em'}}> 
                  {
                     this.state.movies.map((item)=>{
                       return(
                        <Col>
                          <Card border="primary" style={{marginTop: '1em', marginBottom: '1em'}}>
                          
                              <Card.Img variant="top" src={item.image_url} />
                                <Card.Body>
                                  <Card.Title>{item.title}</Card.Title>
                                  <Card.Subtitle>{item.year}</Card.Subtitle>
                                  <Card.Text>
                                  {truncateString(item.description, 50)}
                                  </Card.Text>
                                  <Button variant="primary"> 
                                  <Link className="for-link" to={`/MovieDetail/${item.id}`}>Show Detail</Link>
                                    </Button>
                                  </Card.Body>
                
                          </Card>
                        </Col> 
                            )
                          })
                        }
                    </Row>
                    </Container>
                        <hr/>
                        <BackTop>
                            <div style={style}>UP</div>
                          </BackTop>
                    <Container>
                    <h2 style={{marginTop: '1em', marginBottom: '1em'}}>Games Reviews</h2>
                    <Row md={4} style={{marginBottom:'1em'}}> 
                   
                    
                    {
                     this.state.games.map((el)=> {
                       return(
                        <Col>
                        <Card border="primary" style={{marginTop: '1em', marginBottom: '1em'}}>
                             <Card.Img variant="top" src={el.image_url} />
                                <Card.Body>
                                  <Card.Title>{el.name}</Card.Title>
                                  <Card.Subtitle>{el.release}</Card.Subtitle>
                                  <Card.Text>{el.genre}</Card.Text>
                                  <Button variant="primary"> 
                                  <Link className="for-link"to={`/GameDetail/${el.id}`}>Show Detail</Link>
                                  
                                    </Button>
                                   
                                  </Card.Body>
                
                          </Card>
                          </Col>
                            )
                          })
                        }
                      </Row>
                    </Container>

                        
                </div>
             

        </div>
      </>
    )
  }
}

export default Home