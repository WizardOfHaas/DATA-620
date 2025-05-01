import {describe, expect, test} from '@jest/globals'

import { Assembler } from './asm'
import { State } from '../state'
import { OpINR } from '../ops/single_w_addr/inr'
import { OpJMP } from '../ops/double_w_addr/jmp'

describe("Assembler", () => {
    test("Assembles program", () => {
        const state = new State()
        const asm = new Assembler(state)

        asm.assemble("lda 1\ninr 1\njmp 5")
    })

    test("LITERAL", () => {
        const state = new State()
        const asm = new Assembler(state)

        const val = asm.assembleLine("=123")

        expect(val).toEqual(123)
    })

    test("Single Word Addressing - RELATIVE", () => {
        const state = new State()
        const asm = new Assembler(state)
        const inr = new OpINR()

        const val = asm.assembleLine("inr (5 + p)")

        expect(val).not.toBeNull()
        
        if(val != null){
            state.registers.u.set(val)

            const args = inr.decode(state)
            expect(args).toEqual({ code: 4, mode: 4, addr: 5, effAddr: 5, modeName: 'RELATIVE' })
        }
    })

    test("Single Word Addressing - XINDEX", () => {
        const state = new State()
        const asm = new Assembler(state)
        const inr = new OpINR()

        const val = asm.assembleLine("inr (5 + x)")

        expect(val).not.toBeNull()
        
        if(val != null){
            state.registers.u.set(val)

            const args = inr.decode(state)
            expect(args).toEqual({ code: 4, mode: 5, addr: 5, effAddr: 5, modeName: 'XINDEX' })
        }
    })

    test("Single Word Addressing - BINDEX", () => {
        const state = new State()
        const asm = new Assembler(state)
        const inr = new OpINR()

        const val = asm.assembleLine("inr (5 + b)")

        expect(val).not.toBeNull()
        
        if(val != null){
            state.registers.u.set(val)

            const args = inr.decode(state)
            expect(args).toEqual({ code: 4, mode: 6, addr: 5, effAddr: 5, modeName: 'BINDEX' })
        }
    })

    test("Single Word Addressing - INDIRECT", () => {
        const state = new State()
        const asm = new Assembler(state)
        const inr = new OpINR()

        const val = asm.assembleLine("inr (5)*")

        expect(val).not.toBeNull()
        
        if(val != null){
            state.registers.u.set(val)

            const args = inr.decode(state)
            expect(args).toEqual({ code: 4, mode: 7, addr: 5, effAddr: 0, modeName: 'INDIRECT' })
        }
    })

    test("Single Word Addressing - DIRECT", () => {
        const state = new State()
        const asm = new Assembler(state)
        const inr = new OpINR()

        const val = asm.assembleLine("inr 5")

        expect(val).not.toBeNull()
        
        if(val != null){
            state.registers.u.set(val)

            const args = inr.decode(state)
            expect(args).toEqual({ code: 4, mode: 0, addr: 5, effAddr: 5, modeName: 'DIRECT' })
        }
    })

    test("Double Word Addressing - DIRECT", () => {
        const state = new State()
        const asm = new Assembler(state)
        const jmp = new OpJMP()

        const val = asm.assembleLine("jmp 3")

        expect(val).not.toBeNull()

        console.log(state.memory.get(0))
        console.log(state.memory.get(1))

        if(val != null){
            state.registers.u.set(val)

            const args = jmp.decode(state)
            expect(args).toEqual({ code: 0, mode: 1, addr: 0, effAddr: 3 })
        }
    })
})