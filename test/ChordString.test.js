/*   Chord Transposer
 *     https://github.com/barrettj12/chord-transposer
 *   Author: Jordan Barrett (@barrettj12)
 *     https://github.com/barrettj12
 *
 *   Testing for the ChordString class  
 */

import { ChordString } from "../js/ChordString.js";


const testCases = [
  'A B C',
  'AbACD#',
  '-*- Gaug7 - Fmaj7/D - Em7b5add9 -*-',
  'string with no chords',

  `rolling stones - jigsaw puzzle

intro/verse:   B - A - F# - E

chorus:   E - F# - A - B - B
          A - A - B - B`,
]

const parsed = testCases.map(s => ChordString.parse(s))


// Check cs.base of parsed cases
describe('cs.base', () => {
  const expected = [
    '  ',
    '',
    '-*- aug7 - maj7/ - m7b5add9 -*-',
    'string with no chords',
  
    `rolling stones - jigsaw puzzle

intro/verse:    -  -  - 

chorus:    -  -  -  - 
           -  -  - `,
  ]

  test.each(prep(expected))(
    'cs.base', (input, exp) => {
      expect(input.base).toBe(exp)
    }
  )
})

// Check cs.chords of parsed cases
describe('cs.chords', () => {
  const expected = [
    [[0,'A'], [1,'B'], [2,'C']],
    [[0,'Ab'], [0,'A'], [0,'C'], [0,'D#']],
    [[4,'G'], [11,'F'], [16,'D'], [19,'E']],
    [],
    [
      [47,'B'], [50,'A'], [53,'F#'], [56,'E'],
      [68,'E'], [71,'F#'], [74,'A'], [77,'B'], [80,'B'],
      [91,'A'], [94,'A'], [97,'B'], [100,'B']
    ]
  ]

  test.each(prep(expected))(
    'cs.chords', (input, exp) => {
      expect(input.chords.map(e => [e[0], e[1].toString()])).toStrictEqual(exp)
    }
  )
})

// when you parse and toString(), should get back to start
describe('cs.toString()', () => {
  test.each(prep(testCases))(
    'cs.toString()', (input, exp) => {
      expect(input.toString()).toBe(exp)
    }
  )
})

// Test cs.totSharpness()
describe('cs.totSharpness()', () => {
  const expected = [0, 0, 0, 0, 2]

  test.each(prep(expected))(
    'cs.totSharpness()', (input, exp) => {
      expect(input.totSharpness()).toBe(exp)
    }
  )
})

// Test ChordString.transpose()
describe('ChordString.transpose()', () => {
  const shiftBy = [-1, 1, 6]

  const expected = [
    ['G# A# B', 'Bb C Db', 'Eb F Gb'],
    ['GG#BC##', 'AA#C#D##', /*'BbbBbDbE',*/ 'DD#F#G##'/*, 'EbbEbGbA'*/],
    [
      '-*- F#aug7 - Emaj7/C# - D#m7b5add9 -*-',
      '-*- Abaug7 - Gbmaj7/Eb - Fm7b5add9 -*-',
      '-*- C#aug7 - Bmaj7/G# - A#m7b5add9 -*-',
    ],
    ['string with no chords', 'string with no chords', 'string with no chords'],
    [
      `rolling stones - jigsaw puzzle

intro/verse:   Bb - Ab - F - Eb

chorus:   Eb - F - Ab - Bb - Bb
          Ab - Ab - Bb - Bb`,

      `rolling stones - jigsaw puzzle

intro/verse:   C - Bb - G - F

chorus:   F - G - Bb - C - C
          Bb - Bb - C - C`,

      `rolling stones - jigsaw puzzle

intro/verse:   F - Eb - C - Bb

chorus:   Bb - C - Eb - F - F
          Eb - Eb - F - F`
    ]
  ]


  test.each(prepin(shiftBy, expected))(
    'ChordString.transpose(cs,%d)', (shift, parsed, exp) => {
      expect(ChordString.transpose(parsed, shift).toString()).toBe(exp)
    }
  )
})


// Helper functions to wrap up inputs & outputs
function prep(outputs) {
  return parsed.map((s, i) => [s, outputs[i]])
}

function prepin(inputs, outputs) {
  let res = []

  for (let i = 0; i < parsed.length; i++) {
    for (let j = 0; j < inputs.length; j++) {
      //         input,    CS object,    expected
      res.push([inputs[j], parsed[i], outputs[i][j]])
    }
  }

  return res
}