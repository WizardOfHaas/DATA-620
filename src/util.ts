export function decToBin(d, n?: number){
    const bits = d.toString(2).split("").map(Number)

    if(n == undefined){
        return bits
    }

    return Array(n - bits.length).fill(0).concat(bits)
}

export function binToDec(b){
    return parseInt(b.join(""), 2);
}

export function bitCmp(a: BitArray, b: BitArray): boolean{
    return binToDec(a) == binToDec(b)
}

export type Bit = 1 | 0
export type BitArray = Array<Bit>
export type TModes = "DIRECT" | "RELATIVE" | "XINDEX" | "BINDEX" | "INDIRECT"