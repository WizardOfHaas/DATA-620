import { Operation } from "../operation"
import { binToDec, decToBin } from "../../util"
import { State } from "../../state"

type TDoubleWorkAddressingArgs = {
    code: number
    mode: number
    addr: number    
    effAddr: number
}

export abstract class DoubleWordAddressingOp extends Operation<TDoubleWorkAddressingArgs>{
    size = 2

    decode(state: State){
        const bits = decToBin(state.memory.get(state.registers.p.get()), 16)
        const code = binToDec(bits.slice(0, 4))
        const mode = binToDec(bits.slice(4, 7))
        const addr = binToDec(bits.slice(7, 16))

        const effAddr = binToDec(decToBin(state.memory.get(state.registers.p.get() + 1), 16).slice(1))

        return {
            code: code,
            mode: mode,
            addr: addr,
            effAddr: effAddr
        }
    }

    encode(args: TDoubleWorkAddressingArgs){
        let bits = this.pattern

        const packed = decToBin(args.code, 4)
            .concat(decToBin(args.mode, 3))
            .concat(decToBin(args.addr, 9))
            .concat([1])
            .concat(decToBin(args.effAddr, 15))

        //Merge with pattern prefix
        bits.forEach((b, i) => {
            packed[i] = b
        })

        return binToDec(packed)
    }
}