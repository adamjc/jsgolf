const React = require('react')

module.exports = React.createClass({
  getInitialState() {
    return {}
  },

  render() {
    let scores = Object.keys(this.props.scores).map(a => {
      return (
        <tr key={a}>
          <td>{a}</td>
          <td>{this.props.scores[a]}</td>
        </tr>
      )
    })

    return(
      <div className="col-sm-12">
        <h3 className="exercise-table__header text-center">High Scores</h3>
        <table className="exercise-table table table-striped">
          <thead>
            <tr>
              <td><strong>Username</strong></td>
              <td><strong>Score</strong></td>
            </tr>
          </thead>
          <tbody>{scores}</tbody>
        </table>
      </div>
    )
  }
})
