//const Note = require('../js/Note.js')
import { restElement } from "@babel/types";
import { Note } from "../js/Note.js";


// Make some notes to test
const testNotes = [
// name,  Note object
  ['Eb',  new Note('E', -1)],
  ['C',   new Note('C',  0)],
  ['D',   new Note('D',  0)],
  ['B',   new Note('B',  0)],
  ['C#',  new Note('C',  1)],
  ['F##', new Note('F',  2)]
]


// Test n.toString() function
describe('note.toString()', () => {
  test.each(testNotes)(
    '%s.toString()', (name, note) => {
      expect(note.toString()).toBe(name)
    }
  )
})

// Test transpose
describe('Note.transpose()', () => {
  const shiftBy = [-3, -1, 0, 1, 4]
  const expected = [
    ['C' , 'D' , 'Eb', 'Fb', 'G' ],
    ['A' , 'B' , 'C' , 'Db' , 'E' ],
    ['B' , 'C#', 'D' , 'Eb' , 'F#'],
    ['G#', 'A#', 'B' , 'C'  , 'D#'],
    ['A#', 'B#', 'C#', 'D', 'E#'],
    ['D##', 'E##', 'F##', 'G#', 'A##']
  ]

  test.each(prepin(shiftBy, expected))(
    'Note.transpose(%s,%d)', (name, shift, note, exp) => {
      expect(Note.transpose(note, shift).toString()).toBe(exp)
    }
  )
})

// Test enharmonic up function
describe('Note.enharmonicUp()', () => {
  const expected = ['D#', 'B#', 'C##', 'A##', 'B##', 'E###']

  test.each(prep(expected))(
    'Note.enharmonicUp(%s)', (name, note, exp) => {
      expect(Note.enharmonicUp(note).toString()).toBe(exp)
    }
  )
})

// Test enharmonic down function
describe('Note.enharmonicDown()', () => {
  const expected = ['Fbb', 'Dbb', 'Ebb', 'Cb', 'Db', 'G']

  test.each(prep(expected))(
    'Note.enharmonicDown(%s)', (name, note, exp) => {
      expect(Note.enharmonicDown(note).toString()).toBe(exp)
    }
  )
})


// Helper functions to collect test inputs and outputs into a single array
function prep(outputs) {
  return outputs.map((o, i) =>
  //   note name,      Note object,  expected
    [testNotes[i][0], testNotes[i][1], o]
  )
}

function prepin(inputs, outputs) {
  let res = []

  for (let i = 0; i < testNotes.length; i++) {
    for (let j = 0; j < inputs.length; j++) {
      //          note name,    other input,  Note object,     expected
      res.push([testNotes[i][0], inputs[j], testNotes[i][1], outputs[i][j]])
    }
  }

  return res
}
/*test('note.toString()', () => {
  expect(A.toString()).toBe('A')
  expect(Bb.toString()).toBe('Bb')
  expect(Cs.toString()).toBe('C#')
  expect(Dss.toString()).toBe('D##')
  expect(Fbb.toString()).toBe('Fbb')
})*/