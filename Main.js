// https://www.programiz.com/javascript/online-compiler/


// *** TODO ***
// - Use classes to simplify some of the indexing
// - Make separate files



const NOTE_NAMES = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const SYMBOLS = ['#', 'b'];

// Sharp shifts for transposing
const SHARP_SHIFT = [
  [0, -1, 0,  0, 1, 0, -1, 0,  0, 1,  0, 1],
  [0,  0, 1,  0, 1, 0,  0, 1,  0, 1,  0, 1],
  [0, -1, 0, -1, 0, 0, -1, 0, -1, 0, -1, 0],
  [0, -1, 0,  0, 1, 0, -1, 0, -1, 0,  0, 1],
  [0,  0, 1,  0, 1, 0, -1, 0,  0, 1,  0, 1],
  [0, -1, 0, -1, 0, 0, -1, 0, -1, 0, -1, 0],
  [0, -1, 0, -1, 0, 0, -1, 0, -1, 0,  0, 1],
]


// Represents a musical note
class Note {
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
      newLetter, // shift?
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


// Represents a collection of chords with associated formatting data
class ChordString {
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
//    let rawNotes = cs.chords.map( x => x[1] );
    
    // Want to minimise total number of accidentals
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
}



//   UTILITIES

function mod(x, y) {
  let init = x % y;
  return (init >= 0 ? init : init + y);
}

// An array that "loops", and can take any integer value as an index
class CyclicArray {
  constructor(array) {
    this.data = array;
    this.length = array.length;
  }
  
  get(i) {
    return data[ mod(i, length) ];
  }
}



//   MAIN / TESTING

for (const char of NOTE_NAMES) {
    noteC = new Note(char, 0);
    for (let i = 0; i < 12; i++) {
        console.log(char,i,"is",
          Note.transpose(noteC, i).toString());
    }
}


/*
ChordString.parse("Ab A --");
ChordString.parse("AbA");
console.log("------------------");
JigP = ChordString.parse(`*** jigsaw puzzle ***

intro/verse:   B - A - F# - E

chorus:   E - F# - A - B - B
                 A - A - B - B`);
console.log("------------------");
console.log(JigP.totAcc());
console.log(JigP.hasSharp());
console.log(JigP.hasFlat());
console.log("------------------");
console.log(7/12);

A = new Note("A", 0);
Bb = new Note("B", -1);
Cs = new Note("C", 1);
Dss = new Note("D", 2);
Fbb = new Note("F", -2);
console.log(A.toString());
console.log(Bb.toString());
console.log(Note.transpose(Dss,0,-2).toString());
*/
