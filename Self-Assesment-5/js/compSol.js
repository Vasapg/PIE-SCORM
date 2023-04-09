if(localStorage.getItem("relaciones")){
    var relaciones_sol = localStorage.getItem("relaciones");

    arrR_sol = JSON.parse(relaciones_sol);
    var bodym_sol = document.getElementById("mermaid2");
    var texto = "graph TD;";
    var textToAdd = document.createTextNode(texto);
    bodym_sol.appendChild(textToAdd);


    for(var j=0;j<arrR_sol.length;j++){
        var texto = document.createTextNode(arrR_sol[j]);
        bodym_sol.appendChild(texto);
    }

}