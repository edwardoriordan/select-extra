// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let disposable = vscode.commands.registerCommand('select-extra.extendSelectionDown', () => {[]
		const editor = vscode.window.activeTextEditor;

		if (editor) {
			const currentPosition = editor.selection.active;

			const currentLine = currentPosition.line;
			const nextLine = currentLine + 1;

			const currentLineRange = editor.document.lineAt(currentLine).range;
			const nextLineRange = editor.document.lineAt(nextLine).range;

			if (editor.selection.isEmpty) {
			editor.selection = new vscode.Selection(
				currentLineRange.start,
				currentLineRange.end
			);
			}
			// If going down from a selection above
			else if(currentLine !== editor.selection.end.line) {
			editor.selection = new vscode.Selection(
				editor.selection.end,
				nextLineRange.start
			);
			} else {
			editor.selection = new vscode.Selection(
				editor.selection.start,
				nextLineRange.end
			);
		}

		}
	});
	context.subscriptions.push(disposable);

	let disposable2 = vscode.commands.registerCommand('select-extra.extendSelectionUp', () => {
		const editor = vscode.window.activeTextEditor;

		if (editor) {
			const currentPosition = editor.selection.active;

			const currentLine = currentPosition.line;
			const nextLine = currentLine - 1;

			const currentLineRange = editor.document.lineAt(currentLine).range;
			const nextLineRange = editor.document.lineAt(nextLine).range;

			if (editor.selection.isEmpty) {
			editor.selection = new vscode.Selection(
				currentLineRange.end,
				currentLineRange.start
			);
			}
			// If going up from a selection below but on one line
			else if(editor.selection.start.line === editor.selection.end.line){
			editor.selection = new vscode.Selection(
				editor.selection.end,
				nextLineRange.start,
			);
			}
			// If going up from a selection below
			else if(currentLine === editor.selection.end.line) {
			editor.selection = new vscode.Selection(
				editor.selection.start,
				nextLineRange.end,
			);
			} else {
			editor.selection = new vscode.Selection(
				editor.selection.end,
				nextLineRange.start,
			);
			}
		}
	});
	context.subscriptions.push(disposable2);

	let disposable3 = vscode.commands.registerTextEditorCommand('select-extra.swapActiveAnchor', editor => {
		editor.selections = editor.selections.map( s => new vscode.Selection(s.active, s.anchor));
	});
	context.subscriptions.push(disposable3);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
