//
// JsMin Extension for Nova
//
// Copyright © 2020 Vine Code Limited. All rights reserved.
//

class NovaJsMinService {
  
	constructor() {

	}

  get getArgs() {
    
    var mangle  = nova.config.get('VineCode.NovaJsMin.mangle');
    var sourceMap = nova.config.get('VineCode.NovaJsMin.sourceMap'); 
    var execPath  = nova.config.get('VineCode.NovaJsMin.execPath');       
    
    if(!execPath) {
      execPath = 'uglifyjs';
    }            
    var options = [];
    
    options.push(execPath);
    
    options.push('--compress');
 
    if(mangle == 'Yes') {
      options.push('-m');
    }
 
    if(sourceMap == 'Yes') {
      options.push('--source-map');
    }

    return options;
  }
  
  /*
  
  */  
  
  minifyJsFile(source) {
    
    console.log("DO MINIFY FILE: " + source);
    
    // Check this this is a javascript file and not already minimised
    if(source.substr(-2) != 'js' || source.substr(-6) == 'min.js') { return } 

    var target = source.replace('.js', '.min.js');
        
    var args = this.getArgs;
        args.push("--output");
        args.push(target);
        args.push("--");
        args.push(source);        
 
    //args = new Array('uglifyjs "' + source + '"');
    var options = { args: args };
     
     console.log(args.join(' '));
 
     var process = new Process("/usr/bin/env", options);
     
     var stdOut = new Array;
     process.onStdout(function(line) {
       stdOut.push(line.trim());
     });
     
     var stdErr = new Array;
     process.onStderr(function(line) {
       stdErr.push(line.trim());
     });
 
     process.onDidExit(function() {
       
       console.log('stdOut: ' + stdOut.join("\n"));
       console.log('stdErr: ' + stdErr.join("\n"));       
       
       if(stdErr.length > 0) {         
         var message = stdErr.splice(0, 2).join("\n");
    
         let request = new NotificationRequest("invalid-file");      
         request.title = nova.localize("Sass Compile Error");
         request.body = nova.localize(message);  
         request.actions = [nova.localize("Dismiss")];        
         let promise = nova.notifications.add(request);
       } 

       

     });
 
     process.start();    
  }  
  
  /*
  Minify the current file
  */  
  
  minifyJsFileOnSave(editor) {
    var source   = editor.document.path;
    
    if(source.substr(-2) != 'js' || source.substr(-6) == 'min.js') { return }    
    
    console.log("minifyJsFileOnSave"); 

    this.minifyJsFile(source);
      
    return;
  }  

  /*
  Minify the current file
  */  
  
  // changed

  minifyJsFileOnCommand(editor) {
    var source   = editor.document.path;
    
    if(source.substr(-2) != 'js' || source.substr(-6) == 'min.js') { return } 

    console.log("minifyJsFileOnCommand");        
    
    // Save any unsaved changes
    if(editor.document.isDirty) {
      console.log("Saving Changes");   
      editor.save();
      return;
    }    
    
    var minifyOnSave  = nova.config.get('VineCode.NovaJsMin.minifyOnSave');    
    
    // If Auto Minify on save is enabled just return
    if(minifyOnSave == 'On') {
      return;   
    }

    // Otherwise Trigger it here 
    this.minifyJsFile(source);
    
    return;
  }
  
  /*
  Beautify the current file
  */  

  beautifyJsFileOnCommand(editor) { 
    
    var source   = editor.document.path;
    
    if(source.slice((source.lastIndexOf(".") - 1 >>> 0) + 2) != 'js') { return }    
    
    
        
    console.log("beautifyJsFile");
    
    // Save any unsaved changes
    if(editor.document.isDirty) {
      console.log("Saving Changes");  
      // Can we stop this from triggering
      // the minify ? 
      editor.save();
    }
    
      console.log("DO: beautifyJsFile");

  } 
  
}

module.exports = NovaJsMinService;
