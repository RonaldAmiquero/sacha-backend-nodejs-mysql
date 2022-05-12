const { poolPromise } = require('../../store/mysql')
const TABLE_NAME1 = 'plantas'
const TABLE_NAME2 = 'imagenes'
async function getPlants() {
   try {
      const [rows] = await poolPromise.query(
         `SELECT p.id_planta,p.nombre,i.titulo,i.url FROM ${TABLE_NAME1} p INNER JOIN ${TABLE_NAME2} i WHERE p.id_planta = i.id_planta`
      )
      return rows
   } catch (error) {
      throw new Error(error)
   }
}

module.exports = { getPlants }
