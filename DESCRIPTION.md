# An in-depth description of `chord-transposer`

`chord-transposer` is a webpage which allows the user to transpose a given sequence of chords and/or notes into a different key. The actual logic is written entirely in JavaScript, while the webpage is (of course) written in HTML, CSS and JS. There is no persistent data, and hence all the code can be run client-side in the browser.


## The inner workings

The important files and folders are:

| **File/folder** | **Description**                    |
|-----------------|------------------------------------|
| `/index.html`   | the main webpage                   |
| `/css/`         | stylesheets for the main webpage   |
| `/js/`          | contains the program logic         |
| `/test/`        | Jest tests for the files in `/js/` |

I will focus mainly on the contents of the `/js/` folder. There are two main object types used:
- `Note`, representing a musical note. The fields are:
  - a capital letter between A and G, along with
  - an integer called the `sharpness`, representing the number of sharps (positive) or flats (negative).
- `ChordString`, which consists of
  - A string `base` of ambient formatting data
  - A sequence of chords with associated locations in `base`

I have tried to ensure that `Note` and `ChordString` are immutable objects, so any methods which modify a `ChordString` or `Note` object (e.g. `transpose`, `enharmonicUp`) are implemented as static methods of the relevant class.

When a sequence of chords/notes is entered by the user, that string is then passed to the ChordString parser (`ChordString.parse`). The parser essentially alternates between two states. In the first state, it looks for a capital letter from A to G. Once this is found, it goes to the second state, where it looks for `#` and `b` symbols directly after the letter. When the next character is not a `#` or `b`, it logs the corresponding note and goes back to the first state. All non-note characters are added to `base`.

Essentially, we ignore anything that is not a capital letter between A and G followed by zero or more `#` or `b` symbols. As a result, we can correctly deal with:
- modified chords (add2, m7, aug, etc)
- slash chords (e.g. Fm/C)
- punctuation symbols and formatting
- titles, lyrics, and annotations, *as long as these are written in all lowercase* (capital letters might be interpreted as notes).

The advantage of this split representation is that we can now easily transpose the ChordString, since we don't need to do anything with `base` - we just transpose each chords by the appropriate amount, using the `Note.transpose` method. Once we've done this, we can turn the ChordString back into a raw string, just by iterating through `base` and putting the chords in the appropriate place.

The `Main.js` file is essentially a wrapper for the `ChordString.transpose` function. `Main.js` defines a single method `transpose(string, amount)` which takes in an input string, parses it to a `ChordString`, transposes it, and returns the resulting string. This is the interface which the webpage deals directly with.


## Enharmonics

A special feature of `chord-transposer` is that it respects the rules of music theory by choosing the correct *enharmonic* for a given note.

Here's a quick explanation. Each note can be given multiple names: for example, C# and Db are two names for the note between C and D. These different names are *enharmonics* of each other. The rules of music theory determine which name we should use, in such a way that every note in a key uses a different letter. For example, we'd use Db in the key of F minor, and use C# in the key of A major.

Most online chord transposers completely ignore this, simply representing the 12 notes as numbers 0-11 and transposing with modular arithmetic. While this approach is certainly much simpler, it is incorrect, and bound to annoy a trained musician. For example, if you go to [this tab](https://tabs.ultimate-guitar.com/tab/passenger/let-her-go-chords-1196760) on Ultimate Guitar (which is in Em) and transpose it up one (to Fm), you'll see C#'s which should be Db's instead.

To take this extra enharmonic information into account, we need a different representation of a `Note` (i.e. not integers mod 12). This is why I chose to represent a `Note` as a letter followed by a number of flats and sharps. To preserve the correct enharmonic when transposing, *we always shift the letter by the same amount*, and change the number of sharps and flats to get the right pitch.

More concretely, to transpose by `n` semitones, we shift the letter by `Math.round(n * 7/12)` positions. Then, we look up the letter in an array called `SHARP_SHIFT`, which tells us how much to shift the sharpness by. This is how the `Note.transpose` method works.

We *do* get a choice when choosing between the different enharmonics for the *key*. For example, a song in F#m could also be rendered in Gbm by moving every note to the next enharmonic. Generally, one of these choices is going to be better. For example the sequence

    F#m D A E

in F#m is much nicer than the equivalent

    Gbm Ebb Bbb Fb

in Gbm, which is a horrible mess of double flats.


After transposing a chord sequence, `chord-transposer` automatically picks the best enharmonic for it. The "best" enharmonic is the one whose total sharpness is closest to zero, the *total sharpness* being the sum of `sharpness` over all notes in the sequence.

Intuitively, we try to find the one with as few `#` and `b` symbols as possible. Continuing with the example above, the total sharpness of `F#m D A E` is +1, while for `Gbm Ebb Bbb Fb` it is -6. Therefore, `chord-transposer` would choose the former.
