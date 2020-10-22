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

            getCellGrid(): SweeperCell[][]

            open(id: number): void;

            flag(id: number): void;

            unFlag(id: number): void;

        }

        declare namespace Cell {

            declare namespace State {
                class Close implements CellState {
                    value: Value
                    correct?: boolean
                    getDisplayState(): Value
                }

                class Open implements CellState {
                    value: Value
                    correct?: boolean

                    getDisplayState(): Value
                }

                class Flag implements CellState{
                    value: Value
                    correct?: boolean

                    getDisplayState(): Value
                }
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