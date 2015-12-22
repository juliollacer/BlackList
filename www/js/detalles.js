/**
 * Created by Julio on 21/11/2015.
 */

var nombre_apellidos="";
var cantidad=0;
var localidad="";
var telefono=0;
var email="";
var db="";
var id="";
var ultimos = "";

var detalles = {

    initialize: function(){

        //Generamos el conector
        db=window.openDatabase("BlackList","1.0","Base de datos de morosos",2*1024*1024);
        this.cargaDB();
    },
    cargaDB:function () {
        console.log("Cargamos la base de datos");

        db.transaction(this.mostrarDB,this.mostrarDBError);
    },
    mostrarDB:function(tx){
        id=window.localStorage.getItem("user_id");

        var sql="SELECT * FROM morosos WHERE id='"+id+"';";
        console.log("Lanzamos la consulta");
        tx.executeSql(
            sql,
            [],
            //Función de resultado OK
            function(tx,result){
                console.log("Se ha producido la consulta con exito");
                if(result.rows.length>0){
                    for(var i=0;i<result.rows.length;i++){
                        var fila=result.rows.item(i);
                        nombre_apellidos=fila.nombre_apellidos;
                        cantidad=fila.cantidad;
                        localidad=fila.localidad;
                        telefono=fila.telefono;
                        email=fila.email;
                      //PASO 5
                        ultimos = fila.ultimos;
                       // foto=fila.foto;
                        //Aquí actualizaría automaticamente el html
                        console.log("ROW "+i+" nombre: "+fila.nombre_apellidos);
                        $("#nombre_apellidos").append(nombre_apellidos);
                        $("#cantidad").append(cantidad);
                        $("#localidad").append(localidad);
                        $("#telefono").append(telefono);
                        $("#correo").append(email);
                       //PASO 5
                        $("#ultimos").append(ultimos);
                       // $("#avatar").attr("src",foto);

                    }
                }
            },


            //Función de error
            function(tx,error){
                this.mostrarDBError(error);
            }
        );
    },
    mostrarDBError:function(err){
        console.log("Se ha producido un error en la creacion de la base de datos: "+error.code);
        console.log("Mensaje de error: "+err.message);
    }
};

detalles.initialize();