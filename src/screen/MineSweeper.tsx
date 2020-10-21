import React from "react";
import Cell from "../Cell";
import board from "mine-sweeper-kt"
import "../App.css"

interface MineSweeperState {
    mineSweeperBoard: board.core.MineSweeperBoard;
    cellGrid: SweeperCell[][];
}

interface SweeperCell {
    id: number
    state: CellState
    onCellClick(e: React.MouseEvent<HTMLDivElement>, id: number): void
    onCellContextClick(e: React.MouseEvent<HTMLDivElement>, id: number): void
}

interface CellState {
    value: Value
    correct?: boolean

    getDisplayState(): Value
}

interface Value {

}

class MineSweeper extends React.Component<{}, MineSweeperState> {

    constructor() {
        super({});
        let level = board.core.LEVEL.INTERMEDIATE;
        let boardGenerator = new board.core.MineSweeperBoardGenerator();
        let mineSweeperBoard = new board.core.MineSweeperBoard(level, boardGenerator);
        mineSweeperBoard.mineSweeperBoardListener = {
            onUnsafeMove: (openedCell, inCorrectFlags) => {
                let cellGrid = this.state.cellGrid;
                this.setState({
                    cellGrid: cellGrid.map(cells => {
                        cells.forEach((cell) => {
                            if (cell.id === openedCell.id) {
                                cell = openedCell
                            }
                        })
                        return cells
                    })
                })
            },
            onSafeMove: (actedCell, openCells) => {
                let cellGrid = this.state.cellGrid;
                this.setState({
                    cellGrid: cellGrid.map(cells => {
                        cells.forEach(cell => {
                            if (cell.id === actedCell.id) {
                                cell = actedCell
                            }
                        })
                        return cells
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

    onCellClick = (event: React.MouseEvent<HTMLDivElement>, id: number) => {
        this.state.mineSweeperBoard.open(id);
    }

    onCellContextClick = (event: React.MouseEvent<HTMLDivElement>, id: number) => {
        event.preventDefault()
        this.state.cellGrid.forEach((cells) => {
            cells.forEach(cell => {
                if (cell.id === id) {
                    if (cell.state instanceof board.core.Cell.State.Close) {
                        this.state.mineSweeperBoard.flag(id);
                    } else if (cell.state instanceof board.core.Cell.State.Flag) {
                        this.state.mineSweeperBoard.unFlag(id);
                    }
                }
            })
        })
    }

    render() {
        let grid: JSX.Element[] = []
        this.state.cellGrid.forEach((array) => {
            let row: JSX.Element[] = []
            array.forEach((cell) => {
                row.push(<td><Cell id={cell.id} state={cell.state} onCellClick={this.onCellClick}
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