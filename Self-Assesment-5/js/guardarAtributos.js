if(!localStorage.getItem("procesos_sel")){
procesos_sel=[];
entidades_sel=[];
flujos_sel=[];
almacenes_sel=[];
}

else{
    var procesos = localStorage.getItem("procesos_sel");
    var entidades = localStorage.getItem("entidades_sel");
    var flujos = localStorage.getItem("flujos_sel");
    var almacenes = localStorage.getItem("almacenes_sel");

    procesos_sel = JSON.parse(procesos);
    entidades_sel = JSON.parse(entidades);
    flujos_sel = [];
    flujos_sel = JSON.parse(flujos);
    almacenes_sel = JSON.parse(almacenes);

    for(i = 0;i<procesos_sel.length;i++){
        devolverBotones(procesos_sel[i],document.getElementById("botoness_p"),procesos_sel);
    }
    for(i = 0;i<entidades_sel.length;i++){
        devolverBotones(entidades_sel[i],document.getElementById("botoness_e"),entidades_sel);
    }
    for(i = 0;i<flujos_sel.length;i++){
        devolverBotones(flujos_sel[i],document.getElementById("botoness_f"),flujos_sel);
    }
    for(i = 0;i<almacenes_sel.length;i++){
        devolverBotones(almacenes_sel[i],document.getElementById("botoness_a"),almacenes_sel);
    }
}

function gestionDeTipo(tipo){
    var atributo = window.getSelection();
    if(atributo!=""){
        if(tipo == "proceso"){
            procesos_sel.push(atributo.toString());
            var body = document.getElementById("botoness_p");
            var x = document.createElement("button");
            x.innerHTML = atributo;
            x.onclick = function(){
                alert(procesos_sel);
                for(var j=0; j<procesos_sel.length; j++ ){
                    if(procesos_sel[j] == x.innerHTML){
                        procesos_sel.splice(j,1);
                        break;
                    }
                }
                body.removeChild(x);
            }
            body.appendChild(x);
        }    
        else if(tipo == "entidad"){
            entidades_sel.push(atributo.toString());
            var body = document.getElementById("botoness_e");
            var x = document.createElement("button");

            x.innerHTML = atributo;
            x.onclick = function(){

                alert(entidades_sel);
                for(var j=0; j<entidades_sel.length; j++ ){
                    if(entidades_sel[j] == x.innerHTML){
                        entidades_sel.splice(j,1);
                        break;
                    }
                }
                body.removeChild(x);
            }

            body.appendChild(x);
        }
        else if(tipo=="flujo"){
            flujos_sel.push(atributo.toString());
            var body = document.getElementById("botoness_f");
            var x = document.createElement("button");
            x.innerHTML = atributo;
            x.onclick = function(){
                alert(flujos_sel);
                for(var j=0; j<flujos_sel.length; j++ ){
                    if(flujos_sel[j] == x.innerHTML){
                        flujos_sel.splice(j,1);
                        break;
                    }
                }
                body.removeChild(x);
            }
            body.appendChild(x);
        }
        else if(tipo=="almacen"){
            almacenes_sel.push(atributo.toString());
            var body = document.getElementById("botoness_a");
            var x = document.createElement("button");
            x.innerHTML = atributo;
            x.onclick = function(){
                alert(almacenes_sel);
                for(var j=0; j<almacenes_sel.length; j++ ){
                    if(almacenes_sel[j] == x.innerHTML){
                        almacenes_sel.splice(j,1);
                        break;
                    }
                }
                body.removeChild(x);
            }
            body.appendChild(x);
        }
    }
}

function devolverBotones(obj,body,arr){
        var x = document.createElement("button");
        x.innerHTML = obj;
        x.onclick = function(){
              for(var j=0; j<arr.length; j++ ){
                  if(arr[j] == x.innerHTML){
                      arr.splice(j,1);
                      break;
                  }
              }
              body.removeChild(x);
            }
        body.appendChild(x);
}

function save(){
    window.location = "relacionarAtributos.html";
    localStorage.setItem("procesos_sel", JSON.stringify(procesos_sel));
    localStorage.setItem("entidades_sel", JSON.stringify(entidades_sel));
    localStorage.setItem("flujos_sel", JSON.stringify(flujos_sel));
    localStorage.setItem("almacenes_sel", JSON.stringify(almacenes_sel));
}
