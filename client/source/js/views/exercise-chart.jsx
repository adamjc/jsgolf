'use strict'

const React = require('react')
const Chart = require('react-chartjs')
const BarChart = Chart.Bar
const R = require('ramda')

module.exports = React.createClass({
    getInitialState() {
        return {}
    },

    render() {
        let chartData = this.props.chartData.chars

        let data = {
            labels: Object.keys(chartData),
            datasets: [{
                label: "Poopy Pie",
                fillColor: "rgba(123, 203, 255, 0.8)",
                strokeColor: "rgba(123, 203, 255,1)",
                data: R.values(chartData)
            }]
        }

        let options = { responsive: true }

        return(
            <div>
                <BarChart className="exercise-chart" options={options} data={data} height="450px"/>
            </div>
        )
    }
})