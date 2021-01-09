import React, { Component } from 'react';
import {getCharacterBasedOnNumber} from "../utils/utils";

export default class QuizItem extends Component {
    render() {
        const {answer, index, correct, incorrect, selectAnswer} = this.props;

        let styleClass = "answer-item";
        let classProps;

        if (correct) {
            styleClass += " correct";
        } else if (incorrect) {
            styleClass += " incorrect";
        }

        if (selectAnswer) {
            classProps = {
                onClick: () => {
                    selectAnswer(answer.name)
                }
            }
        }

        return (
            <li className={styleClass} key={answer.name} {...classProps}
            >
                <h5>{getCharacterBasedOnNumber(index)}</h5>
                <p>{answer.name}</p>
                <div className="answer-item__icon answer-item__icon--correct">
                    <span className="material-icons">
                        check_circle_outline
                    </span>
                </div>
                <div className="answer-item__icon answer-item__icon--incorrect">
                    <span className="material-icons">
                        highlight_off
                    </span>
                </div>
            </li>
        )
    }
}
