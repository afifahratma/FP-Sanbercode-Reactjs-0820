import {Container, ListGroup, ListGroupItem,Col, Row, Tab,FormControl, Form} from 'react-bootstrap'
import React, { useContext, useState} from 'react'
import GameData from './GameData'
import GameForm from './GameForm'
import {Link as LinkRouter } from "react-router-dom"
import { GameContext } from '../context/GameContext'

const Game = () => {
    const [games, setGames] = useContext(GameContext)
    const [query, setQuery] = useState("")

    const searchGame = (query) => {
        let result = games.filter(el => el.name.toLowerCase().includes(query.toLowerCase()))
        setGames(result)
    }

    const handleQuery = (event) => {
        setQuery(event.target.value)
        searchGame(event.target.value)
    }

    const submitQuery = (event) => {
        event.preventDefault()
        searchGame(query)
    }
    return (
        <Container>
           
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#table">
        <Row>
            <Col sm={3}>
            <ListGroup style={{marginTop: '3.5em'}}>
                <ListGroup.Item action href="#table">
                Game Table
                </ListGroup.Item>
                <ListGroup.Item action href="#form">
                Input Game
                </ListGroup.Item>
                <ListGroup.Item>
                <Form inline style={{marginTop: '5px', marginBottom :'10px'}} onSubmit={submitQuery}>
                <FormControl type="text" placeholder="Search Game..." className="mr-sm-2" onChange={handleQuery} value={query} />
            </Form>
                </ListGroup.Item>
            </ListGroup>
            </Col>
            <Col sm={9}>
            <Tab.Content>
                <Tab.Pane eventKey="#table">
                <GameData/>
                </Tab.Pane>
                <Tab.Pane eventKey="#form">
                <GameForm />
                </Tab.Pane>
            </Tab.Content>
            </Col>
        </Row>
</Tab.Container>
</Container>
    )
}

export default Game