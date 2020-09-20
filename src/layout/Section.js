import React, {useContext} from "react"
import {
  Switch,
  Route
} from "react-router-dom";
import { MovieProvider } from "../context/MovieContext";
import {GameProvider} from "../context/GameContext"
import Home from '../pages/Home'
import MovieDetail from '../pages/MovieDetail'
import Movie from '../pages/Movie'
import GameDetail from '../pages/GameDetail'
import {Layout} from 'antd'
import { Container } from "react-bootstrap";
import Game from "../pages/Game";
import Login from '../pages/Login'
import Register from '../pages/Register'
import ChangePassword from '../pages/ChangePassword'


const {Content} = Layout

const Section= () => {
return (
    <div style={{marginBottom: '5em'}}>
    <Switch>
      <Container>
        
       <Route exact path="/" component={Home}/>
        <Route exact path="/MovieDetail/:id" component={MovieDetail}/>
        <Route exact path="/GameDetail/:id" component={GameDetail}/>
        <Route exact path="/Login" component={Login}/>
        <Route exact path="/Register" component={Register}/>
        <Route exact path="/ChangePassword" component={ChangePassword}/>

        <MovieProvider>
        <Route exact path="/movie-list" component={Movie}/>
        
        {/* <Route exact path="/movie-list"component={MovieForm}/> */}
        </MovieProvider>

        <GameProvider>
          <Route exact path="/game-list" component={Game}/>
          {/* <Route exact path="/game-list" component={GameForm}/> */}
        </GameProvider>

       
        </Container>
    </Switch>
    </div>
)
}

export default Section
