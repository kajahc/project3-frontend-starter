import React from 'react';
import './App.css';
import axios from "axios";
// const serverUrl = "http://localhost:3000/api";
const herokuBackendUrl = 'https://backend-teachers-pet-app.herokuapp.com/api'
const serverUrl = process.env.NODE_ENV === 'production' ? herokuBackendUrl : 'http://localhost:3000/api'

class Instructor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deleted:false,
            instructor: this.props.instructor
          }  
        // This binding is necessary to make `this` work in the callback
        this.deleteInstructor = this.deleteInstructor.bind(this);
      }
 
  deleteInstructor (){
      console.log('deleteInstructor')
      console.log(this.state.instructor)
    axios({
        url: `${serverUrl}/instructors/${this.state.instructor.id}`,
        method: 'delete'
      })
        .then(response => {
          this.setState({ instructors: response.data.instructors })
          this.setState({deleted:true})
        })
  }
  render() {
    // console.log(this.state.quizzes)
    // console.log("quizme")
    console.log(this.state.deleted)
    if(this.state.deleted){
        return (
            <div>
              <h1>Instructor Deleted</h1>
            </div>
          );
    }else{
        return (
            <div>
              <h1>Instructor</h1>
              Name: {this.props.instructor.name} -- Grade: {this.props.instructor.grade_level} -- Subject: {this.props.instructor.subject}
              <button onClick={this.deleteInstructor}>Delete</button>
            </div>
          );
    }
    
  }
}
export default Instructor;