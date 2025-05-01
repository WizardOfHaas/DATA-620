import {describe, expect, test} from '@jest/globals'

import { Register } from './register'

class TestReg extends Register{
    bits = 16
}


describe("Register Emulation", () => {
    test('Set and Get', () => {
        const reg = new TestReg()

        reg.set(1234)
        const val = reg.get()

        expect(val).toEqual(1234)
    })

    test('Set and Get w/ Wrap', () => {
        const reg = new TestReg()

        reg.set(2 ** reg.bits)
        const val = reg.get()

        expect(val).toEqual(0)
    })
})