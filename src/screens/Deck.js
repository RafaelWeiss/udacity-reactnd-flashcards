import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';

import { selectors } from '../store/decks';

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
        deck: PropTypes.object
    };

    handleAddCard = () => {
        const { navigation, deck } = this.props;
        navigation.navigate('CardForm', { deck: deck.title });
    };

    handleStartQuiz = () => {
        const { navigation, deck } = this.props;
        navigation.navigate('Quiz', { deck: deck.title });
    };

    render() {
        const { deck } = this.props;

        return (
            <Container>
                {deck && (
                    <View style={styles.content}>
                        <Text style={styles.title}>{deck.title}</Text>
                        <Text style={styles.subtitle}>{`${deck.questions.length} `}{deck.questions.length > 1 ? i18n.t('label.cards') : i18n.t('label.card')}</Text>
                        <View style={styles.contentActions}>
                            <Button
                                onPress={this.handleAddCard}
                                variant="secondary"
                                title={i18n.t('button.addCard')}
                                buttonStyle={styles.button}
                            />
                            <Button
                                onPress={this.handleStartQuiz}
                                disabled={!deck.questions.length}
                                title={i18n.t('button.startQuiz')}
                                buttonStyle={styles.button}
                            />
                        </View>
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

export default connect(mapStateToProps)(Deck);
