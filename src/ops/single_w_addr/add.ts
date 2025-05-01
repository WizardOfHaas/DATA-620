import { BitArray } from "../../util";
import { State } from "../../state";
import { SingleWordAddressingOp } from "./single_w_addr";

export class OpADD extends SingleWordAddressingOp{
    name = "add"
    id = 10 //Octal 12
    pattern = [1, 0, 1, 0] as BitArray

    async eval(state: State, args){
        state.registers.a.set(state.memory.get(args.effAddr) + state.registers.a.get())

        state.registers.p.inc()
        
        return state
    }
}