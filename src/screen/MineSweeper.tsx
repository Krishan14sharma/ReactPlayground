import React, {useEffect, useState} from "react";
import {CellUi} from "../component/Cell";
import board, {core} from "mine-sweeper-kt"
import "../App.css"
import {useParams} from "react-router";
import 'reactjs-popup/dist/index.css';
import {YouLose} from "../component/Popup/Popup";

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

function initMineSweeperBoard(levelString: string): board.core.MineSweeperBoard {
    let level
    if (levelString === "beginner") {
        level = board.core.LEVEL.BEGINNER
    } else if (levelString === "hard") {
        level = board.core.LEVEL.HARD
    } else {
        level = board.core.LEVEL.INTERMEDIATE
    }
    const boardGenerator = new board.core.MineSweeperBoardGenerator();
    return new board.core.MineSweeperBoard(level, boardGenerator)
}

function render(cellGrid: SweeperCell[][],
                onCellClick: (event: React.MouseEvent<HTMLDivElement>, id: number) => void,
                onCellContextClick: (event: React.MouseEvent<HTMLDivElement>, id: number) => void, lost: boolean, closeModal: Function): JSX.Element {
    let grid: JSX.Element[] = []
    cellGrid.forEach((array, index) => {
        let row: JSX.Element[] = []
        array.forEach((cell) => {
            row.push(<td key={cell.id}><CellUi key={cell.id} id={cell.id} state={cell.state} onCellClick={onCellClick}
                                               onCellContextClick={onCellContextClick}/></td>)
        })
        grid.push(<tr key={index}>{row}</tr>)
    })
    return <div>
        <table className="Board">{grid}</table>
        <YouLose open={lost} closeModal={closeModal}/>
    </div>
}


export default function MineSweeperUI() {

    // todo avoid creating expensive objects
    let {levelParam}: any = useParams()
    const [{msBoard}, setBoard] = useState({
        msBoard: initMineSweeperBoard(levelParam)
    })
    const [cellGrid, setCellGrid] = useState(msBoard.getCellGrid());
    const [lost, setLost] = useState(false)

    useEffect(() => {
        let newBoard = initMineSweeperBoard(levelParam);
        setBoard({msBoard: newBoard})
        setCellGrid(newBoard.getCellGrid())
    }, [levelParam])

    const closeModal = () => {
        console.log("lost called")
        setLost(false)
    }
    msBoard.mineSweeperBoardListener = {
        onUnsafeMove: (openedCell, _) => {
            let grid = msBoard.getCellGrid();
            setCellGrid([...grid]) // copying the array to trigger render method????
            setLost(true)
        },
        onSafeMove: (actedCell, _) => {
            let grid = msBoard.getCellGrid();
            setCellGrid([...grid])
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

    return render(cellGrid, onCellClick, onCellContextClick, lost, closeModal)
}