import {describe, expect, test} from '@jest/globals'

import { OpLDA } from './lda'
import { State } from '../../state'

describe("LDA", () => {
    test("Direct LDA", async () => {
        const state = new State()
        const lda = new OpLDA()

        state.memory.set(0, 1)

        await lda.eval(state, {
            code: 1,
            mode: 0,
            addr: 0,
            effAddr: 0,
            modeName: "DIRECT"
        })

        expect(state.registers.a.get()).toBe(1)
    })
})