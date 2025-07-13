/**
 * Base Register class
 *  Specific registers extend this class by setting their bit size, constructor behavior, and adding any special functions they can do.
 *  Right now all regs just set the bits property, but some of the index registers may need some special functions later on.
 */
export class Register{
    bits: number //How big is this register?
    data: number //This is internal, used to store the reg's actual value.

    constructor(){
        this.data = 0 //We start off empty.
    }
    
    set(val: number){
        //Increment overflow detection here
        this.data = val % (2 ** this.bits)
    }

    get(){
        return this.data
    }

    inc(n: number = 1){
        //Add 1 to the register, and account for rollover
        this.set(this.get() + n)
    }
}