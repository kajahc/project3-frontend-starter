import React from 'react';
import './App.css';
import axios from 'axios';
const serverUrl = "http://localhost:3000/api";


class Quizzes extends React.Component {
    constructor(){
        super()
        this.state = {
           questions: [],
           quizzes: []
           
        }
        this.getQuiz = this.getQuiz.bind(this);
        this.createQuiz = this.createQuiz.bind(this);
        this.createQuestion = this.createQuestion.bind(this);
    }
    
    getQuiz() {
        console.log('getting quiz')
        
        axios({
            url: 'https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple',
            method: 'get'
            
            
        })
        .then(quizzes => {
            console.log(quizzes.data.results)
            this.setState(
                { 
                  
                    question1_question: quizzes.data.results[0].question, 
                    question1_correct_answer: quizzes.data.results[0].correct_answer,
                    question1_incorrect_answer1: quizzes.data.results[0].incorrect_answers[0],
                    question1_incorrect_answer2: quizzes.data.results[0].incorrect_answers[1],
                    question1_incorrect_answer3: quizzes.data.results[0].incorrect_answers[2],
                    question1_category: quizzes.data.results[0].category,
                    question1_difficulty: quizzes.data.results[0].difficulty,
                    question2_question: quizzes.data.results[1].question, 
                    question2_correct_answer: quizzes.data.results[1].correct_answer,
                    question2_incorrect_answer1: quizzes.data.results[1].incorrect_answers[0],
                    question2_incorrect_answer2: quizzes.data.results[1].incorrect_answers[1],
                    question2_incorrect_answer3: quizzes.data.results[1].incorrect_answers[2],
                    question2_category: quizzes.data.results[1].category,
                    question2_difficulty: quizzes.data.results[1].difficulty,
                    question3_question: quizzes.data.results[2].question, 
                    question3_correct_answer: quizzes.data.results[2].correct_answer,
                    question3_incorrect_answer1: quizzes.data.results[2].incorrect_answers[0],
                    question3_incorrect_answer2: quizzes.data.results[2].incorrect_answers[1],
                    question3_incorrect_answer3: quizzes.data.results[2].incorrect_answers[2],
                    question3_category: quizzes.data.results[2].category,
                    question3_difficulty: quizzes.data.results[2].difficulty,


                }
            )
          })
    }


    onHandleChangeQuiz = e => {
        let newQuiz = {
          [e.target.name]: e.target.value
        }
    
        this.setState((prevState, currentState) => (
          { newQuiz: { ...prevState.newQuiz, ...newQuiz } }
        ))
      }

      createQuiz = e => {
        let instructorId = this.state.newQuiz.instructorId;
        let instructId = Number(instructorId);
        console.log('instructorId', instructId)
        e.preventDefault()
        axios({
          url: `${serverUrl}/quizzes`,
          method: 'post',
          data: { 
                    
                    newQuiz: {
                        instructorId: instructId,
                        category: this.state.question1_category,
                        difficulty: this.state.question1_difficulty
                    }
                    
                },
          category: this.state.question1_category,
          difficulty: this.state.question1_difficulty
        })
          .then(response => {
            this.setState(prevState => (
              {
                quizzes: [...prevState.quizzes, response.data.quiz]
              }
            ))
          })
      }

      onHandleChangeQuestion = e => {
        let newQuestion = {
          [e.target.name]: e.target.value
        }
    
        this.setState((prevState, currentState) => (
          { newQuestion: { ...prevState.newQuestion, ...newQuestion } }
        ))
      }

      // maybe run a loop for this for each question returned from the getQuiz call
      createQuestion = e => {
        let quizId = this.state.newQuestion.quizId;
        let quzId = Number(quizId)
        console.log('quizId', quzId)
        e.preventDefault()
        axios({
          url: `${serverUrl}/questions`,
          method: 'post',
          data: { 
                    newQuestion: {
                        quizId: quzId,
                        question: this.state.question1_question,
                        correct_answer: this.state.question1_correct_answer,
                        incorrect_answer1: this.state.question1_incorrect_answer1,
                        incorrect_answer2: this.state.question1_incorrect_answer2,
                        incorrect_answer3: this.state.question1_incorrect_answer3,
                    }
                    
                    
                }
        })
          .then(response => {
            this.setState(prevState => (
              {
                questions: [...prevState.questions, response.data.question]
              }
            ))
          })
      }
  

    render() {

        console.log(this.state.question)
        console.log(this.state.category)
        console.log(this.state.quizId)
                    
                    
                    
                    
                    
                   
        
        
        return (
            <div>
                
               

                <button onClick={this.getQuiz}>Get Quiz</button>

                
                <h1>Save Question</h1>
                <form onSubmit={this.createQuestion} onChange={e => this.onHandleChangeQuestion(e)}>
                        Quiz Id: <input type='text' name='quizId' />
                        
                    <input type='submit' value='Save Question' />
                </form>


                <h1>Save Quiz</h1>
                <form onSubmit={this.createQuiz} onChange={e => this.onHandleChangeQuiz(e)}>
                        Instructor Id: <input type='text' name='instructorId' />
                    <input type='submit' value='Save Quiz' />
                </form>
                
                {/* {/* <h1>&#169;Bizzell-Cunningham-Miles-Randall 2019</h1> */}
            </div>
        )
    }
}
export default Quizzes;






























