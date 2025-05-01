import { BitArray } from "../../util";
import { State } from "../../state";
import { SingleWordAddressingOp } from "./single_w_addr";

//Increment memory location
export class OpINR extends SingleWordAddressingOp{
    name = "inr"
    id = 4
    pattern = [0, 1, 0, 0] as BitArray

    async eval(state: State, args){
        state.memory.set(args.effAddr, state.memory.get(args.effAddr) + 1)

        state.registers.p.inc()

        return state
    }
}