var tipoDeError = [];
var oraciones = [];
var posiciones = [];
var texto_error = [];
var texto_original = document.getElementById("documentoXML").innerHTML;

//Con esta función 

document.getElementById("documentoXML").addEventListener("mouseup",function(){
    var oracion = window.getSelection();
    if(oracion != ""){
        var offset = oracion.anchorOffset;
        var text = oracion.anchorNode.data;
        var textOffset = document.getElementById("documentoXML").innerHTML.indexOf(text);
        texto_error.push(oracion.toString());
        posiciones.push(textOffset + offset);
        enableButtons();
    }
});

//Con esta función realtamos el texto seleccionado de amarillo
function colorDeFondo(texto, oracion, tipo){
    texto = texto.replace(oracion, '<div class="unselectable"><div class="bocadillo-cuadrado">' + "" + tipo + "" + '</div><strong>' + oracion + '</strong></div>');
    var body = document.getElementById("documentoXML");
    body.innerHTML = texto;
}

//Con esta funcion se pretende resaltar en negrita el error seleccionado y soltar un bocadillo que indique su tipo

//Se agrega el tipo de error
function gestionDeTipo(tipo){
    var oracion = texto_error.pop().toString();
    if(oracion.includes("\n"))
        {
            alert("Los errores no se pueden seleccionar entre párrafos");
            disableButtons();
            return;
        }
    tipoDeError.push(tipo);
    oraciones.push(oracion);
    var oracion = oraciones.pop();
    colorDeFondo(document.getElementById("documentoXML").innerHTML, oracion.toString() ,tipo);
    oraciones.push(oracion.toString());
    disableButtons();
    cerrarPopup3("TiposDeError");
}

function eliminarError(){
    if(seleccionTabla != ''){
        quitarColorDeFondo(oraciones[seleccionTabla], tipoDeError[seleccionTabla]);
        tipoDeError.splice(seleccionTabla,1);
        oraciones.splice(seleccionTabla,1);
        posiciones.splice(seleccionTabla,1);
        seleccionTabla = parseInt(seleccionTabla) + 1;
        seleccionTabla = '';       
    }
    else{
        alert("No has seleccionado ningún error");
    }
    document.getElementById("estasseguro2").style.display="none";
}

function reiniciarDocumento()
{
    document.getElementById("documentoXML").innerHTML = texto_original;
    tipoDeError = [];
    oraciones = [];
    cerrarPopup3("estasseguro3");
}

//Quita el color de fondo
function quitarColorDeFondo(oracion, tipo){
    document.getElementById("documentoXML").innerHTML =
     document.getElementById("documentoXML").innerHTML.replace('<div class="unselectable"><div class="bocadillo-cuadrado">' + tipo + '</div><strong>'
      + oracion + '</strong></div>', oracion);
}

//Se crea y se muestra la tabla de errores
function tablaErrores(){
    var n_columnas = 2;
    var n_filas = tipoDeError.length;
    var n_errores = oraciones.length;
    document.getElementById("quitar_boton").style.display="none";

    var body = document.getElementById("t_errores")
    var tabla   = document.createElement("table");
    tabla.setAttribute("id","tabla");
    var tblBody = document.createElement("tbody");

    for(var i = 0; i<n_filas || i<n_errores; i++){
        var hilera = document.createElement("tr");
        for(var j = 0; j<n_columnas; j++){
            var celda = document.createElement("td");
            if(j == 0){
                var textoCelda = document.createElement('INPUT');
                textoCelda.setAttribute("type","radio");
                textoCelda.setAttribute("name","seleccion_de_error");
                textoCelda.setAttribute("value",i);
            }
            else{
                var textoCelda = document.createTextNode(i+1 + " > " + tipoDeError[i] + " > " + oraciones[i]);             
            }
            celda.appendChild(textoCelda);
            hilera.appendChild(celda);
        }
        tblBody.appendChild(hilera);
    }  
    tabla.appendChild(tblBody);
    body.appendChild(tabla);
    tabla.setAttribute("border", "1");

    document.getElementById("delete_error").style.display="block";

    $("input[name='seleccion_de_error']").on('change', function (){
        seleccionTabla = $(this).val();
    });
}

function abrirPopup(modal){
    document.getElementById(modal).style.display="block";
    if(modal.toString() == "t_errores")
    {
        tablaErrores();
    }
    if(modal == "estasseguro2")
        cerrarPopup();
}


function cerrarPopup(){
    document.getElementById("t_errores").style.display="none";
    document.getElementById("delete_error").style.display="none";
    var eliminar = document.getElementById("tabla");
    if(eliminar != null){
        var padre = eliminar.parentNode;
        padre.removeChild(eliminar);
    }
}

//Eliminar funciones redundantes
function cerrarPopup3(window){
    document.getElementById(window).style.display="none";
}


function sigPagina(){
    window.location = "compSoluciones.html";
    localStorage.setItem("tipoDeError",JSON.stringify(tipoDeError));
    localStorage.setItem("oraciones",JSON.stringify(oraciones));
}

function enableButtons()
{
    document.getElementById("Understability").disabled = false;
    document.getElementById("Redundancy").disabled = false;
    document.getElementById("Completeness").disabled = false;
    document.getElementById("Ambiguity").disabled = false;
    document.getElementById("Consistency").disabled = false;
    document.getElementById("Organisation").disabled = false;
    document.getElementById("Traceability").disabled = false;
    document.getElementById("Testability").disabled = false;
    document.getElementById("Realism").disabled = false;
}

function disableButtons()
{
    document.getElementById("Understability").disabled = true;
    document.getElementById("Redundancy").disabled = true;
    document.getElementById("Completeness").disabled = true;
    document.getElementById("Ambiguity").disabled = true;
    document.getElementById("Consistency").disabled = true;
    document.getElementById("Organisation").disabled = true;
    document.getElementById("Traceability").disabled = true;
    document.getElementById("Testability").disabled = true;
    document.getElementById("Realism").disabled = true;
}