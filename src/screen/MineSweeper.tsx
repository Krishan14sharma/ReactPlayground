import React, {useState} from "react";
import {CellUi} from "../Cell";
import board from "mine-sweeper-kt"
import "../App.css"

interface SweeperCell {
    id: number;
    state: CellState;
    onCellClick(e: React.MouseEvent<HTMLDivElement>, id: number): void;
    onCellContextClick(e: React.MouseEvent<HTMLDivElement>, id: number): void;
}

interface CellState {
    value: Value;
    correct?: boolean;
    getDisplayState(): Value;
}

interface Value {

}

function initMineSweeperBoard(): board.core.MineSweeperBoard {
    let level = board.core.LEVEL.INTERMEDIATE;
    let boardGenerator = new board.core.MineSweeperBoardGenerator();
    return new board.core.MineSweeperBoard(level, boardGenerator)
}

function render(cellGrid: SweeperCell[][],
                onCellClick: (event: React.MouseEvent<HTMLDivElement>, id: number) => void,
                onCellContextClick: (event: React.MouseEvent<HTMLDivElement>, id: number) => void): JSX.Element {
    let grid: JSX.Element[] = []
    cellGrid.forEach((array) => {
        let row: JSX.Element[] = []
        array.forEach((cell) => {
            row.push(<td><CellUi id={cell.id} state={cell.state} onCellClick={onCellClick}
                               onCellContextClick={onCellContextClick}/></td>)
        })
        grid.push(<tr>{row}</tr>)
    })
    return <div>
        <table className="Board">{grid}</table>
    </div>
}

export function MineSweeperUI() {
    const [msBoard] = useState(initMineSweeperBoard())
    const [cellGrid, setCellGrid] = useState(msBoard.getCellGrid());
    msBoard.mineSweeperBoardListener = {
        onUnsafeMove: (openedCell, _) => {
            let map = cellGrid.map(cells => {
                cells.map(cell => {
                    if (cell.id === openedCell.id) {
                        cell = openedCell
                    }
                    return cell
                })
                return cells
            });
            setCellGrid(map)
        },
        onSafeMove: (actedCell, _) => {
            setCellGrid(
                cellGrid.map(cells => {
                    cells.map(cell => {
                        if (cell.id === actedCell.id) {
                            cell = actedCell
                        }
                        return cell
                    })
                    return cells
                })
            )
        }
    }


    function onCellClick(event: React.MouseEvent<HTMLDivElement>, id: number) {
        msBoard.open(id);
    }

    function onCellContextClick(event: React.MouseEvent<HTMLDivElement>, id: number) {
        event.preventDefault();
        cellGrid.forEach((cells) => {
            cells.forEach(cell => {
                if (cell.id === id) {
                    if (cell.state instanceof board.core.Cell.State.Close) {
                        msBoard.flag(id);
                    } else if (cell.state instanceof board.core.Cell.State.Flag) {
                        msBoard.unFlag(id);
                    }
                }
            })
        })
    }

    return render(cellGrid, onCellClick, onCellContextClick)
}