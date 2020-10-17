import React from "react";
import Cell from "./Cell";
import msManager from "mine-sweeper-kt"
import "./App.css"

class MineSweeper extends React.Component {

    constructor() {
        super();
        let level = msManager.core.LEVEL.INTERMEDIATE;
        let boardGenerator = new msManager.core.MineSweeperBoardGenerator();
        let mineSweeperBoard = new msManager.core.MineSweeperBoard(level, boardGenerator);
        mineSweeperBoard.mineSweeperBoardListener = {
            onUnsafeMove: (openedCell, inCorrectFlags) => {
                console.log(openedCell.state)
                this.setState({
                    cellGrid: this.state.cellGrid.map(cell => {
                        if (cell.id === openedCell.id) {
                            cell = openedCell
                        }
                        return cell
                    })
                })
            },
            onSafeMove: (actedCell, openCells) => {
                console.log(actedCell.state)
                this.setState({
                    cellGrid: this.state.cellGrid.map(cell => {
                        if (cell.id === actedCell.id) {
                            cell = actedCell
                        }
                        return cell
                    })
                })
            }
        }

        let cellGrid = mineSweeperBoard.getCellGrid()
        this.state = {
            mineSweeperBoard: mineSweeperBoard,
            cellGrid: cellGrid
        }
    }

    onCellClick = (event, id) => {
        this.state.mineSweeperBoard.open(id);
    }

    onCellContextClick = (event, id) => {
        event.preventDefault()
        this.state.cellGrid.forEach((cells) => {
            cells.forEach(cell => {
                if (cell.id === id) {
                    if (cell.state instanceof msManager.core.Cell.State.Close) {
                        this.state.mineSweeperBoard.flag(id);
                    } else if (cell.state instanceof msManager.core.Cell.State.Flag) {
                        this.state.mineSweeperBoard.unFlag(id);
                    }
                }
            })
        })
    }

    render() {
        let grid = []
        this.state.cellGrid.forEach((array) => {
            let row = []
            array.forEach((cell) => {
                row.push(<td><Cell state={cell} onCellClick={this.onCellClick}
                                   onCellContextClick={this.onCellContextClick}/></td>)
            })
            grid.push(<tr>{row}</tr>)
        })
        return <div>
            <table className="Board">{grid}</table>
        </div>
    }


}

export default MineSweeper;