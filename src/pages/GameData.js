import React, { useContext, useState, useEffect} from 'react'
import { GameContext } from '../context/GameContext'
import {Table, Button, Container} from 'react-bootstrap'
import axios from 'axios'
import { UserContext } from '../context/UserContext'
import { Input, Select} from 'antd'

const GameData =() => {
    const [games, setGames, ,setInputGame] = useContext(GameContext)
    const [sortType,setSortType] = useState(true)
    const [user] = useContext(UserContext)
    const { Option } = Select;

    useEffect(() => {
    if(games === null){
        axios.get(`https://backendexample.sanbersy.com/api/data-game`)
        .then(res=> {
            setGames(res.data.map(el=>{ 
                return {
                    id : el.id,
                    created_at : el.created_at,
                    updated_at : el.updated_at,
                    name : el.name,
                    genre : el.genre,
                    singlePlayer : el.singlePlayer,
                    multiPlayer : el.multiPlayer,
                    platform : el.platform,
                    release : el.release,
                    image_url : el.image_url
                }
            }))
        })
    }
    }, [games,setGames])

    const sortColumn = (field) => {
        setSortType(!sortType)
 
         const sorted = [...games].sort(function(a,b){
             switch (field) {
                 case "name":
                     if (sortType) {
                         return (a.name.toUpperCase() > b.name.toUpperCase()) ? 1 : ((b.name.toUpperCase() > a.name.toUpperCase()) ? -1 : 0);
                     }else{
                         return (a.name.toUpperCase() < b.name.toUpperCase()) ? 1 : ((b.name.toUpperCase() < a.name.toUpperCase()) ? -1 : 0);
                     }
                     
                 case "genre":
                     if (sortType) {
                         return (a.genre.toUpperCase() > b.genre.toUpperCase()) ? 1 : ((b.genre.toUpperCase() > a.genre.toUpperCase()) ? -1 : 0);
                     }else{
                         return (a.genre.toUpperCase() < b.genre.toUpperCase()) ? 1 : ((b.genre.toUpperCase() < a.genre.toUpperCase()) ? -1 : 0);
                     }
                     
                 case "singlePlayer":
                     if (sortType) {
                         return (a.singlePlayer > b.singlePlayer) ? 1 : ((b.singlePlayer > a.singlePlayer) ? -1 : 0);
                     }else{
                         return (a.singlePlayer < b.singlePlayer) ? 1 : ((b.singlePlayer < a.singlePlayer) ? -1 : 0);
                     }
                    
                 case "multiPlayer":
                     if (sortType) {
                         return (a.multiPlayer > b.multiPlayer) ? 1 : ((b.multiPlayer > a.multiPlayer) ? -1 : 0);
                     }else{
                         return (a.multiPlayer < b.multiPlayer) ? 1 : ((b.multiPlayer < a.multiPlayer) ? -1 : 0);
                     }
                     
                 case "platform":
                     if (sortType) {
                         return (a.platform.toUpperCase() > b.platform.toUpperCase()) ? 1 : ((b.platform.toUpperCase() > a.platform.toUpperCase()) ? -1 : 0);
                     }else{
                         return (a.platform.toUpperCase() < b.platform.toUpperCase()) ? 1 : ((b.platform.toUpperCase() < a.platform.toUpperCase()) ? -1 : 0);
                     }
                     
                 case "release":
                     if (sortType) {
                         return (a.release.toUpperCase() > b.release.toUpperCase()) ? 1 : ((b.release.toUpperCase() > a.release.toUpperCase()) ? -1 : 0);
                     }else{
                         return (a.release.toUpperCase() < b.release.toUpperCase()) ? 1 : ((b.release.toUpperCase() < a.release.toUpperCase()) ? -1 : 0);
                     }
                     
             
                 default:
                     break;
             }
         })
 
           setGames(sorted);
       }

       const deleteForm = (event) => {
        let idGames = parseInt(event.target.value)
        let dataGames = games.filter(x=> x.id !== idGames)

        axios.delete(`http://backendexample.sanbercloud.com/api/data-game/${idGames}`,  {headers: {"Authorization" : `Bearer ${user.token}`}})
        .then(res => {
            setGames([...dataGames])
        })
    }

    const editForm = (event) => {
        let idGames = parseInt(event.target.value)
        let dataGames = games.find(x=> x.id === idGames)
        setInputGame({
            id: idGames,
            updated_at : dataGames.updated_at,
            name: dataGames.name,
            genre: dataGames.genre,
            singlePlayer: dataGames.singlePlayer,
            multiPlayer: dataGames.multiPlayer,
            platform: dataGames.platform,
            release: dataGames.release,
            image_url: dataGames.image_url
            })
    }

    return(
       
        <>
        <Container>
            <h2 style={{marginTop: '1em', textAlign: 'center', marginBottom: '0.5em'}}>Games</h2>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
            <Input.Group compact style={{marginBottom: '1em'}}>
                        <Select placeholder="Filters">
                            <Option value="1">Year</Option>
                            <Option value="2">Rating</Option>
                            <Option value="2">Duration</Option>
                        </Select>
                        <Input style={{ width: 100, textAlign: 'center' }} placeholder="Minimum" type="number"/>
                        <Input
                            className="site-input-split"
                            style={{
                            width: 30,
                            borderLeft: 0,
                            borderRight: 0,
                            pointerEvents: 'none',
                            }}
                            placeholder="~"
                            disabled
                        />
                        <Input
                            className="site-input-right"
                            style={{
                            width: 100,
                            textAlign: 'center',
                            }}
                            placeholder="Maximum"
                            type="number"
                        />
                    </Input.Group>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Image</th>
                        <th>Name <i onClick={()=>sortColumn("name")} class="fa fa-sort"></i></th>
                        <th>Genre <i onClick={()=>sortColumn("genre")} class="fa fa-sort"></i></th>
                        <th>Single Player <i onClick={()=>sortColumn("singlePlayer")} class="fa fa-sort"></i></th>
                        <th>Multi Player <i onClick={()=>sortColumn("multiPlayer")} class="fa fa-sort"></i></th>
                        <th>Platform <i onClick={()=>sortColumn("platform")} class="fa fa-sort"></i></th>
                        <th>Release <i onClick={()=>sortColumn("release")} class="fa fa-sort"></i></th>
                        <th>Action </th>
                    </tr>
                </thead>

                <tbody>

                    {
                        games !== null && games.map((el, index) => {
                            return(
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td><img src={el.image_url} style={{width: '50px'}} alt="poster"/></td>
                                    <td>{el.name}</td>
                                    <td>{el.genre}</td>
                                    <td>{el.singlePlayer}</td>
                                    <td>{el.multiPlayer}</td>
                                    <td>{el.platform}</td>
                                    <td>{el.release}</td>
                                    <td>
                                        <Button variant="success"type="submit" value={el.id} onClick={editForm}>Edit</Button>{' '}
                                        <Button variant="danger" type="submit" value={el.id} onClick={deleteForm}>Delete</Button>{' '}
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>

            </Table>
        </Container>
        </>
    )
}

export default GameData