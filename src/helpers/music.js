export const chromaticScale = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

export function combineNoteOctave(note, octave) {
  return `${note}${octave}`
}

export function splitNoteOctave(input) {
  const match = input.match(/^([A-Ga-g](?:#|b)?)(\d)$/)
  const note = match[1].toUpperCase()
  const octave = +match[2]

  return [note, octave]
}

console.log(splitNoteOctave('E5'))

export function getNoteSet(high, low, scale = chromaticScale) {
  const [ highNote, highOct ] = splitNoteOctave(high)
  const [ lowNote, lowOct ] = splitNoteOctave(low)
  let currNote = lowNote
  let currOct = lowOct
  let scaleIndex = scale.indexOf(lowNote)
  const set = new Set()

  while (true) {
    set.add(combineNoteOctave(currNote, currOct))
    scaleIndex += 1
    if (scaleIndex === scale.length) {
      scaleIndex = 0
      currOct += 1
    }

    currNote = scale[scaleIndex]

    if (currNote === highNote && currOct === highOct) {
      break
    }
  }

  set.add(`${highNote}${highOct}`)
  return Array.from(set)
}

export function getNoteAtSemiOffset(note, offset, scale = chromaticScale) {
  let [ startNote, startOct ] = splitNoteOctave(note)
  let scaleIndex = scale.indexOf(startNote)

  for (let i = 0; i < offset; i++) {
    scaleIndex++
    if (scaleIndex === scale.length) {
      startOct++
      scaleIndex = 0
    }
  }

  return combineNoteOctave(scale[scaleIndex], startOct)
}

console.log(getNoteAtSemiOffset('B3', 3)) // D4