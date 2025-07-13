import { Operation } from "../operation"
import { binToDec, decToBin } from "../../util"
import { State } from "../../state"

type TSingleWorkNonAddressingArgs = {
    class: number
    op: number
    def: number
}

export abstract class SingleWordNonAddressingOp extends Operation<TSingleWorkNonAddressingArgs>{
    size = 1
    
    decode(state: State){
        const bits = decToBin(state.registers.u.get(), 16)

        return {
            class: binToDec(bits.slice(0, 4)),
            op: binToDec(bits.slice(4, 7)),
            def: binToDec(bits.slice(7, 16)),
        }
    }

    encode(args: TSingleWorkNonAddressingArgs){
        return 0 //Stub for now
    }
}