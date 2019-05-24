import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

import Navigator from './commons/navigation/Navigator';
import styles from './commons/styles';

export default function Main() {
    return (
        <SafeAreaView style={styles.safeAreaView}>
            <StatusBar />
            <Navigator />
        </SafeAreaView>
    );
}
