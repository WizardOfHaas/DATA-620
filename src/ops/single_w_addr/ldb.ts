import { BitArray } from "../../util";
import { State } from "../../state";
import { SingleWordAddressingOp } from "./single_w_addr";

export class OpLDB extends SingleWordAddressingOp{
    name = "ldb"
    id = 2
    pattern = [0, 0, 1, 0] as BitArray

    async eval(state: State, args){
        state.registers.b.set(state.memory.get(args.effAddr))

        state.registers.p.inc()

        return state
    }
}