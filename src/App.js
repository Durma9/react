import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Link, Route, Routes,} from 'react-router-dom'
import withNavigation from './comps/todo/WithNavigation';
import './bootstrap.css'
import AuthenticationService from './comps/todo/AuthenticationService.js';

 
class App extends Component {
  render() {
    const LoginComponentWithNavigation = withNavigation(LoginComponent);
    const WelcomeAdminComponentWithNavigation = withNavigation(WelcomeAdminComponent);
    const WelcomeComponentWithNavigation = withNavigation(WelcomeComponent);
    const WelcomeAgentComponentWithNavigation = withNavigation(WelcomeAgentComponent);
    const LogoutComponentWithNavigation = withNavigation(LogoutComponent);
    // const WelcomeComponentWithParams = withParams(WelcomeComponent);  WELCOME SA PARAMETRIMA
    return (
      <div className="App">
        <Router>
          <HeaderComponent/>
                    <Routes>
                        <Route path="/" element={<LoginComponentWithNavigation />} />
                        <Route path="/login" element={<LoginComponentWithNavigation />} />
                        <Route path="/welcome/admin" element={<WelcomeAdminComponentWithNavigation />} />
                        <Route path="/welcome/agent" element={<WelcomeAgentComponentWithNavigation />} />
                        <Route path="/welcome" element={<WelcomeComponentWithNavigation />} />
                        <Route path="/logout" element={<LogoutComponent />} />
                        {/* <Route path="/welcome/:name" element={<WelcomeComponentWithParams />} />   WELCOME SA PARAMETRIMA */}
                        <Route path="*" element={<ErrorComponent />} />
                    </Routes>
                    <FooterComponent/>        
                </Router>
      </div>
    );
  }
}

class HeaderComponent extends Component {
  render() {
    return (
      <header>
        <nav className= "navbar navbar-expand-md navbar-dark bg-dark">
          <div><a className="navbar-brand">Nesto ne znam sta</a></div>
          <ul className= "navbar-nav">
            <li><Link className="nav-link" to ="/welcome">Home</Link></li>
            <li><Link className="nav-link" to ="/login">Nesto</Link></li>
          </ul>
          <ul className= "navbar-nav navbar-collapse justify-content-end">
          <li><Link className="nav-link" to ="/login">Login</Link></li>
            <li><Link className="nav-link" to ="/logout">Logout</Link></li>
          </ul>

        </nav>
        
      </header>
    )
  }
}

class LogoutComponent extends Component {
  render() {
    return (
      <div>
        <h1> You are logged out</h1>
        <div className="container">
          Thank you for using our app
        </div>
      </div>
    )
  }
}

class FooterComponent extends Component {
  render() {
    return (
     <footer className="footer"> 
        <span className="text-muted">Neki futer nesto kao</span>
     </footer>
    )
  }
}

class WelcomeComponent extends Component {
  render() {
    
    return <h1>Welcome!</h1>
}
}
class WelcomeAdminComponent extends Component {
  render() {
    // return <div>Welcome {this.props.params.name}</div> WELCOME SA PARAMETRIMA 
    return <div>Welcome to our admin beautiful page </div>
  }
}
class WelcomeAgentComponent extends Component {
  render() {
    
    return <div>Welcome to our agent beautiful page </div>
  }
}

function ErrorComponent() {
    return <div>ERROR 404 WHAT IS THIS</div>
}

class LoginComponent extends Component {
      constructor(props) {
        super(props)
        this.state = {
            username: 'lazar',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }
        // this.handleUsernameChange = this.handleUsernameChange.bind(this)
        // this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
      }

      handleChange(event) {
        // console.log(event.target.name)
          this.setState(
            {
              [event.target.name]  
              :event.target.value
            }
          )     
      }
      // handlePasswordChange(event) {
      //   console.log(event.target.value)
      //   this.setState({password:event.target.value})
      // }

      loginClicked() {
        if(this.state.username==='admin'&& this.state.password==='admin'){
          // this.props.navigate('/welcome/${this.state.username}') WELCOME SA PARAMETRIMA
          this.props.navigate('/welcome/admin')
          AuthenticationService.SuccessfulLogin();
          this.setState({showSuccessMessage:true})
            this.setState({hasLoginFailed:false})
        }
          if(this.state.username==='agent'&& this.state.password==='agent') {
          this.props.navigate('/welcome/agent')
          this.setState({showSuccessMessage:true})
            this.setState({hasLoginFailed:false})
          }
        
            else {
              this.setState({showSuccessMessage:false})
              this.setState({hasLoginFailed:true})
            }
       }
 
    render() {
      return (
        <div>
        <h1>Login</h1>
        <div className="container"/>
          {/* <ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}/>
          <LoginSuccessful showSuccessMessage ={this.state.showSuccessMessage}/> */}
          {this.state.hasLoginFailed && <div className="alert alert-warning">Login failed</div>}
          {this.state.showSuccessMessage && <div>Login Successful</div>}
        User Name: <input type="text" name = "username" value={this.state.username} onChange={this.handleChange}/>
        Password: <input type="password" name = "password"value={this.state.password} onChange={this.handleChange}/>
        <button className = "btn" onClick={this.loginClicked}>Login</button>
        </div>
      )
    }

  }

  // function ShowInvalidCredentials(props) {
  //     if(props.hasLoginFailed){
  //       return <div>Login failed</div>
  //     }
  //     return null
  // }

  // function LoginSuccessful(props) {
  //   if (props.showSuccessMessage){
  //     return <div>Login Successful</div>
  //   }
  //   return null
  // }
export default App;