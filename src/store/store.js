import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducers';

const persistConfig = {
    key: 'udacityreactndflashcards:store',
    storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore() {
    const store = createStore(persistedReducer);
    const persistor = persistStore(store);

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const nextReducer = rootReducer;
            store.replaceReducer(nextReducer);
        });
    }

    return { store, persistor };
}
