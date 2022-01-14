const Note = require('../note.js').Note;

describe('User unit tests', () => {
    let sampleNote = {
        _id: "61dfd46d5914eb1879c786d6",
        name: "My Note",
        text: "My Text",
        __v: 0
    };

    beforeEach(() => {
        jest.restoreAllMocks();
    });

    it('Should return a single user', async () => {
        jest.spyOn(Note, 'find').mockResolvedValue(sampleNote);
        const result = await Note.find();

        expect(result).toBe(sampleNote);
    });

});