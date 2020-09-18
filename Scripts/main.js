//
// NovaJsMin Extension for Nova
// main.js
//
// Copyright © 2020 Vine Code Limited. All rights reserved.
//

const JsMinService = require('./NovaJsMinService');

exports.activate = function() {
	const JsMin = new JsMinService();

	// "Compile on Save"
	nova.workspace.onDidAddTextEditor(editor => {
		return editor.onWillSave(JsMin.minifyJsFileOnSave.bind(JsMin));
	});
	
	// Minify on Command
	nova.commands.register('JsMin.minifyFile', JsMin.minifyJsFileOnCommand.bind(JsMin));
	
	// Beautify on Command
	nova.commands.register('JsMin.beautifyFile', JsMin.beautifyJsFileOnCommand.bind(JsMin));	
};
