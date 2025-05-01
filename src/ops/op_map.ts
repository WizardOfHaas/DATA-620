import { bitCmp, decToBin } from "../util";
import { OpJMP } from "./double_w_addr/jmp";
import { Operation } from "./operation";
import { OpADD } from "./single_w_addr/add";
import { OpINR } from "./single_w_addr/inr";
import { OpLDA } from "./single_w_addr/lda";
import { OpLDB } from "./single_w_addr/ldb";
import { OpLDX } from "./single_w_addr/ldx";
import { OpSTA } from "./single_w_addr/sta";
import { OpSTB } from "./single_w_addr/stb";
import { OpSTX } from "./single_w_addr/stx";
import { OpSUB } from "./single_w_addr/sub";
import { OpHLT } from "./single_w_non_addr/hlt";
import { OpNOP } from "./single_w_non_addr/nop";
import { OpROF } from "./single_w_non_addr/rof";
import { OpSOF } from "./single_w_non_addr/sof";

export const operations = [
    new OpADD(),
    new OpINR(),
    new OpLDA(),
    new OpLDB(),
    new OpLDX(),
    new OpSTA(),
    new OpSTB(),
    new OpSTX(),
    new OpSUB(),
    new OpHLT(),
    new OpNOP(),
    new OpROF(),
    new OpSOF(),
    new OpJMP()
].sort((a, b) => b.pattern.length - a.pattern.length)

export function findOp(val: number): Operation<any> | null{
    const bits = decToBin(val, 16)

    for(const op of operations){
        const pattern = bits.slice(0, op.pattern.length)

        if(bitCmp(pattern, op.pattern)){
            return op
        }
    }

    return null
}

