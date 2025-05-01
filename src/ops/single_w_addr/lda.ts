import { BitArray } from "../../util";
import { State } from "../../state";
import { SingleWordAddressingOp } from "./single_w_addr";

export class OpLDA extends SingleWordAddressingOp{
    name = "lda"
    id = 1
    pattern = [0, 0, 0, 1] as BitArray

    async eval(state: State, args){
        state.registers.a.set(state.memory.get(args.effAddr))

        state.registers.p.inc()

        return state
    }
}