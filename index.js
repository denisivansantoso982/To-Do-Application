/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import auth from '@react-native-firebase/auth';
import notifee from '@notifee/react-native';

const users = auth().currentUser;

if (users){
  messaging().setBackgroundMessageHandler(async message => {
    const channel = await notifee.createChannel({ id: 'default', name: 'default channel' });
    await notifee.displayNotification({
      title: message.notification.title,
      body: message.notification.body,
      android: { channelId: channel, smallIcon: 'ic_launcher_round', pressAction: {id: 'todo', launchActivity: 'com.todo_application.MainActivity'} }
    });
  });
}

AppRegistry.registerComponent(appName, () => App);
