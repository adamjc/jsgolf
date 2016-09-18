const React = require('react')

module.exports = React.createClass({
  getInitialState() {
    return {}
  },

  handleRowClick (userAnswer) {
    alert(userAnswer)
  },

  render() {
    let scores = Object.keys(this.props.scores).map(a => {
      return (
        <tr key={a} className="exercise-table__row" onClick={this.handleRowClick.bind(this, this.props.scores[a].answer)}>
          <td>{a}</td>
          <td>{this.props.scores[a].characters}</td>
        </tr>
      )
    })

    return(
      <div className="col-sm-12">
        <h3 className="exercise-table__header text-center">High Scores</h3>
        <table className="exercise-table table table-hover">
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
