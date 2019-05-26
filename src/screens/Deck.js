import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';

import { actions as decksActions, selectors } from '../store/decks';

import Container from '../commons/container';
import styles from '../commons/styles';
import i18n from '../commons/i18n';

class Deck extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        const { deck } = navigation.state.params;
        return {
            title: deck
        };
    };

    static propTypes = {
        deck: PropTypes.object,
        removeDeck: PropTypes.func.isRequired
    };

    handleAddCard = () => {
        const { navigation, deck } = this.props;
        navigation.navigate('CardForm', { deck: deck.title });
    };

    handleStartQuiz = () => {
        const { navigation, deck } = this.props;
        navigation.navigate('Quiz', { deck: deck.title });
    };

    handleRemoveDeck = () => {
        const { navigation, deck } = this.props;
        this.props.removeDeck(deck);
        navigation.navigate('Main');
    };

    render() {
        const { deck } = this.props;

        return (
            <Container>
                {deck && (
                    <View style={styles.content}>
                        <Text style={styles.title}>{deck.title}</Text>
                        <Text style={styles.subtitle}>
                            {`${deck.questions.length} `}
                            {deck.questions.length > 1 ? i18n.t('label.cards') : i18n.t('label.card')}
                        </Text>
                        <View style={styles.contentActions}>
                            <Button
                                onPress={this.handleAddCard}
                                 title={i18n.t('button.addCard')}
                                buttonStyle={styles.button}
                            />
                            <Button
                                onPress={this.handleStartQuiz}
                                disabled={!deck.questions.length}
                                title={i18n.t('button.startQuiz')}
                                buttonStyle={styles.button}
                            />
                            <Button
                                onPress={this.handleRemoveDeck}
                                title={i18n.t('button.removeDeck')}
                                buttonStyle={styles.buttonDanger}
                            />
                        </View>
                    </View>
                )}
                {!deck && (
                    <View style={styles.content}>
                        <Text style={styles.title}>{i18n.t('msg.cardNotFound')}</Text>
                    </View>
                )}
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

const mapDispatchToProps = {
    removeDeck: decksActions.removeDeck
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Deck);
