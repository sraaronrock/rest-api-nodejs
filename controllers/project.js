"use strict";

var Project = require("../models/project");
var fs = require("fs");
const { response } = require("../app");

var controller = {
  home: function (req, res) {
    return res.status(200).send({
      message: "Entro en home",
    });
  },

  test: function (req, res) {
    return re.status(200).send({
      message: "Entro en test",
    });
  },

  saveProject: function (req, res) {
    var project = new Project();
    var params = req.body;
    project.title = params.title;
    project.author = params.author;
    project.editorial = params.editorial;
    project.year = params.year;
    project.generos = params.generos;
    project.image = null;

    project.save((err, projectStored) => {
      if (err)
        return res
          .status(500)
          .send({ message: "Error al guardar el documento" });
      if (!projectStored)
        return res
          .status(404)
          .send({ message: "No se ha podido acceder al documento" });
      return res.status(200).send({ project: projectStored });
    });
  },

  getProject: function (req, res) {
    var projectId = req.params.id;

    if (projectId == null)
      return res.status(404).send({ message: "El libro no existe." });

    Project.findById(projectId, (err, project) => {
      if (err)
        return res
          .status(500)
          .send({ message: "Error al devolver los datos." });

      if (!project)
        return res.status(404).send({ message: "El libro no existe." });

      return res.status(200).send({
        project,
      });
    });
  },

  getProjects: function (req, res) {
    Project.find({}).exec((err, projects) => {
      if (err)
        return res
          .status(500)
          .send({ message: "Error al devolver los datos." });

      if (!projects)
        return res.status(404).send({ message: "El libro no existe." });

      return res.status(200).send({ projects });
    });
  },

  updateProjects: function (req, res) {
    var projectId = req.params.id;
    var update = req.body;

    Project.findByIdAndUpdate(
      projectId,
      update,
      { new: true },
      (err, projectUpdated) => {
        if (err)
          return res.status(500).send({ message: "Error al actualizar." });

        if (!projectUpdated)
          return res
            .status(404)
            .send({ message: "El libro no existe para actualizarlo." });

        return res.status(200).send({
          project: projectUpdated,
        });
      }
    );
  },

  deleteProject: function (req, res) {
    var projectId = req.params.id;

    Project.findByIdAndRemove(projectId, (err, projectRemoved) => {
      if (err) return res.status(500).send({ message: "Error al borrar." });
      if (!projectRemoved)
        return res
          .status(404)
          .send({ message: "El libro no existe para borrarlo" });

      return res.status(200).send({
        project: projectRemoved,
      });
    });
  },

  uploadImage: function (req, res) {
    var projectId = req.params.id;
    var fileName = "Imagen no subida ...";

    if (req.files) {
      var filePath = req.files.image.path;
      var fileSplit = filePath.split("\\");
      var fileName = fileSplit[1];
      var extSplit = fileName.split(".");
      var fileExt = extSplit[1];

      if (
        fileExt == "png" ||
        fileExt == "jpg" ||
        fileExt == "svg" ||
        fileExt == "gif" ||
        fileExt == "jpeg"
      ) {
        Project.findByIdAndUpdate(
          projectId,
          { image: fileName },
          { new: true },
          (err, projectUpdated) => {
            if (err)
              return res
                .status(500)
                .send({ message: "La imagen no se ha subido" });
            if (!projectUpdated)
              return res
                .status(404)
                .send({ message: "El libro no existe para subir la imagen" });

            return res.status(200).send({
              project: projectUpdated,
            });
          }
        );
      } else {
        fs.unlink(filePath, (err) => {
          return res.status(200).send({ message: "Extension no valida" });
        });
      }
    } else {
      return res.status(200).send({
        message: fileName,
      });
    }
  },
};

module.exports = controller;
