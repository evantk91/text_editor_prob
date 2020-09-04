module.exports = {
  insertText,
  deleteText,
  executeCommand,  
  textEditor  
}  

/* 
The problem is we want to create a function that takes in a list of commands (INSERT, DELETE, COPY, PASTE AND UNDO)
along with corresponding string if applicable and returns the resulting text. For example:

commands =
[ ['INSERT', 'cat'],
  ['INSERT', 'dog'],
  ['DELETE'],
  ['COPY'],
  ['PASTE'],
  ['UNDO'] ]

textEditor(commands) => 'catdo'

The insert commnad adds the string to the end of the text, delete removes the last character to the text, copy copies the
current text to a clipboard, paste adds the current text in the clipboard to the end of the string, and undo reverses the
previous command that is not copy.
*/

function insertText(currentText, newText) {
   return currentText + newText 
}

function deleteText(currentText) {
   return currentText.slice(0, currentText.length - 1) 
}

function executeCommand(commandArray, currentText, clipboard, history) {
   let command = commandArray[0];
   let newText = "";
     
   switch(command) {
      case 'INSERT':
        newText = insertText(currentText, commandArray[1]);
        history.push(newText);
        return [newText, clipboard, history];
      case 'DELETE':
        newText = deleteText(currentText, commandArray[1]);
        history.push(newText);  
        return [newText, clipboard, history];
      case 'COPY':
        clipboard = currentText;
        return [currentText, clipboard, history];
      case 'PASTE':
        newText = currentText + clipboard;
        history.push(newText);             
        return [currentText + clipboard, clipboard, history];
      case 'UNDO':
        history.pop();

        if (history.length !== 0) {
            newText = history[history.length - 1]
        };

        return [newText, clipboard, history];
      default:
          console.log('NO COMMAND FOUND');
          return currentText; 
   }
}

function textEditor(commands) {
   let text = "";
   let clipboard = "";
   let history = [];

   commands.map(command => {
      [text, clipboard, history] = executeCommand(command, text, clipboard, history)
   })

   return [text, history]
} 