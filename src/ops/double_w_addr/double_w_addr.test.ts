import {describe, expect, test} from '@jest/globals'
import { DoubleWordAddressingOp } from './double_w_addr';
import { binToDec, BitArray } from '../../util';
import { State } from '../../state';

class TestOp extends DoubleWordAddressingOp{
    name = "test"
    id = 0
    pattern = [1, 1, 1, 1] as BitArray

    eval(state, args){
        return state
    }

    encode(args){return 0}
}

describe("Double Word Addressing Op", () => {
    test("Decodes", () => {
        const state = new State()
        const testOp = new TestOp()

        //Set operation
        state.memory.set(0, binToDec([
            0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0
        ]))

        state.memory.set(1, binToDec([
            1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1
        ]))

        const args = testOp.decode(state)

        expect(args).toEqual({ code: 0, mode: 1, addr: 0, effAddr: 1 })
    })
})