import React, { useContext} from 'react'
import axios from 'axios'
import { GameContext } from '../context/GameContext'
import {Form, Row,Col, Container, Button} from 'react-bootstrap'
import { UserContext } from '../context/UserContext'

const GameForm = ({}) => {
    const [games, setGames, inputGame, setInputGame] = useContext(GameContext)
    const [user] = useContext(UserContext)
    
    const submitForm = (event) =>{
        event.preventDefault();
        
        let name = inputGame.name
        let genre = inputGame.genre
        let singlePlayer = inputGame.singlePlayer
        let multiPlayer = inputGame.multiPlayer
        let platform = inputGame.platform
        let release = parseInt(inputGame.release)
        let image_url = inputGame.image_url
    
            if(inputGame.id === null){
                axios.post(`https://backendexample.sanbersy.com/api/data-game`,{
                    name,
                    genre,
                    singlePlayer,
                    multiPlayer,
                    platform,
                    release,
                    image_url
                },  {headers: {"Authorization" : `Bearer ${user.token}`}})
                .then(res => {
                    setGames([...games,{
                        id: res.data.id, ...inputGame}])
                }).catch(error => {
                    console.log(error)
                })
            }else{
                axios.put(`https://backendexample.sanbersy.com/api/data-game/${inputGame.id}`, {
                    name,
                    genre,
                    singlePlayer,
                    multiPlayer,
                    platform,
                    release,
                    image_url
            },  {headers: {"Authorization" : `Bearer ${user.token}`}})
            .then(res => {
                let selectedGame = games.find(el=> el.id === inputGame.id)
                selectedGame.name = inputGame.name
                selectedGame.genre = inputGame.genre
                selectedGame.singlePlayer = inputGame.singlePlayer
                selectedGame.multiPlayer = inputGame.multiPlayer
                selectedGame.platform = inputGame.platform
                selectedGame.release = inputGame.release
                selectedGame.image_url = inputGame.image_url
                setGames([...games])
            }).catch(error => {
                console.log(error)
            })
            }
            setInputGame({
                id: null,
                name : "",
                genre : "",
                singlePlayer : false,
                multiPlayer : false,
                platform : "",
                release : 2020,
                image_url: ""
            })
           
    
        }
    

    const handleChange = (event) => {
        let typeOfInput = event.target.name
        

        switch (typeOfInput) {
            case "name":
                setInputGame({...inputGame, name: event.target.value});
                break;
            case "genre":
                setInputGame({...inputGame, genre: event.target.value});
                break;
            case "singlePlayer":
                setInputGame({...inputGame, singlePlayer: event.target.checked});
                break;
            case "multiPlayer":
                setInputGame({...inputGame, multiPlayer: event.target.checked});
                break;
            case "platform":
                setInputGame({...inputGame, platform: event.target.value});
                break;
            case "release":
                setInputGame({...inputGame, release: event.target.value});
                break;
            case "image":
                setInputGame({...inputGame, image_url: event.target.value});
                break;
        
            default:
                break;
        }
    }

    return (
        <div className="form-film">
        
        <Container>
        <h2 style={{marginTop: '1em', textAlign: 'center'}}>Game Form</h2>
        <form onSubmit={submitForm}>
        <Form.Group role="form">
            <Form.Label>Name :</Form.Label>
            <Form.Control required name="name" type="text" value={inputGame.name} onChange={handleChange}/>
        </Form.Group>

        <Form.Group>
            <Form.Label>Genre :</Form.Label>
            <Form.Control name="genre" type="text" value={inputGame.genre}  onChange={handleChange}/>
        </Form.Group>
        <Form.Group>
            <Form.Label>Player :</Form.Label>
            <Row>
                <Col>
                    <Form.Check name="singlePlayer" type="checkbox" label="Single Player" checked={inputGame.singlePlayer} onChange={handleChange}/>
                    <Form.Check name="multiPlayer" type="checkbox" label="Multi Player" checked={inputGame.multiPlayer} onChange={handleChange}/>
                </Col>
            </Row>
             
        </Form.Group>
        <Form.Group>
            <Row>
                <Col>
                    <Form.Label>Platform :</Form.Label>
                    <Form.Control name="platform" required type="text" placeholder="Platform" value={inputGame.platform} onChange={handleChange} />
                </Col>
                <Col>
                    <Form.Label>Release :</Form.Label>
                    <Form.Control name="release" required type="number" min={1980} max={2020} value={inputGame.release} onChange={handleChange} />
                </Col>

            </Row>
        </Form.Group>
        <Form.Group>
            
            <Form.Label>image URL :</Form.Label>
            <Form.Control name="image" as="textarea" rows="3" value={inputGame.image_url} onChange={handleChange}/>
           
        </Form.Group>

              <Button variant="success" size="lg" block type="submit" >Submit</Button><br/>
        </form>
        </Container>
    </div>
    )
}

export default GameForm