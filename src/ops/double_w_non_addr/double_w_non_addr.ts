import { Operation } from "../operation"
import { binToDec, decToBin } from "../../util"
import { State } from "../../state"


type TDoubleWorkNonAddressingArgs = {
    op: number
    operand: number
}

export abstract class DoubleWordNonAddressingOp extends Operation<TDoubleWorkNonAddressingArgs>{
    size = 2
    
    decode(state: State){
        const bits = decToBin(state.registers.u.get(), 16)
        const exBits = decToBin(state.memory.get(state.registers.p.get() + 1), 16)

        return {
            op: binToDec(bits.slice(7, 13)),
            operand: binToDec(exBits)
        }
    }
}