import {CellState, StateConstant} from "../MineSweeper";
import msManager from "mine-sweeper"


class MSWrapper {

    LEVEL = {
        BEGINNER: msManager.core.LEVEL.BEGINNER,
        INTERMEDIATE: msManager.core.LEVEL.INTERMEDIATE,
        HARD: msManager.core.LEVEL.BEGINNER
    }

    createBoard(level) {
        let boardGenerator = new msManager.core.MineSweeperBoardGenerator();
        return new msManager.core.MineSweeperBoard(level, boardGenerator);
    }

}


function convertToCellState(cell) {
    let cellState = new CellState()
    if (cell.state instanceof msManager.core.Cell.State.Close) {
        cellState.state = StateConstant.close
        cellState.value = cell.state.getDisplayState()
    } else {
        cellState.state = StateConstant.open
        cellState.value = cell.state.getDisplayState()
    }
    cellState.id = cell.id
    console.log(cellState)
    return cellState
}

export {convertToCellState, MSWrapper};
