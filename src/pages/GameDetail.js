import React, {useState,useEffect} from 'react'
import {useParams} from "react-router-dom"
import axios from 'axios'
import {Container, Row, Col, Card, ListGroup} from 'react-bootstrap'

const GameDetail = () => {
    const {id} = useParams()
    const [games, setGames] =  useState(null)

    useEffect( () => {
        if (games === null){
          axios.get(`https://www.backendexample.sanbersy.com/api/data-game/${id}`)
          .then(res => {
              setGames(res.data)
              
          })
        }
      }, [games, setGames])
      
      return (
          <div>
              {
                  games !== null && (
                      <Container>
                          <Card style={{marginTop: '3.5em'}}>
                            <Row style={{margin:'5px'}}>
                                <Col >
                                <img id="img-detail" alt="poster" src={games.image_url}/>
                                </Col>
                                <Col  xs={6}>
                                    <ListGroup variant="flush">
                                    <ListGroup.Item><h1>{games.name} </h1></ListGroup.Item>
                                    <ListGroup.Item><Card.Subtitle>Release : {games.release}</Card.Subtitle></ListGroup.Item>
                                    <ListGroup.Item>Description : {games.genre}</ListGroup.Item>
                                    <ListGroup.Item>Platform: {games.platform}</ListGroup.Item>
                                    <ListGroup.Item>Player: {games.multiPlayer}{games.singlePlayer}</ListGroup.Item>
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

export default GameDetail