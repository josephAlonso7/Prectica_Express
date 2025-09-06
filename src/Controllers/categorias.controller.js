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
