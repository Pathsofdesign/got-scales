import test from 'tape';
import gotScales from '../src/gotScales.js';

test('Should return single note with different note variations passed', function (t) {
    t.plan(4);

    var note = gotScales.note('C');
    t.deepEqual(note.get(), 'C');

    // Make sure we can just pass in part of the sharp / flat combo and still return the note
    var note = gotScales.note('Db');
    t.equal(note.get(), 'C# / Db');

    // Make sure we can pass in the whole shebang
    var note = gotScales.note('C# / Db');
    t.equal(note.get(), 'C# / Db');

    // Test out errors
    try {
        var note = gotScales.note('C# / Dbb');
    } catch(err) {
        t.deepEqual(err, new Error('Error: Note does not exist.'));
    }
});

test('Should create scale with the provided root note and pattern', function (t) {
    t.plan(2);

    var note = gotScales.note('C');
    t.deepEqual(note.scale('major').getNotes(), ['C','D','E','F','G','A','B','C']);

    var note = gotScales.note('G');
    t.deepEqual(note.scale('major').getNotes(), ['G', 'A', 'B', 'C', 'D', 'E', 'F# / Gb', 'G']);
});

test('Should create minor scale', function (t) {
    t.plan(1);

    var note = gotScales.note("A");
    t.deepEqual(note.scale('minor').getNotes(), ['A','B','C','D','E','F','G','A']);
});

test('Should create scale from a pattern array not in the default scales', function (t) {
    t.plan(1);

    var note = gotScales.note("C");
    t.deepEqual(note.scale([0, 4, 7, 15], true).getNotes(), ['C', 'E', 'G', 'C']);
});

test('Should create different chords', function (t) {
    t.plan(5);

    var chord = gotScales.chord("C#Maj");
    t.deepEqual(chord.getNotes(), ['C# / Db', 'F', 'G# / Ab']);

    var chord = gotScales.chord("DbMaj");
    t.deepEqual(chord.getNotes(), ['C# / Db', 'F', 'G# / Ab']);

    var chord = gotScales.chord("CMaj7");
    t.deepEqual(chord.getNotes(), ['C', 'E', 'G', 'B']);

    var chord = gotScales.chord("Am");
    t.deepEqual(chord.getNotes(), ['A', 'C', 'E']);

    // Test out errors
    try {
        var chord = gotScales.chord("C#zilla");
    } catch(err) {
        t.deepEqual(err, new Error('Error: Chord does not exist.'));
    }
});
