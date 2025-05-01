export class Register{
    bits: number
    data: number

    constructor(){
        this.data = 0
    }
    
    set(val: number){
        //Increment overflow detection here
        this.data = val % (2 ** this.bits)
    }

    get(){
        return this.data
    }

    inc(n: number = 1){
        this.set(this.get() + n)
    }
}