const React = require('react')
const UserStore = require('../stores/user-store')
const UserActions = require('../actions/user-actions')
const page = require('page')
const ReactCSSTransitionGroup = require('react-addons-css-transition-group')

module.exports = React.createClass({
  getInitialState () {
    return {}
  },

  componentDidMount () {
    UserStore.listen(this.onChange)
  },

  onChange (state) {
    this.setState(state)
  },

  handleUsernameChange (event) {
    this.setState({username: event.target.value})
  },

  handlePasswordChange (event) {
    this.setState({password: event.target.value})
  },

  handlePasswordClick () {
    this.setState({passwordVisibile: !this.state.passwordVisibile})
  },

  handleSignInClick () {
    UserActions.awaitingResults({
      signInError: false,
      awaitingResults: true
    })

    UserActions.signIn({
      username: this.state.username,
      password: this.state.password
    })
  },

  render () {
    let passwordVisibile = this.state.passwordVisibile ? 'text' : 'password'
    let passwordVisibleText = this.state.passwordVisibile ? 'HIDE' : 'SHOW'
    let awaitingResults
    let signInError

    if (this.state.signInInfo && this.state.signInInfo.awaitingResults) {
      awaitingResults =
        <div className="button--sent">
          <span className="glyphicon glyphicon-refresh" aria-hidden="true"></span>
        </div>
    } else {
      awaitingResults = <div></div>
    }

    if (this.state.signInInfo && this.state.signInInfo.signInError) {
        signInError = <div className="register__input--alert">Username or Password incorrect.</div>
    } else signInError = null

    return (
      <div className="col-sm-12 register">
        <div className="center-block register__inner">
          <h2 className="text-center register__title">Sign In</h2>

          <div className="register__inputs center-block">
            <input type="text" value={this.state.value} onChange={this.handleUsernameChange} className="register__input register__input--username center-block" placeholder="username"></input>

            <div className="register__password-wrapper center-block">
              <input type={passwordVisibile} onChange={this.handlePasswordChange} className="register__input register__input--password" placeholder="password"></input>

              <div onClick={this.handlePasswordClick} className="register__password-visibility">{passwordVisibleText}</div>
            </div>
          </div>

          {signInError}

          <div style={{position: "relative"}}>
            <button className="register__button btn btn-block center-block"
                    onClick={this.handleSignInClick}
                    disabled={this.state.awaitingResults}>
              Sign In
            </button>

            <ReactCSSTransitionGroup
              transitionName="button-transition"
              transitionAppear={true}
              transitionAppearTimeout={500}
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}
            >
              {awaitingResults}
            </ReactCSSTransitionGroup>
          </div>
        </div>
      </div>)
  }
})
