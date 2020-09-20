import React, {useState, createContext, useEffect} from 'react'
import axios from 'axios'
export const MovieContext = createContext()

export const MovieProvider = props => {
    const [movies, setMovies] = useState(null)
    const [inputMovie, setInputMovie] = useState({
        id: null,
        updated_at: "",
        title: "",
        description: "",
        year: 2020,
        duration: 120,
        genre: "",
        rating: 0,
        review: "",
        image_url: ""
    })

    const [statusForm,setStatusForm] = useState("create")

    useEffect(() => {
        if (movies === null){
            axios.get(`https://backendexample.sanbersy.com/api/data-movie`)
            .then(res => {
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
    }, [movies])

    return(
        <MovieContext.Provider value={[movies,setMovies,inputMovie, setInputMovie, statusForm, setStatusForm]}>
            {props.children}
        </MovieContext.Provider>
    )
}