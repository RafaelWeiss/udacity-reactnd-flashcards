import { createAction, handleActions } from 'redux-actions';
import { createType } from './reduxUtils';
import { initialState } from './initialState';

const STATE_KEY = 'decks';

const ADD_CARD_TO_DECK = createType(STATE_KEY, 'ADD_CARD_TO_DECK');
const SAVE_DECK = createType(STATE_KEY, 'SAVE_DECK');

export const types = {
    ADD_CARD_TO_DECK,
    SAVE_DECK
};

const addCardToDeck = createAction(ADD_CARD_TO_DECK);
const saveDeck = createAction(SAVE_DECK);

export const actions = {
    saveDeck,
    addCardToDeck
};

export default handleActions(
    {
        [ADD_CARD_TO_DECK]: (state, action) => {
            const { title, card } = action.payload;
            return {
                ...state,
                [title]: {
                    ...state[title],
                    questions: [...state[title].questions, card]
                }
            };
        },
        [SAVE_DECK]: (state, action) => {
            return {
                ...state,
                [action.payload.title]: action.payload
            };
        }
    },
    initialState
);

export const selectors = {
    getDecks: (state) => state.decks,
    getDeck: (state, title) => state.decks[title]
};
