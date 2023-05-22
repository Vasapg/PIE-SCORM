

var nFindAPITries = 0
var objAPI = null
var bFinishDone = false

var initialized = true;
var finishCalled = false
var SCORM_FALSE = "false";

 function ScormProcessSetValue(element, value){
    var result;
    if (initialized == false || finishCalled == true){return;}
    
    result = objAPI.LMSSetValue(element, value);
    
    if (result == SCORM_FALSE){
		
        var errorNumber = objAPI.LMSGetLastError();
        var errorString = objAPI.LMSGetErrorString(errorNumber);
        var diagnostic = objAPI.LMSGetDiagnostic(errorNumber);
        
        var errorDescription = "Number: " + errorNumber + "\nDescription: " + errorString + "\nDiagnostic: " + diagnostic;
        
        alert("Error - Could not store a value in the LMS.\n\nYour results may not be recorded.\n\n" + errorDescription);
        return;
    } else{
		objAPI.LMSCommit()
	}
    console.log("Todo OK")
}
		




function FindAPI(window){
	while((window.API == null) && (window.parent != null) && (window.parent != window)){
		nFindAPITries++
		if (nFindAPITries>500){
			alert("API not found")
			document.write("Error: API not found")
			return null
		}
		window = window.parent
	}
	return window.API
}



function SCOInitialize(){
	if((window.parent) && (window.parent != window)){
		objAPI = FindAPI(window.parent)
	}
	if((objAPI == null) && (window.opener != null)){
		objAPI = FindAPI(window.opener)
	}
	if(!((typeof(objAPI) != "undefined") && (objAPI != null))){
		alert("Learning Management System interface not found.")
		document.write("Learning Management System interface not found.")
		return "false"
	}else{
		return objAPI.LMSInitialize("")
	}
}

function SCOFinish(){
	if(((typeof(objAPI) != "undefined") && (objAPI != null)) && (bFinishDone == false)){
		bFinishDone = (objAPI.LMSFinish("") == "true")
	}
	return(bFinishDone.toString())
}

function ScormProcessGetValue(element){
    var result;
    
    if (initialized == false || finishCalled == true){return;}
	
	if(objAPI == null){console.log("API VACIA");return;}
	console.log(objAPI)

	result = objAPI.LMSGetValue(element);
	
    
    if (result == ""){
    
        var errorNumber = objAPI.LMSGetLastError();
        
        if (errorNumber != SCORM_NO_ERROR){
            var errorString = objAPI.LMSGetErrorString(errorNumber);
            var diagnostic = objAPI.LMSGetDiagnostic(errorNumber);
            
            var errorDescription = "Number: " + errorNumber + "\nDescription: " + errorString + "\nDiagnostic: " + diagnostic;
            
            alert("Error - Could not retrieve a value from the LMS.\n\n" + errorDescription);
            return "";
        }
    }
    
    return result;
}