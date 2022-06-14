const { poolPromise } = require('../../store/mysql')

async function getDisease(id) {
   try {
      const [rows] = await poolPromise.query(
         `SELECT id_enfermedad,nombre,descripcion,mas_info_url FROM enfermedades WHERE id_enfermedad = ${id}`
      )
      return rows[0]
   } catch (err) {
      throw new Error(err)
   }
}

async function getDiseaseSolution(id) {
   try {
      const [rows] = await poolPromise.query(
         `SELECT s.id_solucion, s.titulo ,s.descripcion FROM enfermedades e JOIN enfermedades_soluciones es JOIN soluciones s WHERE  e.id_enfermedad = es.id_enfermedad AND s.id_solucion = es.id_solucion AND e.id_enfermedad = ${id}`
      )
      const newPreventions = []
      rows.map(({ id_solucion, titulo, descripcion }) => {
         const newDescription = descripcion.split('. ')
         newPreventions.push({
            id_solucion,
            titulo,
            descripcion: newDescription
         })
      })
      return newPreventions
   } catch (err) {
      throw new Error(err)
   }
}

async function getDiseaseImages(id) {
   try {
      const [rows] = await poolPromise.query(
         `SELECT id_imagen,titulo,url FROM imagenes WHERE id_enfermedad = ${id}`
      )
      return rows
   } catch (err) {
      throw new Error(err)
   }
}

async function getSolution(idDesease) {
   const desease = await getDisease(idDesease)
   const preventions = await getDiseaseSolution(idDesease)
   const images = await getDiseaseImages(idDesease)
   desease.preventions = preventions
   desease.images = images
   return desease
}
module.exports = { getSolution }
