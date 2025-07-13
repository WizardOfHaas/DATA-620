/**
 * This class describes the state of the Data 620
 *  Each operation takes an instance of State as an argument, and returns a instance of State.
 *  I am using a class here because we need a consistant way to initiate a clean state.
 */

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
        this.running = false //The computer starts in the "off" position

        //Specify initial flags. I think this can be modified by front panel switches?
        this.flags = {
            overflow: 0 
        }

        //Construct new memory and registers. Mem and each reg know what their initial state should be.
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