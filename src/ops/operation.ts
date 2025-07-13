import { State } from "state"
import { Bit } from "../util"

/**
 * Abstract Operation class
 *  This is used to define all emualted operations
 *  Each operation will mutate a machine state, and has a few helper functions bound up with that
 * 
 * Operations are further defined by 4 child classes for each broad type of operation.
 * These are grouped by the format of each instruction. Which, in practice here, means their TArgs.
 * Those child classes are:
 *  DoubleWordAddressingOp      For double-word long instructions that reference addresses
 *  DoubleWordNonAddressingOp   For double-word long instructions that do not reference addresses
 *  SingleWordAddressingOp      For single-word long instructions that reference addresses
 *  SingleWordNonAddressingOp   For single-word long instructions that do not reference addresses
 * 
 * Each of these child classes defines the word size and encode/decode logic for their instruction class.
 * This makes it so that specific op classes only need to specify a name/id/pattern and eval function.
 * 
 *  @type TArgs - Type for arguments to be passed to operation's eval.
 */
export abstract class Operation<TArgs>{
    name: string        //Short name of operation. Used for assembly/disassembly.
    id: number          //Numeric op code.
    pattern: Array<Bit> //Bit battern prefix. Used to match instructions against op codes.
    size: number        //Size of instruction, in words.

    abstract encode(args: TArgs): number //Turn a TArgs back into an encoded instruction. Used for assembling code.
    abstract decode(state: State): TArgs //Turn a State into some TArgs for eval to use
    abstract eval(state: State, args: TArgs): Promise<State> //Mutate a state, given some TArgs
}
