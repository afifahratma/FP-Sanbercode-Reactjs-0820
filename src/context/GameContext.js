import React, {useState, createContext, useEffect} from 'react'
import axios from 'axios'

export const GameContext = createContext()

export const GameProvider = props => {
    const [games, setGames] = useState(null)
    const [inputGame, setInputGame] = useState({
        id: null,
        name: "",
        genre: "",
        singlePlayer: true,
        multiPlayer: true,
        platform: "",
        release: 2020,
        image_url: ""
    })
    
    useEffect(() => {
        if (games === null){
            axios.get(`https://backendexample.sanbersy.com/api/data-game`)
            .then(res => {
            setGames(res.data.map(el=>{
                return{
                    id : el.id,
                    name : el.name,
                    genre : el.genre,
                    singlePlayer : el.singlePlayer,
                    multiPlayer : el.multiplayer,
                    platform : el.platform,
                    release : el.release,
                    image_url : el.image_url
                }
            }))
        })
        }
    }, [games])

    return(
        <GameContext.Provider value={[games,setGames,inputGame,setInputGame]}>
            {props.children}
        </GameContext.Provider>
    )

}