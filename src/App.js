import React from 'react';
import './App.css';
import axios from 'axios';
import Home from './Home';
import CreateAccount from './CreateAccount';
//import Difficulty from './Difficulty';
//import Medium from'./Medium';
import Quizzes from './Quizzes';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// const databaseUrl = process.env.HEROKU_DB_URL || 'http://localhost:3000'
//const databaseUrl = 'https://project3-backend-test.herokuapp.com'
const databaseUrl = 'http://localhost:3000/api/instructors'
// insert address for api here

class App extends React.Component {
  

  render() {
    return (
      <Router>
        <nav class="nav">
          <Link to="/"> Homepage</Link>{"   "}
          <Link to="/createaccount"> Create Account </Link>{"   "}
          {/* <Link to="/Difficulty"> Choose the Difficulty</Link>{"   "} */}
          <Link to="/Quizzes"> Select Quizzes</Link>{"   "}
        </nav>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/CreateAccount" component={CreateAccount} />
          <Route path="/Quizzes" component={Quizzes} />
          {/* <Route path="/Difficulty" component={Difficulty} /> */}
          {/* <Route path="/Medium" component={Medium} /> */}
        </div>
      </Router>
    );
  }


//   componentDidMount() {
//     this.getUsers()
//   }

//   getUsers = () => {
//     axios({
//       url: `${databaseUrl}/api/users`,
//       // url: 'https://project3-backend-test.herokuapp.com/api/users',
//       method: 'get'
//     })
//       .then(users => {
//         console.log(users)
//         this.setState({ users })
//       })
//   }

//   render() {
//     console.log(this.state.users)
//     console.log("Rendered")
//     return (
//       <div className="App" >
//         <header className="App-header">
//           <h1>Teacher's Pet!</h1>
//         </header>
//       </div>
//     );
//   }
 }

 export default App;
