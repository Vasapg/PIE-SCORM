function abrirDocumento() {
	
	var array_de_documentos = localStorage.getItem("array_de_documentos");
	array_de_documentos = JSON.parse(array_de_documentos);
	
	var docsHechos = localStorage.getItem("docsHechos");
	docsHechos = JSON.parse(docsHechos);
	var buleano = false;
	while (!buleano) {
		var aleatorio = Math.floor(Math.random() * (array_de_documentos.length - 0)) + 0;
		if (!yaEstaHecho(docsHechos, array_de_documentos[aleatorio])) {
			buleano = true;
		}
	}
	var xhttp = comprobarXHTTP();
	docsHechos.push(array_de_documentos[aleatorio]);
	localStorage.setItem("docsHechos", JSON.stringify(docsHechos));
	xhttp.open("GET", "xml/" + array_de_documentos[aleatorio], false);
	xhttp.send();
	var xmlDoc = xhttp.responseXML;
	var titulo = xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue;
	var texto = xmlDoc.getElementsByTagName("text")[0].childNodes[0].nodeValue;

	var texto_errores = [];
	var tipos_errores = [];
	var pesos_errores = [];
	var numErrores = xmlDoc.getElementsByTagName("defect").length;

	for (var i = 0; i < numErrores; i++) {
		var txt_Error = xmlDoc.getElementsByTagName("defect")[i].childNodes[0].nodeValue;
		var tipo_Error = xmlDoc.getElementsByTagName("defect")[i].getAttribute("type");
		var peso_Error = xmlDoc.getElementsByTagName("defect")[i].getAttribute("weight");

		texto_errores.push(txt_Error);
		tipos_errores.push(tipo_Error);
		pesos_errores.push(peso_Error);
	}
	var arrayDeTitulos = localStorage.getItem("titulos");
	arrayDeTitulos = JSON.parse(arrayDeTitulos);
	arrayDeTitulos.push(titulo);
	localStorage.setItem("titulos", JSON.stringify(arrayDeTitulos));
	localStorage.setItem("titulo", titulo);
	localStorage.setItem("texto", formatearTexto(texto));
	localStorage.setItem("textoSolucion", texto);
	localStorage.setItem("texto_errores", JSON.stringify(texto_errores));
	localStorage.setItem("tipos_errores", JSON.stringify(tipos_errores));
	localStorage.setItem("pesos_errores", JSON.stringify(pesos_errores));

	var body = document.getElementById("documentoXML");
	var tituloHTML = document.createElement("h1");
	tituloHTML.textContent = titulo;
	var textoHTML = document.createElement("p");
	textoHTML.setAttribute("id", "doc");
	textoHTML.innerHTML = formatearTexto(texto);

	var espacioHTML = document.createElement("hr");
	body.appendChild(tituloHTML);
	body.appendChild(espacioHTML);
	body.appendChild(textoHTML);
	body.appendChild(espacioHTML);
}

function comprobarXHTTP() {
	var xhttp;
	if (window.XMLHttpRequest) {
		xhttp = new XMLHttpRequest();
	}
	else {
		xhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	return xhttp;
}

function yaEstaHecho(array, doc) {
	var i = 0;
	var buleano = false;
	while (i < array.length && !buleano) {
		if (array[i] == doc) {
			buleano = true;
		}
		i++
	}
	return buleano;
}

function formatearTexto(texto) {
	return texto.replace(/[\n]/gi, "<br>");
}

window.onload = abrirDocumento();