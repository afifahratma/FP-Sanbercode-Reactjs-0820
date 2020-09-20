import React, { useContext } from 'react'
import axios from 'axios'
import { MovieContext } from '../context/MovieContext'
import {Form, Row,Col, Container, Button} from 'react-bootstrap'
import {UserContext} from '../context/UserContext'
import {useHistory} from 'react-router-dom'

const MovieForm = ({}) => {
    let history = useHistory()
    const [movies, setMovies, inputMovie, setInputMovie] = useContext(MovieContext)
    const [user] = useContext(UserContext)

    const submitForm = (event) => {
        event.preventDefault()
        let title = inputMovie.title
        let description = inputMovie.description
        let year = parseInt(inputMovie.year)
        let duration = parseInt(inputMovie.duration)
        let genre = inputMovie.genre
        let rating = parseInt(inputMovie.rating)
        let review = inputMovie.review
        let image_url = inputMovie.image_url

        if (inputMovie.id === null){
            axios.post(`https://backendexample.sanbersy.com/api/data-movie`,{title, description, year, duration, genre, rating, review, image_url}, {headers: {"Authorization" : `Bearer ${user.token}`}})
            .then( res => {
                setMovies([...movies,{id : res.data.id, title, description, year, duration, genre, rating, review, image_url }])
             
            })
        }else{
            axios.put(`http://backendexample.sanbercloud.com/api/data-movie/${inputMovie.id}`,{title, description, year, duration, genre, rating, review, image_url}, {headers: {"Authorization" : `Bearer ${user.token}`}})
            .then( res => {
                let newMovie = movies.find(x => x.id === inputMovie.id)
                newMovie.description = description
                newMovie.year = year
                newMovie.duration = duration
                newMovie.genre = genre
                newMovie.rating = rating
                newMovie.review = rating
                newMovie.image_url = image_url

                setMovies([...movies])
                
            }) 
            .catch(error => {
                console.log(error)
            })
        }

        setInputMovie({id: null, 
                title: "",
                description:"",
                year: 2020,
                duration: 120,
                genre: "",
                rating: 0,
                review: "",
                image_url: "" })

        history.push("/movie-list")
    }
    
    const handleChange = (event) => {
        let typeOfinput = event.target.name

        switch (typeOfinput){
            case "title":
                {
                    setInputMovie({...inputMovie, title: event.target.value})
                    break
                }
            case "description":
                {
                    setInputMovie({...inputMovie, description: event.target.value})
                    break
                }
            case "year":
                {
                    setInputMovie({...inputMovie, year: event.target.value})
                    break
                }
            case "duration":
                {
                    setInputMovie({...inputMovie, duration: event.target.value})
                    break
                }
            case "genre":
                {
                    setInputMovie({...inputMovie, genre: event.target.value})
                    break
                }
            case "rating":
                {
                    setInputMovie({...inputMovie, rating: event.target.value})
                    break
                }
            case "review":
                {
                    setInputMovie({...inputMovie, review: event.target.value})
                    break
                }
            case "image":
                {
                    setInputMovie({...inputMovie, image_url: event.target.value})
                    break
                }
            
            default:
                {break}
        }

    }

    const cancelHandle = () => {
        history.push("/movie-list")
        setInputMovie({id: null, 
            title: "",
            description:"",
            year: 2020,
            duration: 120,
            genre: "",
            rating: 0,
            review: "",
            image_url: "" })
    }

    return(

        <div>
        
        <Container>
        <h2 style={{marginTop: '1em', textAlign: 'center'}}>Movie Form</h2>
        <form onSubmit={submitForm} style={{marginBottom:'1em'}}>
            <Form.Group role="form">
                <Form.Label>Title :</Form.Label>
                <Form.Control required name="title" type="text" className="form-control" value={inputMovie.title} onChange={handleChange} placeholder="Title Movie" />
            </Form.Group>

            <Form.Group>
                <Form.Label>Description :</Form.Label>
                <Form.Control name="description" as="textarea" rows="3" value={inputMovie.description}  onChange={handleChange}/>
            </Form.Group>
            <Form.Group>
            <Row>
                <Col>
                <Form.Label>Year :</Form.Label>
                <Form.Control name="year" type="number" value={inputMovie.year} required min={1980} max={2020} onChange={handleChange}/>
                </Col>
                <Col>
                <Form.Label>Duration (minutes):</Form.Label>
                <Form.Control name="duration" type="number" value={inputMovie.duration} required min={0} onChange={handleChange} />
                </Col>
                <Col>
                <Form.Label>Rating :</Form.Label>
                <Form.Control name="rating" type="number" required min={1} max={10} value={inputMovie.rating} onChange={handleChange}/>
                </Col>
            </Row>
            </Form.Group>
            <Form.Group>
                <Form.Label>Genre :</Form.Label>
                <Form.Control name="genre" required type="text" placeholder="Genre" value={inputMovie.genre} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
                <Row>
                    <Col>
                        <Form.Label>Review :</Form.Label>
                        <Form.Control name="review" as="textarea" rows="3" value={inputMovie.review} onChange={handleChange}/>
                    </Col>
                    <Col>
                        <Form.Label>image URL :</Form.Label>
                        <Form.Control name="image" as="textarea" rows="3" value={inputMovie.image_url} onChange={handleChange}/>
                    </Col>
                </Row>
            </Form.Group>

              <Button variant="success" size="lg" block type="submit" >Submit</Button>{ ' '}
              
        </form>
        <Button variant="danger" size="lg" block type="submit" onClick={cancelHandle} >Cancel</Button>
        </Container>
    </div>


    )
}

export default MovieForm