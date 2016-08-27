const publicExercises = {
  "Hello World": "hello-world",
  "Add One": "add-one",
  "Multiple Parameters": "multiple-parameters",
  "Babby's First Reduce": "babbys-first-reduce",
  "Babby's First Map" : "babbys-first-map",
  "N Parameters" : "n-parameters",
}

function getExerciseFilename (exerciseTitle) {
  return publicExercises[exerciseTitle]
}

function getExerciseData (exercise) {
  let exerciseFilename = getExerciseFilename(exercise)
  if (exerciseFilename) {
    return require(`../exercises/${exerciseFilename}`)
  }

  console.error(`Error attempting to getExerciseData: ${exercise}`)
}

module.exports = {
  publicExercises,
  getExerciseData,
  getExerciseFilename
}
