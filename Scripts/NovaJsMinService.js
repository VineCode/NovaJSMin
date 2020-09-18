//
// JsMin Extension for Nova
//
// Copyright © 2020 Vine Code Limited. All rights reserved.
//

class JsMinService {
  
	constructor() {

	}

  get getArgs() {
    
    var mangle  = nova.config.get('VineCode.JsMin.mangle');
    var sourceMap = nova.config.get('VineCode.JsMin.sourceMap'); 
    var execPath  = nova.config.get('VineCode.JsMin.execPath');       
    
    if(!execPath) {
      execPath = 'uglifyjs';
    }            
    
    execPath = execPath.replace(/(\s+)/g, '\\$1');
    
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

    // Check this this is a javascript file and not already minimised
    if(source.substr(-2) != 'js' || source.substr(-6) == 'min.js') { return } 

    var target = source.replace('.js', '.min.js');
        
    var args = this.getArgs;
        args.push("--output");
        args.push(target);
        args.push("--");
        args.push(source);        
 
    var options = { args: args };

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

       if(stdErr.length > 0) {     
         
        if(nova._notificationTimer) {
           clearTimeout(nova._notificationTimer);
         }                
             
         var message = stdErr.splice(0, 2).join("\n");
    
         let request = new NotificationRequest("js-error");      
         request.title = nova.localize("Javascript Compile Error");
         request.body = nova.localize(message);  
         request.actions = [nova.localize("Dismiss")];        
         let promise = nova.notifications.add(request);
         
        // hide the notification after 5 seconds
         nova._notificationTimer = setTimeout(function() { 
           nova.notifications.cancel("js-error");         
         }, 10000);         
         
       }  else {
         // Hide any notifications of the previous error
         nova.notifications.cancel("js-error");          
       }

       

     });
 
     process.start();    
  }  
  
  /*
  Minify the current file
  */  
  
  minifyJsFileOnSave(editor) {
    var source   = editor.document.path;
    
    // If Auto Minify on save is enabled just return    
    var minifyOnSave  = nova.config.get('VineCode.JsMin.minifyOnSave');    
    if(minifyOnSave == 'No') {
      return;   
    }    
    
    if(source.substr(-2) != 'js' || source.substr(-6) == 'min.js') { return }    

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
    
    var minifyOnSave  = nova.config.get('VineCode.JsMin.minifyOnSave');    
    
    // If Auto Minify on save is enabled just return
    if(minifyOnSave == 'No') {
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
    
    var execPath  = nova.config.get('VineCode.JsMin.execPath');       
    
    if(!execPath) {
      execPath = 'uglifyjs';
    }       
    
    var args = new Array;
        args.push(execPath);
        args.push("--beautify");
        args.push("--comments");                
        args.push("all");                
        args.push("--output");
        args.push(source);
        args.push("--");
        args.push(source);   
        
    console.log(args.join(" "));  
    
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
        
        if(nova._notificationTimer) {
          clearTimeout(nova._notificationTimer);
        }           
              
        var message = stdErr.splice(0, 2).join("\n");
   
        let request = new NotificationRequest("invalid-file");      
        request.title = nova.localize(" Compile Error");
        request.body = nova.localize(message);  
        request.actions = [nova.localize("Dismiss")];        
        let promise = nova.notifications.add(request);
        
        // hide the notification after 5 seconds
        nova._notificationTimer = setTimeout(function() { 
          nova.notifications.cancel("sass-error");         
        }, 10000);

      } else {
        // Hide any notifications of the previous error
        nova.notifications.cancel("sass-error");          
      }

    });

    process.start();              

      console.log("DO: beautifyJsFile");

  } 
  
}

module.exports = JsMinService;
