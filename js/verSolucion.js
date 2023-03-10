function verSolucionXML(titulo,texto,texto_errores,tipos_errores,id){
    var body = document.getElementById(id);  
    texto = quitarEspacios(texto);  
    for(var i = 0; i<texto_errores.length; i++){
        texto_errores[i] = quitarEspacios(texto_errores[i]);
        texto = texto.replace(texto_errores[i],'<div><div class="bocadillo-cuadrado">' + tipos_errores[i] + '</div><strong>' + texto_errores[i] + '</strong></div>');
    }    
    body.innerHTML = '<h1>' + titulo + '</h1>' + '<hr>' + texto;
}

function quitarEspacios(texto){
    texto = texto.split("\n").join("");
    texto = texto.split("\t").join("");
    var array = texto.split(" ");
    texto = "";
    for(var j = 0;j<array.length; j++){ 
        if(array[j] != ""){            
            if(j == array.length-1){
                texto += array[j];
            }
            else{
                texto += array[j] + " ";
            }            
        }
    }
    return texto;
}