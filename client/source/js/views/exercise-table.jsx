const React = require('react')

module.exports = React.createClass({
  getInitialState() {
    return {}
  },

  render() {
    let scores = Object.keys(this.props.scores).map(a => {
      return <div>{a} : {this.props.scores[a]}</div>
    })

    return(
      <div className="col-sm-12">
        Woo this is a high scores table

        {scores}
      </div>
    )
  }
})
