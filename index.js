/**
 * @format
 */

import {AppRegistry, ToastAndroid} from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import auth from '@react-native-firebase/auth';
import notifee from '@notifee/react-native';

const users = auth().currentUser;

if (users){
  messaging().setBackgroundMessageHandler(async message => {
    try {
      const notification = message.notification;
      ToastAndroid.show('New Task!', ToastAndroid.LONG);
      const channel = await notifee.createChannel({ id: 'default', name: 'default channel' });
      await notifee.displayNotification({
        title: notification.title,
        body: notification.body,
        android: {
          channelId: channel,
          sound: notification.android.sound,
          smallIcon: 'ic_launcher_round',
          pressAction: { id: 'todo', launchActivity: 'com.todo_application.MainActivity' }
        }
      });
    } catch (error) {
      console.log(error.code, error.message);
      ToastAndroid.show(error.message, ToastAndroid.LONG);
    }
  });
}

AppRegistry.registerComponent(appName, () => App);
