import {describe, expect, test} from '@jest/globals'

import { OpADD } from './add'
import { State } from '../../state'

describe("ADD", () => {
    test("Direct ADD", async () => {
        const state = new State()
        const add = new OpADD()

        state.memory.set(0, 2)
        state.registers.a.set(1)

        await add.eval(state, {
            code: 10,
            mode: 0,
            addr: 0,
            effAddr: 0,
            modeName: "DIRECT"
        })

        expect(state.registers.a.get()).toBe(3)
    })
})