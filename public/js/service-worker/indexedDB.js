$(document).ready(function(){
    $.ajax({
        url: `/user/${$('#userId').val()}/folders`,
        method: 'GET',
        success:function(resp){
            crearIndexedDB(resp);
        }
    });
});

function crearIndexedDB(folders){
    //Definimos como vamos a crear el indexedDB segun el navegador (Chrome, Mozilla, Opera)
    window.indexedDB = window.indexedDB || window.mozIndexedDB || indexedDB;
    if (!window.indexedDB) {
        window.alert("Su navegador no soporta una versión estable de indexedDB. Tal y como las características no serán validas");
        return;
    }
    var solicitud = window.indexedDB.open("XploidCode", 1);
    solicitud.onsuccess = function(evento){
        database = solicitud.result;
    }
    solicitud.onerror = function(evento){
        console.error(evento);
    }
    solicitud.onupgradeneeded = function(evento){
        database = evento.target.result;
        var objectStoreFolders = database.createObjectStore("folders", {keyPath: "cod", autoIncrement: true});
        objectStoreFolders.transaction.oncomplete = function(evento){
            var transaccion = database.transaction(["folders"],"readwrite");
            var objectStoreFolders = transaccion.objectStore("folders");
            for (var i = 0; i <= folders.length - 1; i++) {
                objectStoreFolders.add(folders[i]);
            }
        }
    }
}

function eliminarIndexedDB(){

}