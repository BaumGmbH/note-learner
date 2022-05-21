const notes = ["c", "d", "e", "f", "g", "a", "h"];

class Note {
    constructor(height) {
        this.height = height;
    }

    draw() {
        fill(noteColor);
        strokeWeight(5);
        ellipse(
            width / 2,
            height / 2 -
                offsetSlider.value() +
                (-this.height / 2 + 6) * spacingSlider.value(),
            noteSlider.value() * 2,
            noteSlider.value()
        );
    }

    getNoteName() {
        return keySelect.value() == "Violine"
            ? notes[this.height % 7]
            : notes[(this.height + 2) % 7];
    }
}
