import {Redirect, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

const Home = props => {
  const {history} = props

  const handleLogout = () => {
    localStorage.removeItem('jwt_token')
    Cookies.remove('jwt_token')
    // this.props.history.push('/ebank/login')
    this.props.history.replace('/ebank/login')
  }

  const isAuthenticated = !!localStorage.getItem('jwt_token')

  if (!isAuthenticated) {
    return (
      <div>
        <h1>Home</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
        />
        <h1>Your Flexibility, Our Excellence</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          alt="digital card"
        />
        {isAuthenticated ? (
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <p>Please log in to access this page.</p>
        )}
      </div>
    )
  }
  return <Redirect to="/ebank/login" />
}

export default withRouter(Home)
