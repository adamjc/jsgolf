'use strict'

const publicExercises = {
    'Hello World': 'hello-world',
    'Add One': 'add-one',
    'Sum': 'sum',
    'Map': 'map',
    'Multiple Parameters': 'multiple-parameters'
}

function getExerciseData(exercise) {
    let exerciseFilename = publicExercises[exercise]
    if (exerciseFilename) {
        return require(`../exercises/${exerciseFilename}`)
    }

    console.error(`Error attempting to getExerciseData: ${exercise}`)
}

module.exports = {
    publicExercises,
    getExerciseData
}
