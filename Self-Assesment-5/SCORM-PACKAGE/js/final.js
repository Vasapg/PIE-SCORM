var media = [];
llenarTablaConArray();

var API = null;
init();
finish();

function FindAPI(win) {
    while ((win.API == null) && (win.parent != null) && (win.parent != win)) {
        nFindAPITries ++;
        if (nFindAPITries > 500) {
            alert("Error in finding API -- too deeply nested.");
            return null 
        }
        win = win.parent
    }
    return win.API
} 

function init() {
    if ((window.parent) && (window.parent != window)){
        API = FindAPI(window.parent);
    } 
    if ((API == null) && (window.opener != null)){
        API = FindAPI(window.opener); 
    } 
    if (API == null) { 
        alert("No API adapter found"); 
    } 
    else { 
        API.LMSInitialize(""); 
    } 
}

function finish() {
    localStorage.clear(); 
    if (API != null) { 
        API.LMSSetValue("cmi.core.lesson_status","completed");
        API.LMSSetValue("cmi.core.score.max",);
        API.LMSSetValue("cmi.core.score.min",0);
        API.LMSSetValue("cmi.core.score.raw", mediaArray(media));
        API.LMSFinish("");
    } 
}

function finalizarActividad()
{
    parent.window.location = "https://moodle.upm.es/titulaciones/oficiales/mod/scorm/view.php?id=552608";
}

function mediaArray(array) {
    var suma = 0;
    var cantidad = array.length;
  
    for (var i = 0; i < cantidad; i++) {
      suma += array[i];
    }
  
    var media = suma / cantidad;
    return media;
  }

function llenarTablaConArray() {
            
    // Obtener la tabla y su cuerpo
    var tabla = document.getElementById("tablaFinal");
    var cuerpoTabla = tabla.querySelector("tbody");

    // Limpiar el contenido previo de la tabla
    cuerpoTabla.innerHTML = "";
    var notas = JSON.parse(localStorage.getItem("notas"));
    var titulos = JSON.parse(localStorage.getItem("titulos"));

    // Recorrer el array y añadir una fila por cada elemento
    for (var i = 0; i < notas.length; i++) {
        // Crear una nueva fila
        var fila = cuerpoTabla.insertRow();

        // Añadir las celdas con los valores del elemento
        var celda1 = fila.insertCell();
        var celda2 = fila.insertCell();
        
        celda1.innerHTML = titulos[i];
        celda2.innerHTML = notas[i];
        media[i] = parseInt(notas[i]);
    }
    // Crear una nueva fila
    var fila = cuerpoTabla.insertRow();

    // Añadir las celdas con los valores del elemento
    var celda1 = fila.insertCell();
    var celda2 = fila.insertCell();
    
    celda1.innerHTML = "Final Grade";
    celda2.innerHTML = mediaArray(media);
}