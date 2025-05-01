import { binToDec, decToBin } from "../util"
import { operations } from "../ops/op_map"
import { State } from "../state"
import { Operation } from "../ops/operation"

const insPattern = /([a-zA-Z]+) ?([a-zA-Z0-9\+\(\)\*\=\ ]+)?/g
const literalPatetrn = /\=([0-9]+)/g

/**
 * Addressing modes:
 * 0XX - add 0 - Direct
 * 100 - add (10 + p) - Relative
 * 101 - add (10 + x) - Index X
 * 110 - add (10 + b) - Index B
 * 111 - add (10)* - Indirect
 *     - mov ax, ="AY" - Literal?
 */

const modePatterns = [{
    mode: "RELATIVE",
    code: 4,
    pattern: /\(([0-9]+)\ \+\ p\)/g
},{
    mode: "XINDEX",
    code: 5,
    pattern: /\(([0-9]+)\ \+\ x\)/g
},{
    mode: "BINDEX",
    code: 6,
    pattern: /\(([0-9]+)\ \+\ b\)/g
},{
    mode: "INDIRECT",
    code: 7,
    pattern: /\(([0-9]+)\)\*/g,
},{
    mode: "DIRECT",
    code: 0,
    pattern: /([0-9]+)/g
}]

export class Assembler{
    state: State
    org: number

    constructor(state: State, org?: number){
        this.state = state

        if(typeof org !== "undefined"){
            this.org = org
        }else{
            this.org = 0
        }
    }

    assemble(raw: string){
        raw.split("\n").forEach((l) => {
            const val = this.assembleLine(l)
        })
    }

    assembleLine(l: string){
        const tokens = [...l.matchAll(insPattern)]

        //Is this an ins with an argument?
        if(typeof tokens[0] !== "undefined" && tokens[0].length == 3){
            const op = this.findOp(tokens[0][1])

            if(op !== null){                
                if(tokens[0][2] !== undefined){ //We have an arg
                    const mode = this.matchMode(tokens[0][2])
                    
                    if(mode != null){
                        const encArgs = {
                            code: binToDec(op.pattern),
                            mode: mode.code,
                            addr: parseInt(mode.arg),
                            modeName: mode.mode,
                            effAddr: parseFloat(mode.arg)
                        }

                        const val = op.encode(encArgs as any)

                        if(op.size == 1){ //Single word
                            this.state.memory.set(this.org, val)
                        }else if(op.size == 2){ //Double word
                            //console.log(decToBin(val, 32).slice(0, 16), decToBin(val, 32).slice(16, 32))

                            this.state.memory.set(this.org, binToDec(decToBin(val, 32).slice(0, 16)))
                            this.state.memory.set(this.org + 1, binToDec(decToBin(val, 32).slice(16, 32)))
                        }
                        
                        this.org += op.size

                        return val
                    }
                }else{ //No arg
                    //This will need special tooling for parsing things out
                    const encArgs = {
                        class: binToDec(op.pattern),
                        op: 0,
                        def: 0
                    }

                    const val = op.encode(encArgs as any)
                    this.state.memory.set(this.org, val)
                    this.org += op.size

                    return val
                }
            }
        }

        //Is this a literal?
        const lit = [...l.matchAll(literalPatetrn)]

        if(typeof lit[0] !== "undefined" && lit[0].length == 2){
            const val = parseInt(lit[0][1])

            this.state.memory.set(this.org, val)
            this.org++

            return val
        }

        return null
    }

    findOp(name: string){
        const op = operations.filter((o) => (name == o.name))

        if(op.length > 0){
            return op[0]
        }

        return null
    }

    matchMode(arg: string){
        for(const m of modePatterns){
            const match = [...arg.matchAll(m.pattern)]
            if(m !== undefined && match.length > 0){
                return {
                    ...m,
                    arg: match[0][1]
                }
            }
        }

        return null
    }

    readLabels(l: string){}
}