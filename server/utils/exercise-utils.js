'use strict'

const publicExercises = [
    'hello-world',
    'add-one',
    'sum',
    'map',
    'parameters',
    'multiple-parameters'
]

function getExerciseData(exercise) {
    if (publicExercises[exercise]) {
        return require(`../exercises/${exercise}`)
    }

    console.error(`Error attempting to getExerciseData: ${exercise}`)
}

module.exports = {
    publicExercises,
    getExerciseData
}
