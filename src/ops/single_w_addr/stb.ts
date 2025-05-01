import { BitArray } from "../../util";
import { State } from "../../state";
import { SingleWordAddressingOp } from "./single_w_addr";

export class OpSTB extends SingleWordAddressingOp{
    name = "stb"
    id = 6
    pattern = [0, 1, 1, 0] as BitArray

    async eval(state: State, args){
        state.memory.set(args.effAddr, state.registers.b.get())

        state.registers.p.inc()

        return state
    }
}