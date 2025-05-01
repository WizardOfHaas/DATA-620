import {describe, expect, test} from '@jest/globals'

import { OpJMP } from './jmp'
import { State } from '../../state'

describe("INR", () => {
    test("Direct STA", async () => {
        const state = new State()
        const inr = new OpJMP()

        await inr.eval(state, {
            mode: 0,
            code: 1,
            addr: 123,
            effAddr:123
        })

        expect(state.registers.p.get()).toEqual(123)
    })
})