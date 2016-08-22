const React = require('react')
const page = require('page')
const UserStore = require('./stores/user-store');

function navigate (url) {
    return () => {
        page(url)
    }
}

module.exports = React.createClass({
    getInitialState() {
        return UserStore.getState()
    },

    componentDidMount() {
        UserStore.listen(this.onChange)
    },

    componentWillUnmount() {
        ResultStore.unlisten(this.onChange)
    },

    onChange(data) {
        this.setState(data)
    },

    render() {
      let userSignedIn = localStorage.getItem('jwt')
      let accountControls

      if (userSignedIn === null) {
        accountControls =
          <div>
            <ul className="nav navbar-nav">
              <li><a onClick={navigate('/exercises')}>Exercises</a></li>
            </ul>

            <ul className="nav navbar-nav navbar-right">
              <li><a onClick={navigate('/sign-in')}>Sign In</a></li>
              <li><a onClick={navigate('/register')}>Register</a></li>
            </ul>
          </div>
      } else {
        accountControls =
          <div>
            <ul className="nav navbar-nav">
              <li><a onClick={navigate('/exercises')}>Exercises</a></li>
            </ul>

            <ul className="nav navbar-nav navbar-right">
              <li><a>Signed in as: {localStorage.getItem('username')}</a></li>
              <li><a onClick={navigate('/sign-out')}>Sign Out</a></li>
            </ul>
          </div>
      }

      return (
        <nav className="navbar navbar-inverse navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>

              <a className="navbar-brand" onClick={navigate('/')}><img src="/public/jsgolf-logo.png"></img></a>
            </div>

            <div className="collapse navbar-collapse" id="navbar">
              {accountControls}
            </div>
          </div>
        </nav>
      )
    }
})
