import React, { Component } from 'react';
import {generateQuestions, getCharacterBasedOnNumber} from "../utils/utils";
import logo from "../img/undraw_adventure_4hum 1.svg";
import result from "../img/undraw_winners_ao2o 2.svg";
import QuizItem from "../components/QuizItem";

class Home extends Component {

    state = {
        currentQuizIndex: 0,
        isEnded: false,
        quizzes: [],
        score: 0,
        selected: ""
    }

    async componentDidMount() {
        const quizzes = await generateQuestions(10);
        console.log(quizzes);
        this.setState({
            quizzes
        })
    }

    selectAnswer = (answerString) => {
        const {quizzes, currentQuizIndex, score} = this.state;
        const quiz = quizzes[currentQuizIndex];

        if (quiz.correctAnswer === answerString) {
            this.setState({
                score: score + 1,
                selected: answerString
            })
        } else {
            this.setState({
                selected: answerString
            })
        }
    }

    goToNextQuestion = () => {
        const {currentQuizIndex, quizzes} = this.state;
        if (currentQuizIndex < quizzes.length - 1) {
            this.setState({
                currentQuizIndex: currentQuizIndex + 1,
                selected: ""
            })
        } else {
            this.setState({
                isEnded: true
            })
        }
    }

    renderAnswersList = (answers) => {
        const {quizzes, currentQuizIndex, selected} = this.state;
        const quiz = quizzes[currentQuizIndex];
        const {selectAnswer} = this;

        if (selected) {
            return answers.map((answer, index) => {
                if (answer.name === quiz.correctAnswer) {
                    return (
                        <QuizItem answer={answer} index={index} correct/>
                    )
                }
                
                if (selected === answer.name && selected != quiz.correctAnswer) {
                    return (
                        <QuizItem answer={answer} index={index} incorrect/>
                    )
                }

                return (
                    <QuizItem answer={answer} index={index}/>
                )
            })
        }

        return answers.map((answer, index) => {
            return (
                <QuizItem answer={answer} index={index} selectAnswer={selectAnswer}/>
            )
        })
    }

    renderCurrentQuestionBox = () => {
        const {goToNextQuestion, renderAnswersList} = this;
        const {currentQuizIndex, quizzes, selected} = this.state;
        const currentQuiz = quizzes[currentQuizIndex];

        if (!currentQuiz) {
            return <></>
        }

        const {question, answers, type, flagURL} = currentQuiz;

        let nextButton = <></>;

        if (selected) {
            nextButton = (
                <button onClick={goToNextQuestion} className="btn btn-primary">Next</button>
            )
        }

        if (type === "capital") {
            return (
                <>
                    <h4 className="question-string">{question}</h4>
                    <ul>
                        {renderAnswersList(answers)}
                    </ul>
                    <div className="question-box__footer">
                        {nextButton}
                    </div>
                </>
            )
        }

        if (type === "flag") {
            return (
                <>
                    <img src={flagURL} alt={"Flag"}  className="img-fluid flag-image"/>
                    <h4 className="question-string">{question}</h4>
                    <ul>
                        {renderAnswersList(answers)}
                    </ul>
                    <div className="question-box__footer">
                        {nextButton}
                    </div>
                </>
            )
        }

    }

    render() {
        const {renderCurrentQuestionBox} = this;
        const {isEnded, score} = this.state;

        if (isEnded) {
            return (
                <div id="question-box">
                    <h1 className="title">COUNTRY QUIZ</h1>
                    <div className="result-image-container">
                        <img src={result} alt="Winner" className="img-fluid result"/>
                    </div>
                    <div className='result-container'>
                        <h2>Results</h2>
                        <p>You got <span>{score}</span> correct answers</p>
                        <button className="btn btn-outline-blue" onClick={(e) => {
                            window.location.reload()
                        }}>Try again</button>
                    </div>
                </div>
            )
        }

        return (
            <div id="question-box">
                <h1 className="title">COUNTRY QUIZ</h1>
                <div className="logo-container">
                    <img src={logo} alt="Logo" className="img-fluid logo"/>
                </div>
                {renderCurrentQuestionBox()}
            </div>
        )
    }
}

export default Home;
