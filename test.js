const diseasesAndAnomalies = [
   {
      id_enfermedad: 1,
      name: 'Enfermedad1',
      descripcion: 'descricion11'
   },
   {
      id_enfermedad: 1,
      name: 'Enfermedad1',
      descripcion: 'descricion12'
   },
   {
      id_enfermedad: 1,
      name: 'Enfermedad1',
      descripcion: 'descricion13'
   },
   {
      id_enfermedad: 2,
      name: 'Enfermedad2',
      descripcion: 'descricion21'
   },
   {
      id_enfermedad: 2,
      name: 'Enfermedad2',
      descripcion: 'descricion22'
   }
]

const NewDiseasesAndAnomalies = []

diseasesAndAnomalies.forEach((diseaseOriginal) => {
   let index = -1
   if (NewDiseasesAndAnomalies.length > 0) {
      index = NewDiseasesAndAnomalies.findIndex((disease) => {
         return disease.id_enfermedad === diseaseOriginal.id_enfermedad
      })
   }

   if (index === -1) {
      NewDiseasesAndAnomalies.push({
         id_enfermedad: diseaseOriginal.id_enfermedad,
         name: diseaseOriginal.name,
         symptom: [diseaseOriginal.descripcion]
      })
   } else {
      NewDiseasesAndAnomalies[index].symptom.push(diseaseOriginal.descripcion)
   }
})
console.log(NewDiseasesAndAnomalies)
