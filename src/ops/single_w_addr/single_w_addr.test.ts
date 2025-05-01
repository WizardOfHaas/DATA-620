import {describe, expect, test} from '@jest/globals'

import { SingleWordAddressingOp } from './single_w_addr'
import { binToDec, BitArray, decToBin } from '../../util'
import { State } from '../../state'

class TestOp extends SingleWordAddressingOp{
    name = "tst"
    id = 123
    pattern = [1, 1, 1, 1] as BitArray

    eval(state, args){
        return state
    }
}

describe("Single Word With Address Arguments", () => {
    test("Decodes", () => {
        const state = new State()
        state.registers.u.set(binToDec([
            1, 1, 1, 1,
            0, 0, 1, //Direct mode
            1, 1, 0, 0, 0, 0, 0, 0, 1
        ]))

        const testOp = new TestOp()

        const args = testOp.decode(state)

        expect(args).toEqual({ code: 15, mode: 1, addr: 385, effAddr: 897, modeName: 'DIRECT' })
    })

    test("Decodes Relative Mode", () => {
        const state = new State()
        state.registers.u.set(binToDec([
            1, 1, 1, 1,
            1, 0, 0, //Relative Mode
            1, 1, 0, 0, 0, 0, 0, 0, 1
        ]))
        state.registers.p.set(1) //Relative it up by 1

        const testOp = new TestOp()

        const args = testOp.decode(state)

        expect(args).toEqual({ code: 15, mode: 4, addr: 385, effAddr: 386, modeName: 'RELATIVE' })
    })

    test("Decodes X Index Mode", () => {
        const state = new State()
        state.registers.u.set(binToDec([
            1, 1, 1, 1,
            1, 0, 1, //X Index Mode
            1, 1, 0, 0, 0, 0, 0, 0, 1
        ]))
        state.registers.x.set(1) //X it up by 1

        const testOp = new TestOp()

        const args = testOp.decode(state)

        expect(args).toEqual({ code: 15, mode: 5, addr: 385, effAddr: 386, modeName: 'XINDEX' })
    })

    test("Decodes B Index Mode", () => {
        const state = new State()
        state.registers.u.set(binToDec([
            1, 1, 1, 1,
            1, 1, 0, //B Index Mode
            1, 1, 0, 0, 0, 0, 0, 0, 1
        ]))
        state.registers.b.set(1) //B it up by 1

        const testOp = new TestOp()

        const args = testOp.decode(state)

        expect(args).toEqual({ code: 15, mode: 6, addr: 385, effAddr: 386, modeName: 'BINDEX' })
    })

    test("Decodes Indirect Mode", () => {
        const state = new State()
        state.registers.u.set(binToDec([
            1, 1, 1, 1,
            1, 1, 1, //Indirect Mode
            1, 1, 0, 0, 0, 0, 0, 0, 1
        ]))
        state.memory.set(385, 123) //Set the address word up

        const testOp = new TestOp()

        const args = testOp.decode(state)

        expect(args).toEqual({ code: 15, mode: 7, addr: 385, effAddr: 123, modeName: 'INDIRECT' })
    })

    test("Encodes Instruction", () => {
        const testOp = new TestOp()
        const state = new State()

        const testArgs = { code: 15, mode: 0, addr: 385, effAddr: 385, modeName: 'DIRECT' }
        const ins = testOp.encode(testArgs as any)

        state.registers.u.set(ins)

        const args = testOp.decode(state)

        expect(args).toEqual(testArgs)
    })
})