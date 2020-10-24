import React, {useState} from 'react';
import './App.css';
import MineSweeper from "./screen/MineSweeper";
import {PrimaryButton} from "./component/Button";
import Level from "./screen/Level";
import board from "mine-sweeper-kt";
import {BrowserRouter, Route, Switch} from "react-router-dom";


function GameApp() {
    // const [level] = useState(board.core.LEVEL.BEGINNER)
    return render()
}


function render() {
    const onRestartClick = () => window.location.reload()

    return (
        <BrowserRouter>
            <div className="App">
                <h1 className="App-Title">MineSweeper Game</h1>
                <Level/>
                <Switch>
                    <Route path="/:levelParam" component={MineSweeper}>
                    </Route>
                </Switch>
                <PrimaryButton onClick={onRestartClick} msg={"Restart"}/>
            </div>
        </BrowserRouter>
    );
}


export default GameApp;
