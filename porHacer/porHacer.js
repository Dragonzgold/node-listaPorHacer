const { rejects } = require("assert");
const fs = require("fs");

let listadoPorHacer = [];

const guardarDB = () =>{
    let dataDB = JSON.stringify(listadoPorHacer);

    fs.writeFile(`DB/data.json`, dataDB, (err)=>{
        if(err) throw new Error('No se pudo grabar', err);
    })
}

const cargarDB = () =>{

    try {

        listadoPorHacer = require('../DB/data.json');

    } catch (error) {
        listadoPorHacer = [];
    }
}

const crear = (descripcion) =>{

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
}

const getListado = () =>{
    cargarDB();
    return listadoPorHacer
}

const actualizar = (descripcion, completado = true) =>{

    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if(index >=0){
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true
    }else{
        return false
    }
}

const borrar = (descripcion) =>{

    cargarDB();

    let lista = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if(lista >= 0){
        listadoPorHacer.splice(lista, lista).descripcion
        guardarDB();
        return true
    }else{
        return false
    }
}



module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}