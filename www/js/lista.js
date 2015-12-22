/**
 * Created by Julio on 19/11/2015.
 */
var cargarDB = {
    db:"",
    initialize: function(){
        this.db=window.openDatabase("BlackList","1.0","Base de datos de morosos",2*1024*1024);
        this.cargaDB();
    },
    cargaDB:function(){
        console.log("cargamos la base de datos");
        //transaction
        this.db.transaction(this.mostrarDB,this.mostrarDBError);
    },
    mostrarDB:function(tx){
        //PASO 4
        //ordenar de forma descendiente
        var sql = "SELECT * FROM morosos ORDER BY ultimos DESC;";
        console.log("lanzamos la consulta");
        tx.executeSql(
            sql,
            [],
            function(tx,result){
                console.log("la consulta a sido un exito");

                if(result.rows.length>0){
                    var contador=0;
                    for (var i=0; i<result.rows.length; i++) {
                        var fila=result.rows.item(i);
                        contador=contador+fila.cantidad;
                        console.log("ROW "+i+" nombre: "+fila.nombre_apellidos);
                        $("#listaMorosos ul").append("<li id='"+fila.id+"' class='listaUsers'>" +
                            "<a  href='detalles.html' data-ajax='false'>" +
                            "<div style='float: left' style='font-size: x-large'>"
                            +fila.nombre_apellidos+
                            "</div>" +
                            "<div align='right' style='float: right' style='font-size: x-large'>"
                            +fila.cantidad+
                            "</div>" +
                            "<div style='clear: both'></div>"+
                            "</a></div>"+
                            "</li>").listview('refresh');

                    }
                    $("#contador").append(contador);
                }
                //Guardamos la id en el LocalStorage
                $(document).ready(
                    function(){
                        $('.listaUsers').click(
                            function(){
                                var id=$(this).attr("id");
                                window.localStorage.setItem("user_id",id);
                            }
                        );
                    }
                );
            },
            function(tx,error){
                this.mostrarDBError(error);
            }
        );
    },
    mostrarDBError:function(err){
        console.log("se ha producido un error"+err.code);
        console.log("MENSAGE DE ERROR: "+err.message);
    },
    resultadoDB:function(tx,result){

    }
};
cargarDB.initialize();



