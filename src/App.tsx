import React from 'react';
import './App.css';
import {MineSweeperUI} from "./screen/MineSweeper";
import {PrimaryButton} from "./component/Button";

class App extends React.Component {

    render() {
        return (
            <div className="App">
                <h1 className="App-Title">MineSweeper Game</h1>
                <MineSweeperUI/>
                <PrimaryButton onClick={this.onRestartClick} msg={"Restart"}/>
            </div>
        );
    }

    onRestartClick() {
        window.location.reload()
    }
}

export default App;
