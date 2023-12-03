import React, { Component } from 'react';
import './Trivia.css';

class Trivia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      currentQuestionIndex: 0,
      score: 0,
      timer: 20,
      loading: true,
      answerChoices: [],
      firstQuestion: true
    };
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  fetchQuestions = () => {
    fetch('http://localhost:5000/api/questions')
      .then((response) => response.json())
      .then((data) => this.setState({ questions: data.results, loading: false }, this.startTimer))
      .catch((error) => console.log(error));
  };

  handleAnswerClick = (answer) => {
    const { questions, currentQuestionIndex, score, timer } = this.state;
    const currentQuestion = questions[currentQuestionIndex];
  
    const isCorrect = (decodeURIComponent(answer) === decodeURIComponent(currentQuestion.correct_answer));
    const newScore = isCorrect ? score + (timer * 10) : score;
  
    this.setState(
      {
        score: newScore,
      },
      () => {
        this.moveToNextQuestion();
      }
    );
  };

  startTimer = () => {
    this.timerInterval = setInterval(() => {
      const { timer } = this.state;
      if (timer > 0) {
        this.setState({ timer: timer - 1 });
      } else {
        this.moveToNextQuestion();
      }
    }, 1000);
  };

  resetTimer = () => {
    clearInterval(this.timerInterval);
    this.setState({ timer: 20 });
  };

  moveToNextQuestion = () => {
    this.resetTimer();
  
    this.setState((prevState) => {
      const { currentQuestionIndex, questions } = prevState;
      if (currentQuestionIndex < questions.length - 1) {
        return { currentQuestionIndex: currentQuestionIndex + 1 };
      } else {
        this.props.setPlayerScore(this.state.score);
        this.props.endTrivia();
        return null;
      }
    }, () => {
      this.startTimer();
      this.shuffleQuestions();
    });
  };

  shuffleQuestions = () => {
    const currentQuestion = this.state.questions[this.state.currentQuestionIndex];
    let shuffledNumbers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer].sort(function () {
      return Math.random() - 0.5;
    });
    this.setState({answerChoices: shuffledNumbers});
  }

  render() {
    const { questions, currentQuestionIndex, score, timer, loading } = this.state;
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if(this.state.firstQuestion) {
      this.shuffleQuestions();
      this.setState({firstQuestion : false});
    }
  
    const currentQuestion = questions[currentQuestionIndex];
  
    return (
      <div className="trivia-container">
        <h1 className="trivia-title">Question {currentQuestionIndex + 1}/20</h1>
        <div className="trivia-content">
          {currentQuestion ? (
            <>
              <p className="trivia-question">{decodeURIComponent(currentQuestion.question)}</p>
              <div className="trivia-answers">
                {this.state.answerChoices.map((answer, index) => (
                  <button key={index} onClick={() => this.handleAnswerClick(answer)} className="trivia-answer-button">
                    {decodeURIComponent(answer)}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <p>Loading question...</p>
          )}
        </div>
        <div className="trivia-score-time">
          <p>Time remaining: {timer}s</p>
          <p>Score: {score}</p>
        </div>
      </div>
    );
  }
  
  
}

export default Trivia;