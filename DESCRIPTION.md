# An in-depth description of `chord-transposer`

`chord-transposer` is a webpage which allows the user to transpose a given sequence of chords and/or notes into a different key. The actual logic is written entirely in JavaScript, while the webpage is (of course) written in HTML, CSS and JS.

Unlike many other online transposers, `chord-transposer` correctly handles *enharmonics* when transposing. A bit of music theory is required to understand what this means, so I have relegated this to the end of this document. First, we will talk about how the program logic works.


## The inner workings

The important files and folders are:

|             | |
-             |-
`/index.html` | the main webpage
`/css/`       | stylesheets for the main webpage
`/js/`        | contains the program logic
`/test/`      | Jest tests for the files in `/js/`

I will focus mainly on the contents of the `/js/` folder. There are two main object types used:
- `Note`, representing a musical note. The fields are:
  - a capital letter between A and G, along with
  - an integer representing the number of sharps (positive) or flats (negative).
- `ChordString`, which consists of
  - A string `base` of ambient formatting data
  - A sequence of chords with associated locations in `base`

I have tried to ensure that `Note` and `ChordString` are immutable objects, so any methods which modify a `ChordString` or `Note` object (e.g. `transpose`, `enharmonicUp`) are implemented as static methods of the relevant class.

When a sequence of chords/notes is entered by the user, that string is then passed to the ChordString parser (`ChordString.parse`). The parser essentially alternates between two states. In the first state, it looks for a capital letter from A to G. Once this is found, it goes to the second state, where it looks for `#` and `b` symbols directly after the letter. When the next character is not a `#` or `b`, it logs the corresponding note and goes back to the first state. All non-note characters are added to `base`.

The advantage of this split representation is that we can now easily transpose the ChordString, since we don't need to do anything with `base` - we just transpose each chords by the appropriate amount, using the `Note.transpose` method. Once we've done this, we can turn the ChordString back into a raw string, just by iterating through `base` and putting the chords in the appropriate place.

The `Main.js` file is essentially a wrapper for the `ChordString.transpose` function. `Main.js` defines a single method `transpose(string, amount)` which takes in an input string, parses it to a `ChordString`, transposes it, and returns the resulting string. This is the interface which the webpage deals directly with.

<p style="color: red">(It can deal with modified chords (e.g. m7, add2), slash chords, and formatting data such as titles, colons, dashes, brackets, etc. Note: you can write annotations such as "verse:", "chorus:", song titles and lyrics, but it is suggested you write these all in lowercase, so they are not confused for chords.)</p>


<p style="color: red">(finding best enharmonic)
One more nice feature is that it automatically finds the best enharmonic {...}
For example, if we have a song in Am, and we want to transpose it down by one, we could put it in either G#m or Abm. Generally, G#m is going to be the better choice, as Abm would end up having many more accidentals. However, if the song was in A *major*, then again we could choose G# or Ab, and generally Ab would be the better choice.</p>

<p style="color: red">In general, there is no foolproof way to tell. `chord-transposer` includes a method which can find enharmonics, e.g. change G#m to Abm. (find one with least totAcc)</p>


## Enharmonics

A special feature of chord-transposer is that it respects the rules of music theory by choosing the correct enharmonic for a given note. I'll explain what that means for those unfamiliar with music theory.

You may know that traditional Western music uses 12 notes. We have the "natural" notes A, B, C, D, E, F, G, which correspond to white keys on a piano. Between some of those, we have "altered" notes, corresponding to black keys on a piano. The altered notes are named in reference to the natural notes, by appending the symbols # (sharp, meaning directly above) and b (flat, meaning directly below). As each altered note falls between two natural notes, we have two possible ways to name it. For example, the note between C and D could be called either C# or Db. The whole setup looks kind of like this:

       Db     Eb        Gb     Ab     Bb
    C      D      E  F      G      A      B  C
       C#     D#        F#     G#     A#

<p style="color: red">(talk about keys and scales)</p>
<p style="color: red">A note name encodes not only the pitch, but also the *function* of a note within a key. For example, in the key of C major, D# (in B major chord) vs Eb (in C minor)</p>

<p style="color: red">Anyway, most transposers online completely ignore the above, and just map pitches to notes
(...)
This does significantly simplify the problem (....)
</p>

