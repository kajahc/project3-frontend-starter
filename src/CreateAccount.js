// need to run the following command from the frontend terminal :  npm install react-bootstrap bootstrap
// also need the following line in app.js or index.js:  import 'bootstrap/dist/css/bootstrap.min.css';
// these 3 lines are for the accordian:   the rest of the code is in the render

import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import Quizzes from "./Quizzes";
import Instructor from "./Instructor";
import React, { Component } from "react";
import "./App.css";
import axios from "axios";
// const serverUrl = "http://localhost:3000/api";
const herokuBackendUrl = 'https://backend-teachers-pet-app.herokuapp.com/api'
const serverUrl = process.env.NODE_ENV === 'production' ? herokuBackendUrl : 'http://localhost:3000/api'

class CreateAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      instructor: "",
      quizzes: [],
      questions: [],
      id: "",
      newInstructor: {},
      instructors: [],
      updateInstructor: {}
    };
    this.createInstructor = this.createInstructor.bind(this);
  }
  

  onHandleChange = e => {
    let newInstructor = {
      [e.target.name]: e.target.value
    };

    this.setState((prevState, currentState) => ({
      newInstructor: { ...prevState.newInstructor, ...newInstructor }
    }));
  };

  createInstructor = e => {
    e.preventDefault();
    axios({
      url: `${serverUrl}/instructors`,
      method: "post",
      data: { newInstructor: this.state.newInstructor }
    }).then(response => {
      this.props.props.history.push({
        pathname: '/Quizzes',
        props: { 
            instructor: response.data.instructor,
            quizzes: response.data.instructor.quizzes 
        }
    })
    });
  };
  render() {
    return (
      <div>
        <h1>Create Instructor</h1>
        <form
          onSubmit={this.createInstructor}
          onChange={e => this.onHandleChange(e)}
        >
          Name: <input type="text" name="name" />
          Subject: <input type="text" name="subject" />
          Grade Level: <input type="text" name="grade_level" />
          <input type="submit" value="New Instructor" />
        </form>
      </div>
    );
  }
}

export default CreateAccount;
