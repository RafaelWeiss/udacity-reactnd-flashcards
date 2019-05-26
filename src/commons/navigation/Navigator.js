import { StackNavigator } from 'react-navigation';
import CardForm from '../../screens/CardForm';
import Quiz from '../../screens/Quiz';
import Deck from '../../screens/Deck';
import Tabs from './Tabs';
import i18n from '../i18n';

import { blackColor, whiteColor } from '../styles/colors';

export default StackNavigator(
    {
        Main: {
            screen: Tabs,
            navigationOptions: {
                headerLeft: null
            }
        },
        Deck: {
            screen: Deck
        },
        CardForm: {
            screen: CardForm,
            navigationOptions: {
                title: i18n.t('label.newCard')
            }
        },
        Quiz: {
            screen: Quiz,
            navigationOptions: {
                title: i18n.t('label.quiz')
            }
        }
    },
    {
        navigationOptions: {
            headerBackTitle: null,
            headerTintColor: blackColor,
            headerStyle: {
                backgroundColor: whiteColor
            }
        }
    }
);
