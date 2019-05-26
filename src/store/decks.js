import { createAction, handleActions } from 'redux-actions';
import { createType } from './reduxUtils';
import { initialState } from './initialState';

const STATE_KEY = 'decks';

const SAVE_DECK = createType(STATE_KEY, 'SAVE_DECK');
const REMOVE_DECK = createType(STATE_KEY, 'REMOVE_DECK');
const ADD_CARD_TO_DECK = createType(STATE_KEY, 'ADD_CARD_TO_DECK');

export const types = {
    SAVE_DECK,
    REMOVE_DECK,
    ADD_CARD_TO_DECK
};

const saveDeck = createAction(SAVE_DECK);
const removeDeck = createAction(REMOVE_DECK);
const addCardToDeck = createAction(ADD_CARD_TO_DECK);

export const actions = {
    saveDeck,
    removeDeck,
    addCardToDeck
};

export default handleActions(
    {
        [SAVE_DECK]: (state, action) => {
            return {
                ...state,
                [action.payload.title]: action.payload
            };
        },
        [REMOVE_DECK]: (state, action) => {
            delete state[action.payload.title]
            return {
                ...state
            };
        },
        [ADD_CARD_TO_DECK]: (state, action) => {
            const { title, card } = action.payload;
            return {
                ...state,
                [title]: {
                    ...state[title],
                    questions: [...state[title].questions, card]
                }
            };
        }
    },
    initialState
);

export const selectors = {
    getDecks: (state) => state.decks,
    getDeck: (state, title) => state.decks[title]
};
