import { BitArray } from "../../util";
import { State } from "../../state";
import { DoubleWordAddressingOp } from "./double_w_addr";

//Increment memory location
export class OpJMP extends DoubleWordAddressingOp{
    name = "jmp"
    id = 4
    pattern = [0, 0, 0, 0, 0, 0, 1] as BitArray

    async eval(state: State, args){
        state.registers.p.set(args.effAddr)

        return state
    }

    encode(args){
        args.addr = 0
        return super.encode(args)
    }
}