import {describe, expect, test} from '@jest/globals'

import { OpSTA } from './sta'
import { State } from '../../state'

describe("STA", () => {
    test("Direct STA", async () => {
        const state = new State()
        const lda = new OpSTA()

        state.registers.a.set(1)

        await lda.eval(state, {
            code: 1,
            mode: 0,
            addr: 0,
            effAddr: 0,
            modeName: "DIRECT"
        })

        expect(state.memory.get(0)).toBe(1)
    })
})