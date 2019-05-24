import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

const NOTIFICATION_KEY = 'UdacityFlashCards:notifications';

function createNotification() {
    return {
        title: 'Flashcards Reminder',
        body: "Don't forget to answer the quiz today!",
        ios: {
            sound: true
        },
        android: {
            sound: true,
            vibrate: true,
            priority: 'high',
            sticky: false
        }
    };
}

function createTomorrowDate() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(20);
    tomorrow.setMinutes(0);
    return tomorrow;
}

export function createPushNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
                    if (status === 'granted') {
                        Notifications.cancelAllScheduledNotificationsAsync();

                        Notifications.scheduleLocalNotificationAsync(createNotification(), {
                            time: createTomorrowDate(),
                            repeat: 'day'
                        });

                        AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
                    }
                });
            }
        });
}

export function clearPushNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY).then(Notifications.cancelAllScheduledNotificationsAsync);
}
