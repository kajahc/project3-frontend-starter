import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import React, { Component } from "react";
import "./App.css";
import axios from "axios";
const serverUrl = "http://localhost:3000/api";
//test
class Home2 extends React.Component {
    state = {
        instructor: "",
        quizzes: [],
        questions: [],
        id: ""
    };
    handleChange = e => {
        let id = parseInt(e.target.value);
        this.setState({ id });
    };
    getInstructors = e => {
        e.preventDefault();
        let id = this.state.id;
        axios({
            url: `${serverUrl}/instructors/${id}`,
            method: "get"
        }).then(response => {
            this.setState({
                instructor: response.data.instructor,
                quizzes: response.data.instructor.quizzes
            });
            console.log(response.data);
            // console.log(response.data.instructor.quizzes)
            // console.log('quizzes', this.state.quizzes)
        });
    };
    getQuestions = e => {
        e.preventDefault();
        let id = this.state.id;
        axios({
            url: `${serverUrl}/questions/`,
            method: "get"
        }).then(response => {
            this.setState({
                questions: response.data.questions
            });
            console.log(response.data.questions);
            // console.log(response.data.instructor.quizzes)
            // console.log('quizzes', this.state.quizzes)
        });
    };
    getQuizzes = e => {
        e.preventDefault();
        let id = this.state.id;
        axios({
            url: `${serverUrl}/quizzes/${id}`,
            method: "get"
        }).then(response => {
            this.setState({
                quizzes: response.data.question.questions
            });
            console.log(response.data.question.questions);
            // console.log(response.data.instructor.quizzes)
            // console.log('quizzes', this.state.quizzes)
        });
    };
    render() {
        if (this.state.instructor) {
            console.log(this.state.instructor);
            var renderInstructor = `
                            Name: ${this.state.instructor.name} -- Grade: ${this.state.instructor.grade_level} -- Subject: ${this.state.instructor.subject}
                        `;
        }
        if (this.state.quizzes) {
            console.log(this.state.quizzes);
            var renderQuizzes = this.state.quizzes.map((quiz, index) => {
                return (
                    <div key={index}>
                        <Accordion defaultActiveKey="1">
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                        Click for Question
                  </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        {" "}
                                        <ul>
                                            <li>Question: {quiz.question}</li>
                                            <li>Correct Answer: {quiz.correct_answer}</li>
                                            <li>Incorrect Answer 1: {quiz.incorrect_answer1}</li>
                                            <li>Incorrect Answer 2: {quiz.incorrect_answer2}</li>
                                            <li>Incorrect Answer 3: {quiz.incorrect_answer3}</li>
                                        </ul>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </div>
                );
            });
        }
        return (
            <React.Fragment>
                <div>
                    <h1>Teacher's Pet</h1>
                    <h1>Sign-In</h1>
                    <form
                        onSubmit={this.getInstructors}
                        onChange={e => this.handleChange(e)}
                    >
                        Instructor Id: <input type="text" name="id" />
                        <input type="submit" value="Sign-In" />
                    </form>
                    <div>{renderInstructor}</div>
                    <div>
                        <form
                            onSubmit={this.getQuizzes}
                            onChange={e => this.handleChange(e)}
                        >
                            Quiz Id: <input type="text" name="id" />
                            <input type="submit" value="Get Quizzes" />
                        </form>
                    </div>
                    <div>
                        {/* <Accordion defaultActiveKey="0">
                        <Card>
                            <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                Click for Quiz
                            </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                            <Card.Body> {renderQuizzes}</Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion> */}
                        {renderQuizzes}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default Home2;