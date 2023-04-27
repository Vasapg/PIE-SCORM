function getDocumento(URL){
    fetch(URL)
    .then(response => response.text())
    .then(data => {
        var infoxml = new DOMParser().parseFromString(data, "text/xml");
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
    })
    .catch(error => console.error(error));
}

function getConfig() {
    return fetch("https://raw.githubusercontent.com/Vasapg/PIE-SCORM/main/Self-Assesment-5/ejercicios/config.txt")
      .then(response => response.text())
      .then(text => {
        localStorage.setItem("config", JSON.stringify(text.split('\n')));
        localStorage.setItem("nEjercicio", 0);
        localStorage.setItem("maxEjercicio", text.split('\n').length);
        var titulos = [];
        localStorage.setItem("titulos", JSON.stringify(titulos));
        console.log(text);
        console.log(((text.split('\n').length)-1));
      });
  }
  
  async function getUrl() {
    if (!localStorage.getItem("config")) {
      await getConfig();
    }
    var text = localStorage.getItem("config");
    text = JSON.parse(text);
    var nEjercicio = parseInt(localStorage.getItem("nEjercicio"));
    console.log(nEjercicio);
    
    var titulos = JSON.parse(localStorage.getItem("titulos"));
    titulos.push(text[nEjercicio]);
    localStorage.setItem("titulos", JSON.stringify(titulos));
    console.log(titulos);

    getDocumento(text[nEjercicio + 1]);
    nEjercicio = nEjercicio + 2;
    localStorage.setItem("nEjercicio", nEjercicio);
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
if(!localStorage.getItem("texto"))
    window.onload = getUrl();
else
{
    var texto = localStorage.getItem("texto");
    var body = document.getElementById("documentoXML");
    var textHTML = document.createElement("p");
    textHTML.innerHTML = formatearTexto(texto);

    var espacioHTML  = document.createElement("hr");
    body.appendChild(textHTML);
    body.appendChild(espacioHTML);
}
