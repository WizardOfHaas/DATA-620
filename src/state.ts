import { Bit } from "./util";
import { Memory } from "./mem/mem";
import { RegisterA } from "./reg/a";
import { RegisterB } from "./reg/b";
import { RegisterL } from "./reg/l";
import { RegisterP } from "./reg/p";
import { RegisterR } from "./reg/r";
import { RegisterU } from "./reg/u";
import { RegisterW } from "./reg/w";
import { RegisterX } from "./reg/x";

export class State{
    memory: Memory

    registers: {
        a: RegisterA,
        b: RegisterB,
        l: RegisterL,
        p: RegisterP,
        r: RegisterR,
        u: RegisterU,
        w: RegisterW,
        x: RegisterX
    }

    flags: {
        overflow: Bit
    }

    running: boolean

    constructor(){
        this.running = false

        this.flags = {
            overflow: 0
        }

        this.memory = new Memory
        
        this.registers = {
            a: new RegisterA(),
            b: new RegisterB(),
            l: new RegisterL(),
            p: new RegisterP(),
            r: new RegisterR(),
            u: new RegisterU(),
            w: new RegisterW(),
            x: new RegisterX()
        }
    }
}