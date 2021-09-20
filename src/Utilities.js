/*   Chord Transposer
 *   Author: Jordan Barrett
 *
 *   Useful utilities for the other files
 */


export function mod(x, y) {
  let init = x % y;
  return (init >= 0 ? init : init + y);
}

/* // An array that "loops", and can take any integer value as an index
class CyclicArray {
  constructor(array) {
    this.data = array;
    this.length = array.length;
  }
  
  get(i) {
    return data[ mod(i, length) ];
  }
} */