import { BitArray } from "../../util";
import { State } from "../../state";
import { SingleWordAddressingOp } from "./single_w_addr";

export class OpSUB extends SingleWordAddressingOp{
    name = "sub"
    id = 12 //Octal 14
    pattern = [1, 0, 1, 1] as BitArray

    async eval(state: State, args){
        state.registers.a.set(state.registers.a.get() - state.memory.get(args.effAddr))

        state.registers.p.inc()

        return state
    }
}