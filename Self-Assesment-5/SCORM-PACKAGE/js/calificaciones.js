var procesos_sol = localStorage.getItem("procesos");
var entidades_sol = localStorage.getItem("entidades");
var flujos_sol = localStorage.getItem("flujos");
var almacenes_sol = localStorage.getItem("almacenes");
var relaciones_sol = localStorage.getItem("relaciones");

var procesos_sel = localStorage.getItem("procesos_sel");
var entidades_sel = localStorage.getItem("entidades_sel");
var flujos_sel = localStorage.getItem("flujos_sel");
var almacenes_sel = localStorage.getItem("almacenes_sel");
var relaciones_sel = localStorage.getItem("relaciones_modelo");

arrp_sol = JSON.parse(procesos_sol);
arre_sol = JSON.parse(entidades_sol);
arrf_sol = JSON.parse(flujos_sol);
arra_sol = JSON.parse(almacenes_sol);
arrR_sol = JSON.parse(relaciones_sol);

arrp_sel = JSON.parse(procesos_sel);
arre_sel = JSON.parse(entidades_sel);
arrf_sel = JSON.parse(flujos_sel);
arra_sel = JSON.parse(almacenes_sel);
arrR_sel = JSON.parse(relaciones_sel);

var procesos = 0;
var entidades = 0;
var flujos = 0;
var almacenes = 0;
var relaciones = 0;


getCalificacion(arrp_sol,arrp_sel,"proceso");
getCalificacion(arre_sol,arre_sel,"entidad");
getCalificacion(arrf_sol,arrf_sel,"flujo");
getCalificacion(arra_sol,arra_sel,"almacen");
getCalificacion(arrR_sol,arrR_sel,"relacion");


overSol(arrp_sel,arrp_sol,"procesos");
overSol(arre_sel,arre_sol,"entidades");
overSol(arrf_sel,arrf_sol,"flujos");
overSol(arra_sel,arra_sol,"almacenes");
overSol(arrR_sel,arrR_sol,"relaciones");

solucion = procesos * 1.25/arrp_sol.length + entidades * 1.25/arre_sol.length + flujos * 1.25/arrf_sol.length + almacenes * 1.25/arra_sol.length + relaciones * 5/arrR_sol.length;
solucion_sel = procesos + entidades + almacenes + flujos + relaciones;
solucion_sol = arrp_sol.length + arre_sol.length + arrf_sol.length + arra_sol.length + arrR_sol.length;

document.getElementById("procesos_sel").innerHTML=procesos;
document.getElementById("procesos_sol").innerHTML=arrp_sol.length;

document.getElementById("entidades_sel").innerHTML=entidades;
document.getElementById("entidades_sol").innerHTML=arre_sol.length;

document.getElementById("flujos_sel").innerHTML=flujos;
document.getElementById("flujos_sol").innerHTML=arrf_sol.length;

document.getElementById("almacenes_sel").innerHTML=almacenes;
document.getElementById("almacenes_sol").innerHTML=arra_sol.length;

document.getElementById("relaciones_sel").innerHTML=relaciones;
document.getElementById("relaciones_sol").innerHTML=arrR_sol.length;

document.getElementById("solucion_sel").innerHTML= solucion_sel + " (" + solucion + ")";
document.getElementById("solucion_sol").innerHTML= solucion_sol + " (" + 10 + ")";

var max = parseInt(localStorage.getItem("maxEjercicio"));
var current = parseInt(localStorage.getItem("nEjercicio"));
console.log(max - 1);
console.log(current);
if((max - 1) == current)
{
    document.getElementById("final").style.display = "block";
    document.getElementById("next").style.display = "none";
}


function getCalificacion(arr1,arr2,tipo){
    for(var i=0; i<arr1.length; i++){
        for(var j=0; j<arr2.length;j++){
            if(arr1[i]==arr2[j]){
                if(tipo=="proceso"){
                    procesos++;
                }
                else if(tipo=="entidad"){
                    entidades++;
                }
                else if(tipo=="flujo"){
                    flujos++;
                }
                else if(tipo=="almacen"){
                    almacenes++;
                }
                else if(tipo=="relacion"){
                    relaciones++;
                }
                break;
            }
        }
    }
}

function overSol(arr1,arr2,contador){
    if(arr1.length > arr2.length){
        if(contador=="procesos")
        procesos = procesos - (arr1.length - arr2.length)*0.25; 
        else if(contador=="entidades")
        entidades = entidades - (arr1.length - arr2.length)*0.25; 
        else if(contador=="flujos")
        flujos = flujos - (arr1.length - arr2.length)*0.25; 
        else if(contador=="almacenes")
        almacenes = almacenes - (arr1.length - arr2.length)*0.25; 
        else if(contador=="relaciones")
        relaciones = relaciones - (arr1.length - arr2.length)*0.25; 
    }    
}

var API = null;

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
        API.LMSSetValue("cmi.core.score.raw", solucion_sel);
        API.LMSFinish(""); 
    } 
}

function finalizarActividad()
{
    init();
    finish();
    parent.window.location = "https://moodle.upm.es/titulaciones/oficiales/mod/scorm/view.php?id=552608";
}

function sigEjercicio()
{
    if(!localStorage.getItem("notas"))
    {
        var notas = [solucion_sel];
        localStorage.setItem("notas", JSON.stringify(notas));
        console.log(notas);
        console.log(JSON.stringify(notas));
    }
    else
    {
        var notas = JSON.parse(localStorage.getItem("notas"));
        notas.push(solucion_sel);
        console.log(notas);
        localStorage.setItem("notas", JSON.stringify(notas));
    }
        localStorage.removeItem("texto");
        localStorage.removeItem("procesos_sel");
        localStorage.removeItem("entidades_sel");
        localStorage.removeItem("flujos_sel");
        localStorage.removeItem("almacenes_sel");
        localStorage.removeItem("flujos_sel");
        localStorage.removeItem("relaciones_sel");
        localStorage.removeItem("relaciones_obj");    
        window.location="atributosTexto.html";
}
function finEjercicio()
{
    if(!localStorage.getItem("notas"))
    {
        var notas = [solucion_sel];
        localStorage.setItem("notas", JSON.stringify(notas));
        console.log(notas);
        console.log(JSON.stringify(notas));
    }
    else
    {
        var notas = JSON.parse(localStorage.getItem("notas"));
        notas.push(solucion_sel);
        console.log(notas);
        localStorage.setItem("notas", JSON.stringify(notas));
    }
    window.location="final.html";
}