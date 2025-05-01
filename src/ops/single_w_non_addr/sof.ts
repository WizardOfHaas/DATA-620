import { BitArray } from "../../util";
import { State } from "../../state";
import { SingleWordNonAddressingOp } from "./single_w_non_addr";

export class OpSOF extends SingleWordNonAddressingOp{
    name = "sof"
    id = 0
    pattern = [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1] as BitArray

    async eval(state: State, args){
        state.flags.overflow = 1

        state.registers.p.inc()

        return state
    }
}