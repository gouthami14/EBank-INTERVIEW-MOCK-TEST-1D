import {Component} from 'react'
import {Redirect, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

class Login extends Component {
  state = {
    userId: '',
    pin: '',
    errorMessage: '',
    isLoggedIn: false,
  }

  handleUserIdChange = event => {
    this.setState({userId: event.target.value})
  }

  handlePinChange = event => {
    this.setState({pin: event.target.value})
  }

  handleInputChange = event => {
    const {name, value} = event.target
    this.setState({[name]: value})
  }

  handleLogin = async event => {
    event.preventDefault()

    const {userId, pin} = this.state

    if (userId === '' || pin === '') {
      this.setState({
        errorMessage: 'Please enter both User ID and PIN.',
      })
      return
    }

    try {
      const response = await fetch('https://apis.ccbp.in/ebank/login', {
        user_id: userId,
        pin,
      })

      const jwtToken = response.data.jwt_token

      const expiryDays = 7
      Cookies.set('jwt_token', jwtToken, {expires: expiryDays})

      localStorage.setItem('jwt_token', jwtToken)

      this.setState({
        isLoggedIn: true,
      })
      this.history.replace('/')
    } catch (error) {
      this.setState({
        errorMessage: error.response.data.error_msg,
      })
    }
  }

  render() {
    const {userId, pin, errorMessage, isLoggedIn} = this.state

    if (isLoggedIn) {
      return <Redirect to="/" />
    }

    return (
      <div>
        <h1>Login</h1>
        <h1>Welcome Back</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
          alt="website login"
        />
        <form onSubmit={this.handleLogin}>
          <label htmlFor="userId">
            User ID:
            <input
              type="text"
              id="userId"
              value={userId}
              onChange={this.handleUserIdChange}
            />
          </label>
          <br />
          <label htmlFor="pin">
            PIN:
            <input
              type="password"
              id="pin"
              value={pin}
              onChange={this.handlePinChange}
            />
          </label>
          <br />
          <button type="submit">Login</button>
        </form>
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    )
  }
}

export default withRouter(Login)
