/*   Chord Transposer
 *   Author: Jordan Barrett (@barrettj12)
 *
 *   Common constants used by the other classes
 */


export const NOTE_NAMES = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
export const SYMBOLS = ['#', 'b'];

// Sharp shifts for transposing
export const SHARP_SHIFT = [
  [0, -1, 0,  0, 1, 0, -1, 0,  0, 1,  0, 1],
  [0,  0, 1,  0, 1, 0,  0, 1,  0, 1,  0, 1],
  [0, -1, 0, -1, 0, 0, -1, 0, -1, 0, -1, 0],
  [0, -1, 0,  0, 1, 0, -1, 0, -1, 0,  0, 1],
  [0,  0, 1,  0, 1, 0, -1, 0,  0, 1,  0, 1],
  [0, -1, 0, -1, 0, 0, -1, 0, -1, 0, -1, 0],
  [0, -1, 0, -1, 0, 0, -1, 0, -1, 0,  0, 1],
]

// Steps between notes in order (A->B, B->C, ...)
export const STEPS = [2,1,2,2,1,2,2];