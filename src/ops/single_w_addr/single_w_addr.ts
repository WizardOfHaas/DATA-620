import { Operation } from "../operation"
import { binToDec, decToBin, TModes } from "../../util"
import { State } from "../../state"

type TSingleWorkAddressingArgs = {
    code: number
    mode: number
    addr: number
    
    effAddr: number
    modeName: TModes
}

export abstract class SingleWordAddressingOp extends Operation<TSingleWorkAddressingArgs>{
    size = 1
    
    /**
     * Addressing modes:
     * 0XX - Direct
     * 100 - Relative
     * 101 - Index X
     * 110 - Index B
     * 111 - Indirect
     */

    modes = {
        "100": "RELATIVE",
        "101": "XINDEX",
        "110": "BINDEX",
        "111": "INDIRECT"
    }

    decode(state: State){
        const bits = decToBin(state.registers.u.get(), 16)
        const mode = bits.slice(4, 7).join("")
        const addr = binToDec(bits.slice(7, 16))

        //Determine addressing mode
        let modeName = "DIRECT"

        if(typeof this.modes[mode] !== "undefined"){
            modeName = this.modes[mode]
        }

        //Apply mode to calculate final address
        let effAddr = binToDec(bits.slice(5, 16))

        if(modeName == "RELATIVE"){
            effAddr = addr + state.registers.p.get()
        }else if(modeName == "XINDEX"){
            effAddr = addr + state.registers.x.get()
        }else if(modeName == "BINDEX"){
            effAddr = addr + state.registers.b.get()
        }else if(modeName == "INDIRECT"){
            effAddr = state.memory.get(addr)
        }

        return {
            code: binToDec(bits.slice(0, 4)),
            mode: binToDec(bits.slice(4, 7)),
            addr: addr,
            effAddr: effAddr,
            modeName: modeName as TModes
        }
    }

    encode(args: TSingleWorkAddressingArgs){
        let bits = this.pattern
            .concat(decToBin(args.code, 4))
            .concat(decToBin(args.mode, 3))
            .concat(decToBin(args.addr, 9))

        //I need to handle DIRECT mode specially
        if(args.modeName == "DIRECT"){
            let bits = this.pattern
                .concat(decToBin(args.code, 4))
                .concat([0, 0])
                .concat(decToBin(args.addr, 10))
        }

        return binToDec(bits)
    }
}