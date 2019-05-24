import { TabNavigator } from 'react-navigation';

import { primary, shadowGrey, blackColor } from '../styles/colors';

import DeckList from '../../screens/DeckList';
import DeckForm from '../../screens/DeckForm';
import i18n from '../i18n';

export default TabNavigator(
    {
        Decks: {
            screen: DeckList,
            navigationOptions: {
                title: i18n.t('button.flashcards')
            }
        },
        DeckForm: {
            screen: DeckForm,
            navigationOptions: {
                title: i18n.t('button.newDeck')
            }
        }
    },
    {
        tabBarOptions: {
            activeTintColor: primary,
            style: {
                height: 52,
                backgroundColor: blackColor,
                shadowColor: shadowGrey,
                shadowOffset: {
                    width: 0,
                    height: 3
                },
                shadowRadius: 6,
                shadowOpacity: 1
            }
        }
    }
);
