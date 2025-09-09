import { pool } from "../config/db.js";

export async function getCategorias() {
  const [resultSets] = await pool.query("CALL sp_s_obtenerCategorias();");
  const first = Array.isArray(resultSets)
    ? resultSets[0] ?? resultSets
    : resultSets;
  return first;
}

export async function createCategoria(nombreCategoria) {
  const conn = await pool.getConnection();
  try {
    const [resultSets] = await conn.query("CALL sp_i_guardarCategoria(?);", [
      nombreCategoria,
    ]);
    const first = Array.isArray(resultSets)
      ? resultSets[0] ?? resultSets
      : resultSets;
    const id = first?.[0]?.id ?? 0;
    return id;
  } catch (err) {
    console.log(err);
    return { Error: "Ocurrió un error al crear la categoría" };
  } finally {
    conn.release();
  }
}

export async function updateCategoria(idCategoria, nombre) {
  const conn = await pool.getConnection();

  try {
    const [resultSets] = await conn.query(
      "CALL sp_u_actualizarCategoria(?,?)",
      [idCategoria, nombre]
    );

    const first = Array.isArray(resultSets)
      ? resultSets[0] ?? resultSets
      : resultSets;

    const resultado = false;

    if (
      Array.isArray(first) &&
      first[0] &&
      Number(Object.values(first[0])[0]) === 1
    ) {
      resultado = true;
    }

    return resultado;
  } catch (err) {
    console.log("Ocurrio un errro al actualizar la informacion", err);
    return { Error: "Ocurrio un error al actualizar la categoria" };
  } finally {
    conn.release();
  }
}

export async function deleteCategoria(idCategoria) {
  const conn = await pool.getConnection();
  try {
    const [resultSets] = await conn.query("call sp_d_eliminarCategoria(?)", [
      idCategoria,
    ]);
    const first = Array.isArray(resultSets)
      ? resultSets[0] ?? resultSets
      : resultSets;
    const resultado =
      Array.isArray(first) &&
      first[0] &&
      Number(Object.values(first[0])[0]) === 1;
    return resultado;
  } catch (err) {
    console.log("Ocurrio un error al eliminar la categoria", err);
    return { Error: "Ocurrio un error al eliminar la categoria" };
  } finally {
    conn.release();
  }
}
