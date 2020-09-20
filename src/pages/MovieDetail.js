import React, {useState,useEffect} from 'react'
import {useParams} from "react-router-dom"
import axios from 'axios'
import {Container, Row, Col, Card, ListGroup} from 'react-bootstrap'

const MovieDetail = () =>{
  const {id} = useParams()
    const [movies, setMovies] =  useState(null)
   
     useEffect( () => {
        if (movies === null){
          axios.get(`https://www.backendexample.sanbersy.com/api/data-movie/${id}`)
          .then(res => {
              setMovies(res.data)
              
          })
        }
      }, [movies, setMovies])

      return(
        <div>
      
            {
            movies !== null && (
                <Container>
                  <Card style={{marginTop: '3.5em'}}>
                  <Row style={{margin:'5px'}}>
                    <Col >
                    <img id="img-detail" alt="poster" src={movies.image_url}/>
                    </Col>
                    <Col  xs={6}>
                    <ListGroup variant="flush">
                    <ListGroup.Item><h1>{movies.title} ({movies.year})</h1></ListGroup.Item>
                    <ListGroup.Item><Card.Subtitle>Rating : {movies.rating}/10</Card.Subtitle></ListGroup.Item>
                    <ListGroup.Item>Duration : {movies.duration} minutes</ListGroup.Item>
                    <ListGroup.Item>Genre : {movies.genre}</ListGroup.Item>
                    <ListGroup.Item>Description : {movies.description}</ListGroup.Item>
                    <ListGroup.Item>Review : {movies.review}</ListGroup.Item>
                  </ListGroup>
                    </Col>
                  </Row>
                 
              </Card>
              </Container>
            )
            
            }
              </div>
    
      )
}

export default MovieDetail