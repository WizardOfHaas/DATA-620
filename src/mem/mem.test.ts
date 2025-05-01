import {describe, expect, test} from '@jest/globals'

import { Memory } from './mem'

describe("Memory Emulation", () => {
    test('Set and Get', () => {
      const mem = new Memory()
       
      mem.set(100, 1234)
      const ret = mem.get(100)

      expect(ret).toEqual(1234)
   })

   test('Get and Set w/ Wrap', () => {
      const mem = new Memory()
        
      mem.set(mem.MEMORY_SIZE + 1, 1234)
      const ret = mem.get(1)
 
      expect(ret).toEqual(1234)
   })

   test('Get Bits', () => {
      const mem = new Memory()

      mem.set(0, 3)

      const v = mem.getBin(0)
      
      expect(v).toEqual([
         0, 0, 0, 0, 0, 0,
         0, 0, 0, 0, 0, 0,
         0, 0, 1, 1
      ])
   })
})