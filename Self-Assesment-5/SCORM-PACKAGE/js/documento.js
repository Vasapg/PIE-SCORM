
function getDocumento(){
    var xhttp = comprobarXHTTP();
    xhttp.open("GET","ejercicios/ex1.xml",false);
    xhttp.send();
    var infoxml = xhttp.responseXML;
    var entidades=[];
    var procesos=[];
    var flujos=[];
    var almacenes=[];
    var relaciones=[];
    var texto = infoxml.getElementsByTagName("text")[0].childNodes[0].nodeValue;
    var atributos = infoxml.getElementsByTagName("atribute");
    for(i = 0; i < atributos.length; i++){
        if(atributos[i].getAttribute("type") == "proceso"){
            procesos.push(atributos[i].childNodes[0].nodeValue);
        }
        else if(atributos[i].getAttribute("type") == "entidad"){
            entidades.push(atributos[i].childNodes[0].nodeValue);
        }
        else if(atributos[i].getAttribute("type") == "flujo"){
            flujos.push(atributos[i].childNodes[0].nodeValue);
        }
        else if(atributos[i].getAttribute("type") == "almacen"){
            almacenes.push(atributos[i].childNodes[0].nodeValue);
        }
        else if(atributos[i].getAttribute("type") == "relacion"){
            relaciones.push(atributos[i].childNodes[0].nodeValue);
        }
    }

    localStorage.setItem("texto", formatearTexto(texto));
    localStorage.setItem("procesos", JSON.stringify(procesos));
    localStorage.setItem("entidades", JSON.stringify(entidades));
    localStorage.setItem("flujos", JSON.stringify(flujos));
    localStorage.setItem("almacenes", JSON.stringify(almacenes));
    localStorage.setItem("relaciones", JSON.stringify(relaciones));

    var body = document.getElementById("documentoXML");
    var textHTML = document.createElement("p");
    textHTML.innerHTML = formatearTexto(texto);

    var espacioHTML  = document.createElement("hr");
    body.appendChild(textHTML);
    body.appendChild(espacioHTML);
}

function comprobarXHTTP(){
    var xhttp;
        if(window.XMLHttpRequest){
            xhttp = new XMLHttpRequest();
        }
        else{
            xhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        return xhttp;
}


function formatearTexto(texto){
    return texto.replace(/[\n]/gi,"<br>");
}

window.onload = getDocumento();