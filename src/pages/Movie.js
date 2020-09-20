import {Container, ListGroup, ListGroupItem,Col, Row, Tab,FormControl, Form} from 'react-bootstrap'
import React, { useContext, useState} from 'react'
import MovieData from './MovieData'
import MovieForm from './MovieForm'
import { MovieContext } from '../context/MovieContext'


const Movie = () => {
    const [movies, setMovies] = useContext(MovieContext)
    const [query, setQuery] = useState("")
  
    const searchMovie = (query) => {
        let result = movies.filter(item => item.title.toLowerCase().includes(query.toLowerCase()))
        setMovies(result)
    }

    const handleQuery = (event) => {
        setQuery(event.target.value)
        searchMovie(event.target.value)
    }

    const submitQuery = (event) => {
        event.preventDefault()
        searchMovie(query)
        
    }
    return (
        <Container>
            
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#moviedata">
        <Row>
            <Col sm={3}>
                <h1></h1>
            <ListGroup style={{marginTop: '3.5em'}}>
                <ListGroup.Item action href="#moviedata">
                Movie Table
                </ListGroup.Item>
                <ListGroup.Item action href="#movieform">
                Input Movie
                </ListGroup.Item>
                <ListGroup.Item>
                <Form inline style={{marginTop: '5px', marginBottom :'10px'}} onSubmit={submitQuery}>
                <FormControl type="text" placeholder="Search Movie..." className="mr-sm-2" onChange={handleQuery} value={query} />
            </Form>
                </ListGroup.Item>
            </ListGroup>
            </Col>
            <Col sm={9}>
            <Tab.Content>
                <Tab.Pane eventKey="#moviedata">
                    <MovieData/>
                </Tab.Pane>
                <Tab.Pane eventKey="#movieform">
                <MovieForm />
                </Tab.Pane>
            </Tab.Content>
            </Col>
        </Row>
</Tab.Container>
</Container>
    )
}

export default Movie