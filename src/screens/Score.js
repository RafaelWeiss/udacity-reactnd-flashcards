import React from 'react';
import PropTypes from 'prop-types';

import { View } from 'react-native';
import { Button, Text } from 'react-native-elements';

import Container from '../commons/container';
import styles from '../commons/styles';
import i18n from '../commons/i18n';
//

function Score({ score = 0, onRestart, onBack }) {
    return (
        <Container>
            <View style={styles.content}>
                <View style={styles.contentBody}>
                    <Text style={styles.title}>{`${i18n.t('label.youScoreIs')} ${score}%`}</Text>
                </View>
            </View>
            <View style={styles.buttonActions}>
                <Button onPress={onRestart} variant="secondary" title={i18n.t('button.restartQuiz')} buttonStyle={styles.button} />
                <Button onPress={onBack} title={i18n.t('button.backToDeck')} buttonStyle={styles.button} />
            </View>
        </Container>
    );
}

Score.propTypes = {
    score: PropTypes.number.isRequired,
    onRestart: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired
};

export default Score;
