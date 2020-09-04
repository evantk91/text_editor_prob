const assert = require('assert');
const { insertText, deleteText, executeCommand, textEditor } = require('../index');

describe("tests the operation of the input command", () => {
  it("returns correct text when there is no current text", () => {
    const currentText = "";
    const newText = "cat";
    const output = "cat";
    const result = insertText(currentText, newText);
    assert.equal(output, result);
  })

  it("returns correct text when there is no current text", () => {
    const currentText = "cat";
    const newText = "dog";
    const output = "catdog";
    const result = insertText(currentText, newText);
    assert.equal(output, result);
  })

  it("executes input command when command is passed in", () => {
    const currentText = "cat";
    const commandArray = ["INSERT", "dog"];
    const resultText = "catdog";
    const clipboard = "bird";
    const currentHistory = ["cat", "catdog"];
    const output = [resultText, clipboard, currentHistory];
    const history = ["cat"]
    const result = executeCommand(commandArray, currentText, clipboard, history)
    assert.deepEqual(output, result)
  })
})

describe("tests the operation of the delete command", () => {
  it("returns empty string when there is no current text", () => {
    const currentText = "";
    const output = "";
    const result = deleteText(currentText);
    assert.equal(output, result);
  })

  it("returns correct text removing last character", () => {
    const currentText = "catdog";
    const output = "catdo";
    const result = deleteText(currentText);
    assert.equal(output, result);
  })

  it("executes delete command when command is passed in", () => {
    const currentText = "catdog";
    const commandArray = ["DELETE", "catdog"];
    const clipboard = "bird";
    const resultText = "catdo";
    const currentHistory = ["catdog", "catdo"];
    const output = [resultText, clipboard, currentHistory ];
    const history = ["catdog"]
    const result = executeCommand(commandArray, currentText, clipboard, history)
    assert.deepEqual(output, result)
  })
})

describe("tests the operation of the copy command", () => {
  it("returns correct text and updated clipboard", () => {
    const currentText = "catdog";
    const commandArray = ["COPY"];
    const clipboard = currentText;
    const resultText = "catdog";
    const currentHistory = ["catdog"];
    const output = [resultText, clipboard, currentHistory];
    const history = ["catdog"];
    const result = executeCommand(commandArray, currentText, clipboard, history);
    assert.deepEqual(output, result)
  })
})

describe("tests the operation of the paste command", () => {
  it("returns correct text and  clipboard", () => {
      const currentText = "cat";
      const commandArray = ["PASTE"];
      const resultText = "catbird";
      const clipboard = "bird";
      const currentHistory = ["cat", "catbird"];
      const output = [resultText, clipboard, currentHistory];
      const history = ["cat"]
      const result = executeCommand(commandArray, currentText, clipboard, history)
      assert.deepEqual(output, result)
  })
})

describe("tests the operation of the text editor", () => {
    it("returns correct history for the list of inserts and deletes", () => {
        const commands = 
           [ ["INSERT", "cat"],
             ["INSERT", "dog"], 
             ["DELETE"] ]
        const text = "catdo";
        const history = ["cat", "catdog", "catdo"];
        const output = [ text, history ];
        const result = textEditor(commands);
        assert.deepEqual(output, result)
    })

    it("returns correct history for the list of copies and pastes", () => {
        const commands = 
           [ ["INSERT", "cat"],
             ["COPY"], 
             ["DELETE"],
             ["PASTE"] ]
        const text = "cacat";
        const history = ["cat", "ca", "cacat"];
        const output = [ text, history ];
        const result = textEditor(commands);
        assert.deepEqual(output, result)
    })

    it("when the undo command is called, the previous command is reversed", () => {
        const commands = 
           [ ["INSERT", "cat"],
             ["COPY"], 
             ["DELETE"],
             ["PASTE"],
             ["UNDO"] ]
        const text = "ca";
        const history = ["cat", "ca"];
        const output = [ text, history ];
        const result = textEditor(commands);
        assert.deepEqual(output, result)
    })

    it("when undo is called after copy, the command before copy is reversed", () => {
        const commands = 
           [ ["INSERT", "cat"], 
             ["COPY"],
             ["UNDO"] ]
        const text = "";
        const history = [];
        const output = [ text, history ];
        const result = textEditor(commands);
        assert.deepEqual(output, result)
    })

    it("when undo is called twice, the previous two commands are reversed", () => {
        const commands = 
           [ ["INSERT", "cat"],
             ["DELETE"], 
             ["COPY"],
             ["UNDO"],
             ["UNDO"] ]
        const text = "";
        const history = [];
        const output = [ text, history ];
        const result = textEditor(commands);
        assert.deepEqual(output, result)
    })
})

