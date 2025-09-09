import {
  getCategorias,
  createCategoria,
  updateCategoria,
  deleteCategoria,
} from "../models/categorias.model";

//Get api/categorias
export const listarCategorias = async (req, res) => {
  try {
    const data = await getCategorias();
    res.status(200).json(data);
  } catch (err) {
    console.err("Ocurrio un error", err);
    res.status(500).json({ err: "Error al listar las categorias" });
  }
};

//POST api/categorias
export const crearCateoria = async (req, res) => {
  try {
    const { nombre } = req.body;
    if (nombre === "" || nombre === undefined || nombre === null) {
      return res
        .status(400)
        .json({ error: "El nombre de la categoria es necesario." });
    }

    const id = await createCategoria(nombre);
    if (id != 1) {
      return res.status(500).json(id);
    }

    res.status(201).json({ id, nombre });
  } catch (err) {
    console.error("Error al crear categoria", err);
    res.status(500).json({ error: "Ocurrio un error al crear la categoria." });
  }
};

// put api/categoria/:id
export const actualizarCategoria = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { nombre } = req.body;

    if (!Numero.isInteger(id) || id <= 0) {
      return res.status(400).json({ error: "Id invalido" });
    }

    if (nombre === undefined || nombre === null || nombre === "") {
      return res.status(400).json({ error: "Nombre es requerido" });
    }

    await updateCategoria(id, nombre.trim());
    return res.status(200).json({ updated: true });
  } catch (err) {
    console.error("Error al actualizar la categoria", err);
    return res
      .status(500)
      .json({ error: "Ocurrio un error al actualizar la categoría " });
  }
};

// delete api/categoria/:id
export const eliminarCategoria = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Numero.isInteger(id) || id <= 0) {
      return res.status(400).json({ error: "Id invalido" });
    }

    await deleteCategoria(id);
    return res.status(200).json({ deleted: true });
  } catch (err) {
    console.log("Error en eliminar categoria", err);
    return res
      .status(500)
      .json({ error: "Ocurrio un error al eliminar la categoria." });
  }
};
