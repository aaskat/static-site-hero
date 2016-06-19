'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');

var insertText = (value) => {
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage("Cant't insert text because no document is open.")
        return;
    }
    let selection = editor.selection;
    let range = new vscode.Range(selection.start, selection.end);
    editor.edit((editBuilder) => {
        editBuilder.replace(range, value);
    });
}
let getImageTemplate = () => {
    return vscode.workspace.getConfiguration("staticSiteHero")["imagePathTemplate"];
}
let getFileTemplate = () => {
    return vscode.workspace.getConfiguration("staticSiteHero")["filePathTemplate"];

}
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "static-site-hero" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json

    let fileLinkDisposable = vscode.commands.registerCommand('extension.insertLink', () => {
        vscode.window.showInformationMessage('Insert File Link Initiated');
        let linkTypeList = ['File', 'Image'];

        vscode.window.showQuickPick(linkTypeList, {
            placeHolder: 'Link Type'
        }).then(
            result => {
                //insertText(result);
                if (result === 'File') {
                    insertText(getFileTemplate())
                } else if (result === 'Image') {
                    insertText(getImageTemplate())
                }
            });
    });

    context.subscriptions.push(fileLinkDisposable);

    let figureDisposable = vscode.commands.registerCommand('extension.insertFigure', () => {
        vscode.window.showInformationMessage('Insert Figure Tag Initiated');
    });

    context.subscriptions.push(figureDisposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;