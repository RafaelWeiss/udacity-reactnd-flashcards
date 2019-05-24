import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { View } from 'react-native';
import { Button, Input } from 'react-native-elements';

import { actions as decksActions, selectors } from '../store/decks';

import Container from '../commons/container';
import styles from '../commons/styles';
import i18n from '../commons/i18n';

class CardForm extends PureComponent {
    state = {
        question: '',
        answer: ''
    };

    static propTypes = {
        addCardToDeck: PropTypes.func.isRequired
    };

    handleSubmit = () => {
        const { navigation, addCardToDeck, deck } = this.props;
        addCardToDeck({
            title: deck.title,
            card: { ...this.state }
        });
        navigation.goBack();
    };

    handleChangeField(attribute) {
        return (value) => this.setState({ [attribute]: value });
    }

    renderField(label, attribute) {
        return (
            <View>
                <Input label={label} value={this.state[attribute]} onChangeText={this.handleChangeField(attribute)} />
            </View>
        );
    }

    render() {
        const { question, answer } = this.state;

        return (
            <Container>
                <View style={styles.content}>
                    <View style={styles.displayFlex}>
                        {this.renderField(i18n.t('label.question'), 'question')}
                        {this.renderField(i18n.t('label.answer'), 'answer')}
                    </View>
                    <Button onPress={this.handleSubmit} disabled={!question || !answer} title={i18n.t('button.save')} />
                </View>
            </Container>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        deck: selectors.getDeck(state, ownProps.navigation.state.params.deck)
    };
}

const mapDispatchToProps = {
    addCardToDeck: decksActions.addCardToDeck
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CardForm);
