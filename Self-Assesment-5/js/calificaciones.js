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
