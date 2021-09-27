/*   Chord Transposer
 *   Author: Jordan Barrett
 *
 *   Main file  
 */


/*import { NOTE_NAMES } from "./Constants.js";
import { Note } from "./Note.js";*/
import { ChordString } from "./ChordString.js";


// Main method for transposing a chord sequence by a given amount
export function transpose(input, amount) {
  let newCS = ChordString.transpose(
    ChordString.parse(input),
    amount
  )
  /* 
  console.log("transposed thing is",newCS);
  for (const nt of newCS.chords){console.log(nt);} */
  return newCS.toString();
}

/*console.log(transpose("A B C", -2));


// Testing

for (const char of NOTE_NAMES) {
  let noteC = new Note(char, 0);
  for (let i = 0; i < 12; i++) {
    console.log(char,i,"is",
      Note.transpose(noteC, i).toString());
  }
}



ChordString.parse("Ab A --");
ChordString.parse("AbA");
console.log("------------------");
let JigP = ChordString.parse(`*** jigsaw puzzle ***

intro/verse:   B - A - F# - E

chorus:   E - F# - A - B - B
                 A - A - B - B`);
console.log("------------------");
//console.log(JigP.totAcc());
//console.log(JigP.hasSharp());
//console.log(JigP.hasFlat());
console.log("------------------");
console.log(7/12);

let A = new Note("A", 0);
let Bb = new Note("B", -1);
let Cs = new Note("C", 1);
let Dss = new Note("D", 2);
let Fbb = new Note("F", -2);
console.log(A.toString());
console.log(Bb.toString());
console.log(Note.transpose(Dss,0,-2).toString());
 */