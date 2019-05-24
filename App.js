import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './src/store/store';
import { createPushNotification } from './src/commons/notification/notification';

import Main from './src/Main';

const { persistor, store } = configureStore();

export default class App extends Component {
    componentDidMount() {
        createPushNotification();
    }

    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
                    <Main />
                </PersistGate>
            </Provider>
        );
    }
}
