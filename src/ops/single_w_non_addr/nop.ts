import { BitArray } from "../../util";
import { State } from "../../state";
import { SingleWordNonAddressingOp } from "./single_w_non_addr";

export class OpNOP extends SingleWordNonAddressingOp{
    name = "nop"
    id = 0
    pattern = [0, 0, 0, 0, 1, 0, 1] as BitArray

    async eval(state: State, args){
        state.registers.p.inc()

        return state
    }
}