import { BitArray } from "../../util";
import { State } from "../../state";
import { SingleWordNonAddressingOp } from "./single_w_non_addr";

export class OpHLT extends SingleWordNonAddressingOp{
    name = "hlt"
    id = 0
    pattern = [0, 0, 0, 0, 0, 0, 0] as BitArray

    async eval(state: State, args){
        state.running = false

        state.registers.p.inc()

        return state
    }

    encode(args){
        return 0
    }
}