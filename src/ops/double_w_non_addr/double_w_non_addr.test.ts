import {describe, expect, test} from '@jest/globals'

import { DoubleWordNonAddressingOp } from './double_w_non_addr'
import { State } from '../../state'
import { binToDec } from '../../util'

class TestOp extends DoubleWordNonAddressingOp{
    name = "test"
    id = 0
    pattern = []

    eval(state, args){
        return state
    }

    encode(args){
        return 0
    }
}

describe("Double Word Without Addressing", () => {
    test("Decodes", () => {
        const state = new State()

        //Set operation
        state.registers.u.set(binToDec([
            1, 1, 1, 1,
            1, 0, 1,
            0, 0, 0, 1, 0, 0, 0,
            0, 1
        ]))

        //Set extended word
        state.memory.set(1, 1234)

        const testOp = new TestOp()

        const args = testOp.decode(state)

        expect(args).toEqual({ op: 4, operand: 1234 })
    })
})