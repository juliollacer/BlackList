/**
 * Created by Julio on 19/11/2015.
 */


var nombre_apellidos="";
var cantidad=0;
var localidad="";
var telefono=0;
var email="";

var db="";


//Insertar Datos
function insertarDatos(tx){
    sql="INSERT INTO morosos(nombre_apellidos,cantidad,localidad,telefono,email)"+
        "VALUES('"+nombre_apellidos+"','"+cantidad+"','"+localidad+"','"+telefono+"','"+email+"');";

    tx.executeSql(sql);
    console.log("ROW INSERT: "+sql);
};

//Error
function mostrarDBErrorSalvar(err){
    console.log("Se ha proucido un error en la búsqueda de la base de datos: "+err.code);
    console.log("MENSAJE DE ERROR: "+err.message);
};

//Al clickar el botón
$("#registrar").click(
    function(event){
        console.log("NUEVO ELEMENTO");
        nombre_apellidos=$("#nombre_apellidos").val();
        cantidad=$("#cantidad").val();
        localidad=$("#localidad").val();
        telefono=$("#telefono").val();
        email=$("#email").val();

        //Conexión con base de datos
        db=window.openDatabase("BlackList","1.0","Base de datos de morosos",2*1024*1024);
        db.transaction(
            insertarDatos
            ,mostrarDBErrorSalvar
        );
    }
);
/*
function mostrarImagen(imageURI){
    foto = imageURI;

    console.log("IMAGEN: "+imageURI);

    $("#avatar").attr("src",imageURI);

};

function errorImagen(message){
    console.log("MENSAJE DE ERROR: "+message);
};

//Al clickar para la foto
$("#avatar").click(
    function(event){
        navigator.camera.getPicture(
            mostrarImagen,
            errorImagen,
            { quality: 50,
                destinationType: Camera.DestinationType.FILE_URI
            }
        );
    }
);
*/
