declare module 'mine-sweeper-kt' {
    import {CellState, Value} from './Cell'
    import {SweeperCell} from './MineSweeper'

    declare namespace core {
        declare namespace LEVEL {
            const INTERMEDIATE: string
            const HARD: string
            const BEGINNER: string
        }

        declare class MineSweeperBoardGenerator {
        }

        declare interface MineSweeperBoardListener {
            onUnsafeMove(openedCell, inCorrectFlags)

            onSafeMove(actedCell, openCells)
        }

        declare class MineSweeperBoard {
            constructor(level: LEVEL, boardGenerator: MineSweeperBoardGenerator)

            mineSweeperBoardListener: MineSweeperBoardListener

            getCellGrid(): SweeperCell

            open(id: number): void;

            flag(id: number): void;

            unFlag(id: number): void;

        }


        export class Cell {

        }

        declare namespace Cell {

            namespace State {
                export const Close: CellState
                export const Open: CellState
                export const Flag: CellState
            }

            declare namespace Value {
                const BOMB = {}

                class Number {
                    number: number
                }
            }
        }
    }
}