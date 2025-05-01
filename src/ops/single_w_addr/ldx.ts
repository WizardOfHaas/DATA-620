import { BitArray } from "../../util";
import { State } from "../../state";
import { SingleWordAddressingOp } from "./single_w_addr";

export class OpLDX extends SingleWordAddressingOp{
    name = "ldx"
    id = 3
    pattern = [0, 0, 1, 1] as BitArray

    async eval(state: State, args){
        state.registers.x.set(state.memory.get(args.effAddr))

        state.registers.p.inc()

        return state
    }
}