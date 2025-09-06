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
