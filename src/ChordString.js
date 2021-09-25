/*   Chord Transposer
 *   Author: Jordan Barrett
 *
 *   The ChordString class
 *   Each instance represents a collection of chords with associated formatting data
 */


import { NOTE_NAMES, SYMBOLS } from "./Constants.js";
import { Note } from "./Note.js";


export class ChordString {
  constructor(base, chords) {
    this.base = base;
    // Array of pairs [pos, note]
    this.chords = chords;
  }
  
/*  transpose(letterShift, sharpShift) {
//    return new Note(
//      note.letter, // shift?
//      note.sharpness + sharpShift
//    );

    // --- FINISH THIS ---
  }*/
  
  rawNotes() {
    return this.chords.map( x => x[1] );
  }
  
  // Want to minimise this when finding best enharmonic
  totSharpness() {
    return this.rawNotes().map( x => x.sharpness )
                          .reduce( (x, y) => x + y, 0 );
  }
  
/*  hasSharp() {
    return this.doAllNotes( x => (x.sharpness > 0) );
  }
  
  hasFlat() {
    return this.doAllNotes( x => (x.sharpness < 0) );
  }
  
  // Input: function condition : Note -> bool
  //   Returns true iff all Notes satisfy condition
  doAllNotes(condition) {
    let rn = this.rawNotes();
    
    for (const note of rn) {
//      console.log(note);
      if (condition(note)) {
        return true;
      }
    }
    
    return false;
  }*/
  
  
  static transpose(cs, semitones) {
    // Have this.rawNotes() now
/*     let rn = this.rawNotes();
    let notes = [];

    for (const note of rn) {
      let newNote = Note.transpose(note, semitones)
      notes.push([cs., newNote]);
    } */

    return new ChordString(
      cs.base,
      cs.chords.map( x => [
        x[0],
        Note.transpose( x[1], semitones )
      ] )
    );
    
    // Want to minimise |totalSharpness|

    // FINISH THIS
  }
  
  // Do this in a smarter way
  // Have buffers for current note and for base string
  // Check next character (if it exists) then decide what to do
  static parse(rawStr) {
//    console.log("rawStr is",rawStr);
      
    let newBase = "";
    let parsingSymbols = false;   // Whether we can parse symbols 'b' '#' at this time
    let noteName = "";
    let sharpness = 0;
    let notes = [];
    
    for (const char of rawStr) {
//      console.log("char is",char);
      if (NOTE_NAMES.includes(char)) {
        if (parsingSymbols) {
          // Create note from current values
          createNote();
        }
        
        // Start parsing next note
 //       console.log("got note name " + char);
        parsingSymbols = true;
        noteName = char;
      }
      else if (parsingSymbols && SYMBOLS.includes(char)) {
        sharpness += (char === '#' ? 1 : -1);
      }
      else {
        createNote();
        
        // Char goes on base
        newBase += char;
      }
    }
    
    createNote();
    
    const cs = new ChordString(newBase, notes);
    console.log("returning", cs);
    return cs;
      
    // Creates a Note if there is one in the buffer
    function createNote() {
      if (noteName != "") {
//        console.log("new note", noteName, sharpness);
        // Time to create a note
        let nextNote = new Note(noteName, sharpness);
        // Enter in dictionary
        notes.push([newBase.length, nextNote]);
      
        // Reset parsing
        parsingSymbols = false;
        noteName = "";
        sharpness = 0;
      }
    }

/*    let newBase = "";
    let parsingSymbols = false;   // Whether we can parse symbols 'b' '#' at this time - true iff the last char was a note name
    let sharpness = 0;
    let noteName = "";
//    let notePos = -1
    let notes = [];
    
    for (let i = 0; i < rawStr.length; i++) {
      const char = rawStr.charAt(i);
        
      if (NOTE_NAMES.includes(char)) {
        console.log("got note name " + char);
        parsingSymbols = true;
        noteName = char;
 //       notePos = i;
      }
      else if (parsingSymbols && SYMBOLS.includes(char)) {
        console.log("got symbol " + char);
        
        if (char === '#') {
          sharpness += 1;
        } else {
          sharpness -= 1;
        }
      }
      else {
        createNote();
        // Char goes on base
        newBase += char;
        // Reset parsing
        parsingSymbols = false;
        sharpness = 0;
      }
    }
    createNote();
    
    const cs = new ChordString(newBase, notes);
    console.log("returning", cs);
    return cs;
      
    function createNote() {
      console.log("new note", noteName, sharpness);
      // Time to create a note
      let nextNote = new Note(noteName, sharpness);
      // Enter in dictionary
      notes.push(newBase.length, nextNote);
    }*/
  }

  toString(){
    return "foo";
  }
}