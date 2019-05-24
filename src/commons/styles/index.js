'use strict';

import { StyleSheet } from 'react-native';
import { Constants } from 'expo';
import { backgroundColor , whiteColor} from '../styles/colors';

module.exports = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'column',
        paddingTop: Constants.statusBarHeight,
        padding: 10,
        backgroundColor: backgroundColor
    },
    contentBody: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'column'
    },
    contentForm: {
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection: 'column'
    },
    contentActions: {
        width: '100%',
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
        flexDirection: 'column'
    },
    title: {
        fontSize: 30,
        marginBottom: 20,
        fontWeight: '600',
        textAlign: 'center'
    },
    subtitle: {
        fontSize: 25,
        marginBottom: 20,
        fontWeight: '600',
        textAlign: 'center'
    },
    button: {
        marginTop: 20
    },
    displayFlex: {
        display: 'flex'
    },
    container: {
        flex: 1
    },
    listSeparator: {
        height: 1,
        width: '100%',
        backgroundColor: '#CED0CE'
    },
    safeAreaView: { 
        flex: 1, 
        backgroundColor: whiteColor 
    }
});
