/*   Chord Transposer
 *   Author: Jordan Barrett (@barrettj12)
 *
 *   The Note class
 *   Each instance represents a single musical note
 */


import { NOTE_NAMES, SHARP_SHIFT } from "./Constants.js";
import { mod } from "./Utilities.js";


export class Note {
  constructor(letter, sharpness) {
    // Char between 'A' and 'G'
    this.letter = letter;
    // Integer. 0 = natural, -1 = flat, +1 = sharp, -2 = double flat, etc
    this.sharpness = sharpness;
  }
  
  toString() {
    let str = this.letter;
    let k = this.sharpness;
    
    while (k != 0) {
      if (k > 0) {
        str += '#';
        k--;
      } else {
        str += 'b';
        k++;
      }
    }
    
    return str;
  }
  
  // Best guess transpose
  static transpose(note, semitones) {
    // New note letter
    let letterShift = Math.round(semitones*7/12);
    let newLetter = this.letterShift(note.letter, letterShift);
    
    // Calculate sharp shift from array - normally 0
    let sharpShift = SHARP_SHIFT
                        [this.letterCode(note.letter)]
                        [semitones];
    
    return new Note(
      newLetter,
      note.sharpness + sharpShift
    );
  }
  
  static letterShift(letter, num) {
//    let origCode = letter.charCodeAt(0);
//    let intrCode = ( this.letterCode(letter) + num ) % 7
//    let newCode = ( intrCode >= 0 ? intrCode : intrCode + 7 );
    return NOTE_NAMES[mod(this.letterCode(letter)+num, 7)];
  }
  
  // Associates each char A-G to its position in NOTE_NAMES
  static letterCode(letter) {
    return letter.charCodeAt(0) - 65;
  }
  
  // Works out the num of semitones between two notes
  // e.g. distBtwn(A#, C) = 2
  //      distBtwn(D, B) = -3
  // Returns integer between -5 and 6 (inclusive)
  static distBtwn(note1, note2) {
    // Workout dist between letters first
    let letter1 = note1.letter;
    let letter2 = note2.letter;
    
    // Ensure correct range
    
    // --- FINISH THIS ---
  }
}