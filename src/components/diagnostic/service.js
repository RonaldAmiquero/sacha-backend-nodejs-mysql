const { poolPromise } = require('../../store/mysql')

async function getDiseaseAndAnomalies(id) {
   try {
      const [rows] = await poolPromise.query(
         `SELECT en.id_enfermedad, en.nombre,anom.descripcion FROM plantas p INNER JOIN enfermedades en INNER JOIN enfermedades_anomalias enanom INNER JOIN anomalias anom WHERE en.id_planta = p.id_planta AND enanom.id_enfermedad = en.id_enfermedad AND enanom.id_anomalia = anom.id_anomalia AND p.id_planta = ${id}`
      )
      return rows
   } catch (err) {
      throw new Error(err)
   }
}
async function formatDiseaseAndAnomalies(idPlanta) {
   const diseasesAndAnomalies = await getDiseaseAndAnomalies(idPlanta)

   const newDiseasesAndAnomalies = []

   diseasesAndAnomalies.forEach((diseaseOriginal) => {
      let index = -1
      if (newDiseasesAndAnomalies.length > 0) {
         index = newDiseasesAndAnomalies.findIndex((disease) => {
            return disease.id_enfermedad === diseaseOriginal.id_enfermedad
         })
      }

      if (index === -1) {
         newDiseasesAndAnomalies.push({
            id_enfermedad: diseaseOriginal.id_enfermedad,
            name: diseaseOriginal.nombre,
            symptom: [diseaseOriginal.descripcion]
         })
      } else {
         newDiseasesAndAnomalies[index].symptom.push(diseaseOriginal.descripcion)
      }
   })
   return newDiseasesAndAnomalies
}

function match(hechos, symptoms) {
   let countMatch = 0
   let nroSymptoms = symptoms.length
   hechos.forEach((hecho) => {
      symptoms.forEach((symptom) => {
         if (symptom === hecho) {
            countMatch++
         }
      })
   })

   let probability
   if (countMatch === 0) {
      return (probability = 0)
   }

   probability = (countMatch / nroSymptoms) * 100

   return probability.toFixed(2)
}

async function getDisease(idPlanta, hechos) {
   const diseases = await formatDiseaseAndAnomalies(idPlanta)
   let resultdiseases = []
   hechos.sort()

   for (const disease in diseases) {
      diseases[disease].symptom.sort()
      let probability = match(hechos, diseases[disease].symptom)
      if (probability > 0) {
         resultdiseases.push({
            id_disease: diseases[disease].id_enfermedad,
            name: diseases[disease].name,
            probability: probability
         })
      }
   }

   const resultDiseasesSorted = resultdiseases.sort((a, b) => {
      return b.probability - a.probability
   })

   return resultDiseasesSorted
}
async function getQuestions(id) {
   try {
      const [rows] = await poolPromise.query(
         `SELECT pre.id_pregunta,pre.titulo FROM plantas p INNER JOIN plantas_preguntas ppre INNER JOIN preguntas pre WHERE ppre.id_planta = p.id_planta AND ppre.id_pregunta = pre.id_pregunta AND p.id_planta = ${id}`
      )
      return rows
   } catch (err) {
      throw new Error(err)
   }
}

async function getAnomalies(id) {
   try {
      const [rows] = await poolPromise.query(
         `SELECT DISTINCT(anom.id_anomalia),anom.descripcion,anom.id_pregunta FROM plantas p INNER JOIN enfermedades en INNER JOIN enfermedades_anomalias enanom INNER JOIN anomalias anom WHERE en.id_planta = p.id_planta AND enanom.id_enfermedad = en.id_enfermedad AND enanom.id_anomalia = anom.id_anomalia AND p.id_planta = ${id}`
      )
      return rows
   } catch (err) {
      throw new Error(err)
   }
}

function formatQuestionsAndAnomalies(questions, anomalies) {
   questions.forEach((question) => {
      question.anomalias = []
      anomalies.forEach((anomaly) => {
         if (question.id_pregunta === anomaly.id_pregunta) {
            question.anomalias.push(anomaly.descripcion)
         }
      })
   })
   return questions
}

async function getQuestionsAnomalies(id) {
   const questions = await getQuestions(id)
   const anomalies = await getAnomalies(id)
   const rta = formatQuestionsAndAnomalies(questions, anomalies)
   return rta
}

module.exports = { getDisease, getQuestionsAnomalies }
