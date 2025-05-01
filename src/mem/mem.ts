export class Memory{
    readonly MEMORY_SIZE = 2048
    readonly MEMORY_BITS = 16

    data = new Array<number>(this.MEMORY_SIZE).fill(0)

    constructor(){
    }

    set(addr: number, val: number){
        //Implement overflow protection here
        this.data[addr % this.MEMORY_SIZE] = val % (2 ** this.MEMORY_BITS)
    }

    get(addr: number){
        return this.data[addr % this.MEMORY_SIZE]
    }

    getBin(addr){
        const val = this.get(addr)

        const bits = val.toString(2).split("").map(Number)
    
        return Array(this.MEMORY_BITS - bits.length).fill(0).concat(bits)
    }
}