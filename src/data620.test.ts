import {describe, expect, test} from '@jest/globals'

import { Data620 } from './data620'
import { binToDec } from './util'

describe("Big Tests", () => {
    test("Run", async () => {
        const data620 = new Data620()

        //Load test program
        data620.state.memory.set(0, binToDec([
            0, 1, 0, 0,
            1, 1, 1, //Indirect Mode
            1, 1, 0, 0, 0, 0, 0, 0, 1
        ]))

        //await data620.run()
    })
})