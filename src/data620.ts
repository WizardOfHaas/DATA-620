import { findOp } from "./ops/op_map"
import { State } from "./state"

export class Data620{
    state: State

    constructor(){
        this.state = new State()
    }

    async run(){
        console.log("[START RUN]")

        this.state.running = true

        while(this.state.running == true){

            //Load regs.u = mem[regs.p]
            this.state.registers.u.set(this.state.memory.get(this.state.registers.p.get()))

            //Decode
            const op = findOp(this.state.registers.u.get())

            if(op != null){
                const args = op.decode(this.state)

                console.log(this.state.registers.p.get(), op.name, args)

                this.state = await op.eval(this.state, args)
            }
        }
    }
}