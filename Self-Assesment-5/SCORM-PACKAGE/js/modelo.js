if(!localStorage.getItem("relaciones_obj")){
    //alert("No existe ninguna relación para crear un modelo");
}

else{
    relaciones = [];
    var get = localStorage.getItem("relaciones_obj");
    relaciones_obj = JSON.parse(get);


    var bodym = document.getElementById("mermaid");
    var texto = "graph TD;";
    var textToAdd = document.createTextNode(texto);
    bodym.appendChild(textToAdd);
    for(var i = 0; i<relaciones_obj.length;i++){
        relacion = relaciones_obj[i].at.replace(/\s+/g, '') + formaAtributo(relaciones_obj[i].at,relaciones_obj[i].tipoat) + "-->" +
        formaAtributo(relaciones_obj[i].flujo,"flujo") + relaciones_obj[i].at2.replace(/\s+/g, '') + formaAtributo(relaciones_obj[i].at2,relaciones_obj[i].tipoat2) + ";";
        relaciones.push(relacion);
        var texto = document.createTextNode(relacion);
        bodym.appendChild(texto);
    }
    localStorage.setItem("relaciones_modelo", JSON.stringify(relaciones));
}





function formaAtributo(atributo,tipo){
    var sol="";
    if(tipo=="proceso"){
        sol = "(("+atributo+"))";
    }
    else if(tipo=="entidad"){
        sol = "["+atributo+"]";
    }
    else if(tipo=="almacen"){
        sol="[("+atributo+")]";
    }
    else{
        sol ="|"+atributo+"|";
    }
    return sol;
}

/**
 * Correo: relacion puntuación SUS
 * Documento de especificaciones de modelo
 * Ejemplo xml de ambos ejercicios
 *  */