import React, { useContext, useState, useEffect} from 'react'
import { MovieContext } from '../context/MovieContext'
import {Table, Button, Container
} from 'react-bootstrap'
import axios from 'axios'
import { UserContext } from '../context/UserContext'
import { Input, Select} from 'antd'
import {useHistory} from 'react-router-dom'


const MovieData = () => {
    let history = useHistory()
    const [movies, setMovies, , setInputMovie] = useContext(MovieContext)
    const [sortType,setSortType] = useState(true)
    const [user] = useContext(UserContext)
    const { Option } = Select;

    useEffect(() => {
        if (movies === null){
            axios.get(`https://backendexample.sanbersy.com/api/data-movie`)
            .then(res=> {
            setMovies(res.data.map(el=>{
                return{
                    id: el.id,
                    title: el.title,
                    description: el.description,
                    year: el.year,
                    duration: el.duration,
                    genre: el.genre,
                    rating: el.rating,
                    review: el.review,
                    image_url: el.image_url
                }
            }))
            })
        }
    }, [movies, setMovies])

    function truncateString(str, num) {
        if (str.length <= num) {
          return str
        }
        return str.slice(0, num) + '...'
      }
    
      const sortColumn = (field) => {
        setSortType(!sortType)
 
         const sorted = [...movies].sort(function(a,b){
             switch (field) {
                 case "title":
                     if (sortType) {
                         return (a.title.toUpperCase() > b.title.toUpperCase()) ? 1 : ((b.title.toUpperCase() > a.title.toUpperCase()) ? -1 : 0);
                     }else{
                         return (a.title.toUpperCase() < b.title.toUpperCase()) ? 1 : ((b.title.toUpperCase() < a.title.toUpperCase()) ? -1 : 0);
                     }
                    
                 case "description":
                     if (sortType) {
                         return (a.description.toUpperCase() > b.description.toUpperCase()) ? 1 : ((b.description.toUpperCase() > a.description.toUpperCase()) ? -1 : 0);
                     }else{
                         return (a.description.toUpperCase() < b.description.toUpperCase()) ? 1 : ((b.description.toUpperCase() < a.description.toUpperCase()) ? -1 : 0);
                     }
                 
                 case "year":
                     if (sortType) {
                         return (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0);
                     }else{
                         return (a.year < b.year) ? 1 : ((b.year < a.year) ? -1 : 0);
                     }
                   
                 case "duration":
                     if (sortType) {
                         return (a.duration > b.duration) ? 1 : ((b.duration > a.duration) ? -1 : 0);
                     }else{
                         return (a.duration < b.duration) ? 1 : ((b.duration < a.duration) ? -1 : 0);
                     }
                    
                 case "genre":
                     if (sortType) {
                         return (a.genre.toUpperCase() > b.genre.toUpperCase()) ? 1 : ((b.genre.toUpperCase() > a.genre.toUpperCase()) ? -1 : 0);
                     }else{
                         return (a.genre.toUpperCase() < b.genre.toUpperCase()) ? 1 : ((b.genre.toUpperCase() < a.genre.toUpperCase()) ? -1 : 0);
                     }
                   
                 case "rating":
                     if (sortType) {
                         return (a.rating > b.rating) ? 1 : ((b.rating > a.rating) ? -1 : 0);
                     }else{
                         return (a.rating < b.rating) ? 1 : ((b.rating < a.rating) ? -1 : 0);
                     }
                  
             
                 default:
                     break;
             }
         })
         setMovies(sorted);
        }
       
          const editForm = (event) => {
            let idMovies = parseInt(event.target.value)
            let dataMovies = movies.find(x=> x.id === idMovies)
            history.push(`/movie-list/MovieForm/${idMovies}`)
            setInputMovie({
                id: idMovies,
                title: dataMovies.title,
                description: dataMovies.description,
                year: dataMovies.year,
                duration: dataMovies.duration,
                genre: dataMovies.genre,
                rating: dataMovies.rating,
                review: dataMovies.review,
                image_url: dataMovies.image_url
                })
        }

        const deleteForm = (event) => {
            let idMovies = parseInt(event.target.value)
            let dataMovies = movies.filter(x=> x.id !== idMovies)
    
            axios.delete(`http://backendexample.sanbercloud.com/api/data-movie/${idMovies}`,  {headers: {"Authorization" : `Bearer ${user.token}`}})
            .then(res => {
                setMovies([...dataMovies])
            })
        }


    return(
        <>
       

            <Container>
            <h2 style={{marginTop: '1em', textAlign: 'center', marginBottom: '0.5em'}}>Movie</h2>
            
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                    <Input.Group compact style={{marginBottom: '1em'}}>
                        <Select placeholder="Filters">
                            <Option value="1">Year</Option>
                            <Option value="2">Rating</Option>
                            <Option value="3">Duration</Option>
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
                                <th>Title <i onClick={()=>sortColumn("title")} class="fa fa-sort"></i></th>
                                <th>Description <i onClick={()=>sortColumn("description")} class="fa fa-sort"></i></th>
                                <th>Year <i onClick={()=>sortColumn("year")} class="fa fa-sort"></i></th>
                                <th>Duration <i onClick={()=>sortColumn("duration")} class="fa fa-sort"></i></th>
                                <th>Genre <i onClick={()=>sortColumn("genre")} class="fa fa-sort"></i></th>
                                <th >Rating <i onClick={()=>sortColumn("rating")} class="fa fa-sort"></i></th>
                                <th>Review</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                    {
                    movies !== null && movies.map((item, index)=>{
                        return(                    
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{item.title}</td>
                            <td title={item.description}>{truncateString(item.description, 25)}</td>
                            <td>{item.year}</td>
                            <td>{item.duration}</td>
                            <td>{item.genre}</td>
                            <td>{item.rating}</td>
                            <td>{item.review}</td>
                            <td>
                            <Button variant="success" type="submit" value={item.id} onClick={editForm} style={{marginBottom:'10px'}}>Edit</Button>
                            <Button variant="danger" type="submit" value={item.id} onClick={deleteForm}>Delete</Button>{' '}

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

export default MovieData

