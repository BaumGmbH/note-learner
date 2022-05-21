const keys = {
    67: "c",
    68: "d",
    69: "e",
    70: "f",
    71: "g",
    65: "a",
    72: "h",
};

const noteRange = 12
const maxNoteRepeat = 0

const timed = false;
const milli = 240000;

let note;
let noteRepeat
let start = 0;

let stop = false;

let bg;
let switched = false

function setup() {
    createCanvas(displayWidth - 10, 400);

    keySelect = createSelect();
    keySelect.option("Violine");
    keySelect.option("Bass");

    keySelect.selected("Violine");

    offsetSlider = createSlider(0, 300, 160, 1);
    spacingSlider = createSlider(0, 100, 50, 1);
    noteSlider = createSlider(0, 100, spacingSlider.value(), 1);

    note = new Note(Math.floor(Math.random() * noteRange + 1));

    noteColor = color(220, 220, 220);

    noteCountText = createP();
    notesCorrectText = createP();
    scoreText = createP();
    timerText = createP();

    bg = color(255, 255, 255);
}

function draw() {
    background(bg);

    const offset = offsetSlider.value();
    const spacing = spacingSlider.value();

    strokeWeight(5);
    for (let i = 1; i <= 5; i++) {
        line(
            0,
            height / 2 - offset + i * spacing,
            width,
            height / 2 - offset + i * spacing
        );
    }

    if (note.height % 12 == 0) {
        strokeWeight(2);
        line(0, height / 2 - offset, width, height / 2 - offset);
        line(
            0,
            height / 2 - offset + 6 * spacing,
            width,
            height / 2 - offset + 6 * spacing
        );
    }

    if (!stop) {
        note.draw();
    }


    if (start != 0 && stop) {
        start = 0;

        noteCountText.html("Total Notes: " + noteCount);
        notesCorrectText.html("Notes Correct: " + notesCorrect);
        scoreText.html(
            "Score: " +
                ((notesCorrect / noteCount) * 100).toString().slice(0, 4)
        );
        timerText.html(
            "Time: " + new Date(millis() - start).toISOString().slice(14, -1)
        );
    }

    if (timed && start != 0) {
        if (millis() - start >= milli / 2 && !switched) {
            keySelect.selected("Bass");
    
            bg = color(0, 0, 255)
            setInterval(() => {
                bg = color(255, 255, 255)
            }, 100);

            console.log(millis() - start + ' >= ' + milli / 2)

            switched = true
        } else if (millis() - start >= milli) {
            bg = color(255, 0, 0)
            setInterval(() => {
                bg = color(255, 255, 255)
            }, 100);

            console.log(millis() - start + ' >= ' + milli)

            stop = true
        }
    }
}

let currentInterval;

function keyPressed() {
    key = keys[keyCode];

    console.log("Expected: " + note.getNoteName() + " | Got: " + key);

    if (key == undefined || stop) {
        return;
    }

    if (note.getNoteName() == key) {
        notesCorrect++;

        noteColor = color(50, 250, 50);
    } else {
        noteColor = color(50, 250, 50);
    }

    clearInterval(currentInterval);

    currentInterval = setInterval(() => {
        noteColor = color(220, 220, 220);
    }, 200);

    prevNote = note.height

    note = new Note(Math.floor(Math.random() * noteRange + 1));
    noteCount++;

    if (note.height == prevNote) {
        noteRepeat++;
    } else {
        noteRepeat = 0
    }

    if (noteRepeat > maxNoteRepeat) {
        while (note.height == prevNote) {
            prevNote = note.height
            note = new Note(Math.floor(Math.random() * noteRange + 1))
        }
    }

    if (noteCount == 1) {
        start = millis();
    } else if (noteCount >= 84 && !timed) {
        stop = true;
    }
}
