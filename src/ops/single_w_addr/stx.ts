import { BitArray } from "../../util";
import { State } from "../../state";
import { SingleWordAddressingOp } from "./single_w_addr";

export class OpSTX extends SingleWordAddressingOp{
    name = "stx"
    id = 7
    pattern = [0, 1, 1, 1] as BitArray

    async eval(state: State, args){
        state.memory.set(args.effAddr, state.registers.x.get())

        state.registers.p.inc()

        return state
    }
}