import { State } from "state"
import { Bit } from "../util"

export abstract class Operation<TArgs>{
    name: string
    id: number
    pattern: Array<Bit>
    size: number

    abstract encode(args: TArgs): number
    abstract decode(state: State): TArgs
    abstract eval(state: State, args: TArgs): Promise<State>
}
