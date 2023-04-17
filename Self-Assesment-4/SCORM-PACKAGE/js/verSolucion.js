function verSolucionXML(titulo,texto,texto_errores,tipos_errores,id)
{
    var body = document.getElementById(id);  
    texto = quitarEspacios(texto);  
    for(var i = 0; i<texto_errores.length; i++){
        texto_errores[i] = quitarEspacios(texto_errores[i]);
        texto = texto.replace(texto_errores[i],'<div><div class="bocadillo-cuadrado">' + tipos_errores[i] + '</div><strong>' + texto_errores[i] + '</strong></div>');
    }    
    body.innerHTML = '<h3>' + titulo + '</h3>' + '<hr>' + texto;
}

function verSolucionAlumno(titulo, texto, text_originales, tipos_originales, text_alumno, tipos_alumno, id)
{
    var body = document.getElementById(id);  
    texto = quitarEspacios(texto);  
    for(var i = 0; i<text_alumno.length; i++){
        for(var j = 0; j<text_originales.length; j++){
            if(text_alumno[i].split(" ").length - text_originales[j].split(" ").length < 8){
                if(compTextos(text_originales[j].split(" "),text_alumno[i].split(" ")) >= calcOchenta(text_originales[j].split(" ")) 
                && tipos_originales[j] == tipos_alumno[i]){
                    text_alumno[i] = quitarEspacios(text_alumno[i]);
                    texto = texto.replace(text_alumno[i],'<div><div class="bocadillo-cuadrado-good">' + tipos_alumno[i] 
                    + '</div><strong>' + text_alumno[i] + '</strong></div>');
                    break;
                }
                else if(j == text_originales.length - 1)
                {
                    text_alumno[i] = quitarEspacios(text_alumno[i]);
                    texto = texto.replace(text_alumno[i],'<div><div class="bocadillo-cuadrado-wrong">' + tipos_alumno[i] 
                    + '</div><strong>' + text_alumno[i] + '</strong></div>');
                }
            }            
        }
    }
    body.innerHTML = '<h3>' + titulo + '</h3>' + '<hr>' + texto;
}

function quitarEspacios(texto)
{
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
function compTextos(array1,array2){
    var numCoincidencias = 0;
    for(var  i = 0; i<array2.length; i++){
        for(var j = 0; j<array1.length; j++){
            if(array2[i] == array1[j]){
                numCoincidencias++;
            }
        }

    }
    return numCoincidencias;
}

function calcOchenta(array){
    var calculo = array.length * 0.8;
    var resto = calculo % 1;
    if(resto != 0){
        if(resto >= 0.5){
            calculo = calculo + 1 - resto;
        }
        else{
            calculo = calculo - resto;
        }
    }
    return calculo;
}