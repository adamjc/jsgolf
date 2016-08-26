const React = require('react')
const page = require('page')

module.exports = React.createClass({
  handleClick () {
    page('/exercises/hello-world')
  },

  render () {
    return (
      <div>
        <div className="col-sm-12">
          <h2 className="text-center heading--home">Fewer characters = better score</h2>

          <button className="btn btn-block btn--green btn--home" onClick={ this.handleClick }>
            Have a go!
          </button>
        </div>
      </div>
    )
  }
})
