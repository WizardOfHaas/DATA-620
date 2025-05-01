import { Assembler } from './asm/asm'
import { Data620 } from './data620'
import { binToDec } from './util'

import fs from 'fs'

const data620 = new Data620()

//Load test program
/*data620.state.memory.set(0, binToDec([
    0, 1, 0, 0,
    1, 0, 0,
    1, 1, 0, 0, 0, 0, 0, 0, 1
]))*/

const asm = new Assembler(data620.state)
asm.assemble(fs.readFileSync("./test_code/test.asm").toString())

await data620.run()

console.log(data620.state.memory.get(5))