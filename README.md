# Bones of a Data 620 emulator

To install just hit an `npm i`. Unit tests are fired off with `npm run test`. `npm run dev` will assemble an example file in `test_code`, load, and execute it.

# Theory of Operation

This emulator is based around a basic state machine. Each operation is written to accept the current state of the machine, mutate it, and then return the new state of the machine. This makes the machine cycle as simple as load the next instruction, decode it to determinte the operationt to run, operate on the state, then apply the returned state. It also makes the code for each operation as simple as possible.
