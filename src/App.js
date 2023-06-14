import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import './App.css'

const colorList = ['yellow', 'green', 'orange', 'brown', 'blue']

class App extends Component {
  state = {
    isTrue: false,
    latestList: [],
    website: '',
    username: '',
    password: '',
    isShow: false,
  }

  listenWebsite = event => {
    this.setState({website: event.target.value})
  }

  usernameInput = event => {
    this.setState({username: event.target.value})
  }

  passwordInput = event => {
    this.setState({password: event.target.value})
  }

  onAddContent = event => {
    event.preventDefault()
    const {username, password, website} = this.state

    const initial = website.slice(0, 1).toUpperCase()

    const classVal = colorList[Math.floor(Math.random() * 5)]

    const newContent = {
      id: uuidv4(),
      initialValue: initial,
      websiteName: website,
      userName: username,
      Password: password,
      classAdd: classVal,
    }
    this.setState(prevState => ({
      latestList: [...prevState.latestList, newContent],
      website: '',
      username: '',
      password: '',
      isTrue: true,
      searchInput: '',
    }))
  }

  showPassword = event => {
    if (event.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  searchList = event => {
    this.setState({searchInput: event.target.value})
  }

  deleteCard = id => {
    const {latestList} = this.state
    const newList = latestList.filter(each => each.id !== id)
    const caseOf = newList.length !== 0
    this.setState({latestList: newList, isTrue: caseOf})
  }

  render() {
    const {
      website,
      username,
      password,
      latestList,
      isShow,
      searchInput,
    } = this.state

    let {isTrue} = this.state
    const newList = latestList.filter(each =>
      each.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )
    if (newList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }
    return (
      <div className="app-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="inner-card-1">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="image"
          />
          <form className="form-container" onSubmit={this.onAddContent}>
            <h1 className="heading">Add New Password</h1>
            <div className="input-con">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="logo"
              />
              <input
                type="text"
                className="input-el"
                placeholder="Enter Website"
                onChange={this.listenWebsite}
                value={website}
              />
            </div>

            <div className="input-con">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="logo"
              />
              <input
                type="text"
                className="input-el"
                placeholder="Enter Username"
                onChange={this.usernameInput}
                value={username}
              />
            </div>
            <div className="input-con">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="logo"
              />
              <input
                type="password"
                className="input-el"
                placeholder="Enter Password"
                onChange={this.passwordInput}
                value={password}
              />
            </div>
            <button className="add-btn" type="submit">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="large-image"
          />
        </div>
        <div className="inner-container-2">
          <div className="first-con">
            <div className="password-con">
              <h1 className="password-heading">Your Passwords</h1>
              <p className="length">{newList.length}</p>
            </div>
            <div className="search-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-logo"
              />
              <input
                type="search"
                className="input-search"
                placeholder="Search"
                onChange={this.searchList}
                value={searchInput}
              />
            </div>
          </div>
          <hr className="line" />
          <div className="show-password-container">
            <input
              type="checkbox"
              className="checkbox"
              id="check"
              onChange={this.showPassword}
            />
            <label htmlFor="check" className="show-pass">
              Show Passwords
            </label>
          </div>
          {!isTrue && (
            <div className="empty-con">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                className="empty-image"
                alt="no passwords"
              />
              <p className="no-passwords">No Passwords</p>
            </div>
          )}
          {isTrue && (
            <ul className="list-con">
              {newList.map(each => (
                <li className="list-item" id={each.id} key={each.id}>
                  <p className={`initial ${each.classAdd}`}>
                    {each.initialValue}
                  </p>
                  <div className="list-content">
                    <p className="website">{each.websiteName}</p>
                    <p className="website">{each.userName}</p>
                    {!isShow && (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        alt="stars"
                        className="stars-image"
                      />
                    )}
                    {isShow && <p className="website">{each.Password}</p>}
                  </div>
                  <button
                    type="button"
                    className="del-btn"
                    onClick={() => this.deleteCard(each.id)}
                    data-testid="delete"
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      alt="delete"
                      className="del-image"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
