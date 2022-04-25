const fetch = require('node-fetch');
//const got = require('got').default;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');




async function onPositionChange (changeEvent) {
  const myUrl = 'http://127.0.0.1:7321';
	  
  const myData = {
	  file: changeEvent.textEditor.document.fileName,
	  line: changeEvent.selections[0].end.line,
	  char: changeEvent.selections[0].end.character
	};

  const response = await fetch(myUrl, {
    method: 'POST',
    body: JSON.stringify(myData),
  }).then((response) => response.json());

  console.log(response);
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

async function onPositionChange2(changeEvent) {
	let editor = changeEvent.textEditor;
		  
		  
		  console.log('onDidChangeTextEditorSelection fired', changeEvent.textEditor.document.fileName, changeEvent.selections[0].end.line, changeEvent.selections[0].end.character);
		  //vscode.commands.executeCommand('setContext', 'extraContext:editorSelectionStartLine', String(editor.selection.start.line+1));
		  //vscode.commands.executeCommand('setContext', 'extraContext:editorSelectionEndLine', String(editor.selection.end.line+1));
		  //vscode.commands.executeCommand('setContext', 'extraContext:editorSelectionHasMultipleLines', editor.selection.start.line !== editor.selection.end.line);
		  const {data} = await got.post('http:/127.0.0.1:7321', {
			json: {
				hello: 'world'
			}
		}).json();
		
		console.log(data);
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	

	vscode.window.onDidChangeTextEditorSelection(
		onPositionChange,
		null, context.subscriptions);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
