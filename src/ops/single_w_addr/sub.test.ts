import {describe, expect, test} from '@jest/globals'

import { OpSUB } from './sub'
import { State } from '../../state'

describe("SUB", () => {
    test("Direct SUB", async () => {
        const state = new State()
        const add = new OpSUB()

        state.memory.set(0, 1)
        state.registers.a.set(2)

        await add.eval(state, {
            code: 14,
            mode: 0,
            addr: 0,
            effAddr: 0,
            modeName: "DIRECT"
        })

        expect(state.registers.a.get()).toBe(1)
    })
})