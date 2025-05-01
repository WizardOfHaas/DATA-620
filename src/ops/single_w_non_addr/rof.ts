import { BitArray } from "../../util";
import { State } from "../../state";
import { SingleWordNonAddressingOp } from "./single_w_non_addr";

export class OpROF extends SingleWordNonAddressingOp{
    name = "rof"
    id = 0
    pattern = [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0] as BitArray

    async eval(state: State, args){
        state.flags.overflow = 0

        state.registers.p.inc()

        return state
    }
}