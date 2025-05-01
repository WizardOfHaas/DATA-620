import {describe, expect, test} from '@jest/globals'

import { findOp } from './op_map'

describe("Operation Map", () => {
    test("Decode HLT", () => {
        const op = findOp(1)

        if(op != null){
            expect(op.name).toBe("hlt")
        }
    })

    test("Decode ADD", () => {
        const op = findOp(40960 + 123)

        if(op != null){
            expect(op.name).toBe("add")
        }
    })
})