import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

import { selectors } from '../store/decks';

import { clearPushNotification } from '../commons/notification/notification';
import Container from '../commons/container';
import styles from '../commons/styles';
import i18n from '../commons/i18n';
import Score from './Score';

const initialState = {
    questionIndex: 0,
    showAnswer: false,
    corrects: 0,
    done: false
};

class Quiz extends Component {
    state = {
        ...initialState
    };

    handleShowAnswer = () => {
        this.setState((state) => ({
            showAnswer: true
        }));
    };

    updatedQuiz = (isCorrect) => {
        this.setState((state) => {
            const { questionIndex } = state;

            const newState = {
                showAnswer: false
            };

            newState.done = questionIndex === this.props.deck.questions.length - 1;
            newState.questionIndex =
                questionIndex < this.props.deck.questions.length - 1 ? questionIndex + 1 : questionIndex;

            isCorrect && (newState.corrects = ++state.corrects);
            newState.done && clearPushNotification();

            return newState;
        });
    };

    handleCorrect = () => {
        this.updatedQuiz(true);
    };

    handleIncorrect = () => {
        this.updatedQuiz(false);
    };

    handleRestartQuiz = () => {
        this.setState({
            ...initialState
        });
    };

    handleBackToDeck = () => {
        this.props.navigation.goBack();
    };

    render() {
        const { questionIndex, showAnswer, corrects, done } = this.state;
        const { deck } = this.props;

        const text = !showAnswer ? deck.questions[questionIndex].question : deck.questions[questionIndex].answer;

        return (
            <Container>
                <View style={styles.content}>
                    {!done ? (
                        <View style={styles.contentBody}>
                            <Text style={styles.title}>{`${questionIndex + 1}/${deck.questions.length}`}</Text>
                            <Text style={styles.subtitle}>{text}</Text>
                            {showAnswer ? (
                                <View style={styles.contentActions}>
                                    <Button
                                        onPress={this.handleCorrect}
                                        title={i18n.t('button.correct')}
                                        buttonStyle={styles.button}
                                    />
                                    <Button
                                        onPress={this.handleIncorrect}
                                        variant="secondary"
                                        title={i18n.t('button.incorrect')}
                                        buttonStyle={styles.buttonDanger}
                                    />
                                </View>
                            ) : (
                                <Button
                                    onPress={this.handleShowAnswer}
                                    variant="secondary"
                                    title={i18n.t('button.showAnswer')}
                                />
                            )}
                        </View>
                    ) : (
                        <Score
                            score={(corrects * 100) / deck.questions.length}
                            onRestart={this.handleRestartQuiz}
                            onBack={this.handleBackToDeck}
                        />
                    )}
                </View>
            </Container>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const { deck } = ownProps.navigation.state.params;

    return {
        deck: selectors.getDeck(state, deck)
    };
}

export default connect(mapStateToProps)(Quiz);
