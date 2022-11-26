const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

//conexión con la base de datos
const { connection } = require("../config");

//Método GET para consultar todos los datos
const getUsuarios = (req, res) => {
    connection.query("SELECT * FROM usuarios",
        (error, results) => {
            if (error)
                throw error;
            res.status(200).json(results);
        });
};
//Ruta para método GET
app.route("/usuarios").get(getUsuarios);

//Método POST para crear y enviar registros
const postUsuarios = (req, res) => {
    const { Rol, Nombre, Apellidos, TipoDocumento, Documento, Direccion, Telefono, Correo, Contrasena } = req.body;
    connection.query("INSERT INTO usuarios(Rol, Nombre, Apellidos, TipoDocumento, Documento, Direccion, Telefono, Correo, Contrasena) VALUES(?,?,?,?,?,?,?,?,?)",
        [Rol, Nombre, Apellidos, TipoDocumento, Documento, Direccion, Telefono, Correo, Contrasena],
        (error, results) => {
            if (error)
                throw error;
            res.status(201).json({ "El registro se realizó correctamente": results.affectedRows });
        });
};
//Ruta para método POST
app.route("/usuarios").post(postUsuarios);

//Método PUT para modificar totalmente un registro
const putUsuarios = (req, res) => {
    const { Documento, Rol, Nombre, Apellidos, TipoDocumento, Direccion, Telefono, Correo, Contrasena } = req.body;
    connection.query("UPDATE usuarios SET ? WHERE Documento=?", [{ Rol: Rol, Nombre: Nombre, Apellidos: Apellidos, TipoDocumento: TipoDocumento, Direccion: Direccion, Telefono: Telefono, Correo: Correo, Contrasena: Contrasena }, Documento],
        (error, result) => {
            if (error)
                throw error;
            res.status(201).json({ "El registro se modificó correctamente": result.affectedRows })
        })
}
//Ruta para método PUT
app.route("/usuarios").put(putUsuarios)

//Método DELETE para eliminar un registro
const deleteUsuarios = (req, res) => {
    const Documento = req.params.Documento;
    connection.query("DELETE FROM usuarios WHERE Documento = ?",
        [Documento],
        (error, results) => {
            if (error)
                throw error;
            res.status(201).json({ "El registro se eliminó correctamente": results.affectedRows });
        });
};
//Ruta para método DELETE
app.route("/usuarios/:Documento").delete(deleteUsuarios);

module.exports = app;