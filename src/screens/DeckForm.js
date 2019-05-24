import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';

/* STACK */
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Button, Input } from 'react-native-elements';

/* REDUX */
import { actions as decksActions } from '../store/decks';

/* SYSTEM */
import Container from '../commons/container';
import styles from '../commons/styles';
import i18n from '../commons/i18n';

class DeckForm extends PureComponent {
    static propTypes = {
        saveDeck: PropTypes.func.isRequired
    };

    state = {
        deckTitle: ''
    };

    handleChangeDeckTitle = (deckTitle) => {
        this.setState({ deckTitle });
    };

    handleSubmit = () => {
        const deck = {
            title: this.state.deckTitle,
            questions: []
        };
        this.props.saveDeck(deck);
        const resetAction = NavigationActions.reset({
            index: 1,
            actions: [
                NavigationActions.navigate({ routeName: 'Main' }),
                NavigationActions.navigate({ routeName: 'Deck', params: { deck: deck.title } })
            ]
        });
        this.props.navigation.dispatch(resetAction);
    };

    render() {
        const { deckTitle } = this.state;
        return (
            <Container>
                <View style={styles.content}>
                    <View style={styles.contentForm}>
                        <Text style={styles.title}>{i18n.t('msg.newDeck')}</Text>
                        <Input
                            value={deckTitle}
                            focus={true}
                            onChangeText={this.handleChangeDeckTitle}
                            placeholder={i18n.t('placeholder.name')}
                        />
                    </View>
                    <Button onPress={this.handleSubmit} disabled={!Boolean(deckTitle)} title={i18n.t('button.save')} />
                </View>
            </Container>
        );
    }
}

const mapDispatchToProps = {
    saveDeck: decksActions.saveDeck
};

export default connect(
    null,
    mapDispatchToProps
)(DeckForm);
