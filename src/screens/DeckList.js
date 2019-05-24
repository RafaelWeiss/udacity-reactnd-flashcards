import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { View, FlatList, TouchableOpacity } from 'react-native';
import { ListItem, Badge } from 'react-native-elements';

import { selectors as decksSelectors } from '../store/decks';

import styles from '../commons/styles';

function DeckList(props) {
    const { decks } = props;

    const handleClick = (deck) => {
        props.navigation.navigate('Deck', { deck: deck.title });
    };

    renderSeparator = () => {
        return <View style={styles.listSeparator} />;
    };

    renderItem = ({ item }) => {
        const deck = decks[item];

        return (
            <TouchableOpacity>
                <ListItem
                    onPress={() => handleClick(deck)}
                    title={deck.title}
                    rightIcon={<Badge value={deck.questions ? deck.questions.length : '0'} />}
                />
            </TouchableOpacity>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={Object.keys(decks)}
                renderItem={this.renderItem}
                keyExtractor={(item) => item}
                ItemSeparatorComponent={this.renderSeparator}
            />
        </View>
    );
}

DeckList.defaultProps = {
    decks: {}
};

DeckList.propTypes = {
    decks: PropTypes.object
};

function mapStateToProps(state) {
    return {
        decks: decksSelectors.getDecks(state)
    };
}

export default connect(mapStateToProps)(DeckList);
