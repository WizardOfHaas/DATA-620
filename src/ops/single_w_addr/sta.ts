import { BitArray } from "../../util";
import { State } from "../../state";
import { SingleWordAddressingOp } from "./single_w_addr";

export class OpSTA extends SingleWordAddressingOp{
    name = "sta"
    id = 5
    pattern = [0, 1, 0, 1] as BitArray

    async eval(state: State, args){
        state.memory.set(args.effAddr, state.registers.a.get())

        state.registers.p.inc()

        return state
    }
}