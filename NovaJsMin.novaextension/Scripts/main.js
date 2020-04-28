//
// NovaJsMin Extension for Nova
// main.js
//
// Copyright © 2020 Vine Code Limited. All rights reserved.
//

const NovaJsMinService = require('./NovaJsMinService');

exports.activate = function() {
	const novaJsMin = new NovaJsMinService();

	// "Compile on Save"
	nova.workspace.onDidAddTextEditor(editor => {
		return editor.onWillSave(novaJsMin.minifyJsFileOnSave.bind(novaJsMin));
	});
	
	// Minify on Command
	nova.commands.register('NovaJsMin.minifyFile', novaJsMin.minifyJsFileOnCommand.bind(novaJsMin));
	
	// Beautify on Command
	nova.commands.register('NovaJsMin.beautifyFile', novaJsMin.beautifyJsFileOnCommand.bind(novaJsMin));	
};
