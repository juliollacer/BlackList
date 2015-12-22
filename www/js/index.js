/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var confDB = {
    existe_db:"",
    db:"",
    initialize: function(){
        this.existe_db=window.localStorage.getItem("existe_db");
        //creamos un enlace con la base de datos
        this.db=window.openDatabase("BlackList","1.0","Base de datos de morosos",2*1024*1024);
        //preguntamos si es necesario creear la base de datos
        if(this.existe_db==null){
            console.log("no existe base de datos");

            this.createDB();
        }/*else{
            cargarDB.initialize();
        }*/
    },
    createDB:function(){
        console.log("creamos la base de datos");
        //transaction
        this.db.transaction(this.createLocalDB,this.createDBError,this.createDBSucc);
    },
    createLocalDB:function(tx){
        tx.executeSql("DROP TABLE IF EXISTS morosos");
        console.log("e creado labase de datos");
        var sql="CREATE TABLE IF NOT EXISTS morosos("+
                "id INTEGER PRIMARY KEY AUTOINCREMENT,"+
                "nombre_apellidos VARCHAR(126),"+
                "cantidad INT(390),"+
                "localidad VARCHAR(126),"+
                "telefono INT(64)," +
                "email VARCHAR(126),"+
                //PASO 2
                //campo integer con doble condicion
                "ultimos INT(1) CHECK(ultimos >= 0 and ultimos <= 1));";
            ;
        tx.executeSql(sql);

        //PASO 3
        //insertamos campos con el valor ultimos a 0

        sql="INSERT INTO morosos(nombre_apellidos,cantidad,localidad,telefono,email,ultimos)"+
            " VALUES('ELCULPEEEERR',230,'picassent',3342879,'juliolg1994@gmail.com',0);";
        tx.executeSql(sql);

        sql="INSERT INTO morosos(nombre_apellidos,cantidad,localidad,telefono,email,ultimos)"+
            " VALUES('Robert Villama',230,'picassent',3342879,'jRobertlg1994@gmail.com',0);";
        tx.executeSql(sql);

        sql="INSERT INTO morosos(nombre_apellidos,cantidad,localidad,telefono,email,ultimos)"+
            " VALUES('jorge Villama',230,'picassent',3342879,'jorgelg1994@gmail.com',0);";
        tx.executeSql(sql);

        sql="INSERT INTO morosos(nombre_apellidos,cantidad,localidad,telefono,email,ultimos)"+
            " VALUES('caramierda',230,'picassent',3342879,'hueloamierda@gmail.com',0);";
        tx.executeSql(sql);

        //PASO 2
        //segunda parte
        sql = "UPDATE morosos SET ultimos = 1 WHERE id IN (SELECt id FROM morosos ORDER BY id DESC LIMIT 3);";
        tx.executeSql(sql);


        console.log("creando inserts");
        //insertamos valores de ejemplo
        sql="INSERT INTO morosos(nombre_apellidos,cantidad,localidad,telefono,email)"+
            " VALUES('Julio Llacer',230,'picassent',3342879,'juliolg1994@gmail.com');";
        tx.executeSql(sql);
        console.log("e creado julioooo");
        sql="INSERT INTO morosos(nombre_apellidos,cantidad,localidad,telefono,email)"+
            " VALUES('paco gomez',938,'asaber',7489,'paco@gmail.com');";
        tx.executeSql(sql);
        console.log("e creado paco");
    },
    createDBError:function(err){
        console.log("se ha produccido un error en la creacio de la bd :"+err.message);
    },
    createDBSucc:function(){
        console.log("se ha generado la base de datos con exito");
        window.localStorage.setItem("existe_db",1);
        cargarDB.initialize();
    }
};


var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        //var parentElement = document.getElementById(id);
        //var listeningElement = parentElement.querySelector('.listening');
        //var receivedElement = parentElement.querySelector('.received');

        //listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
        confDB.initialize();
    }

};


var nombre_apellidos="";
var cantidad=0;
var db="";


//Insertar Datos
function insertarDatos(tx){
    sql="INSERT INTO morosos(nombre_apellidos,cantidad)"+
        "VALUES('"+nombre_apellidos+"','"+cantidad+"');";

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

        //Conexión con base de datos
        db=window.openDatabase("BlackList","1.0","Base de datos de morosos",2*1024*1024);
        db.transaction(
            insertarDatos
            ,mostrarDBErrorSalvar
        );
        $("#entradaRapida ul").listview('refresh');
    }
);

app.initialize();

