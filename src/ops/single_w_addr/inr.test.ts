import {describe, expect, test} from '@jest/globals'

import { OpINR } from './inr'
import { State } from '../../state'

describe("INR", () => {
    test("Direct STA", async () => {
        const state = new State()
        const inr = new OpINR()

        state.memory.set(5, 2)

        await inr.eval(state, {
            code: 4,
            mode: 0,
            addr: 5,
            effAddr: 5,
            modeName: "DIRECT"
        })

        expect(state.memory.get(5)).toBe(3)
    })
})