import React from 'react';
import { StatusBar, ToastAndroid, YellowBox } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Splash from './screens/Splash';
import Login from './screens/Login';
import Register from './screens/Register';
import Landing from './screens/Landing';
import Detail from './screens/Detail';
import Task from './screens/Task';
import Profile from './screens/Profile';
import AddTask from './screens/AddTask';
import { Provider } from 'react-redux';
import store from './config/redux/store';
import auth from '@react-native-firebase/auth';

const Stack = createStackNavigator();

class App extends React.Component {
  constructor () {
    super();
    console.disableYellowBox = true;
    YellowBox.ignoreWarnings([
      'Non-serializable values were found in the navigation state'
    ]);
  }

  async componentDidMount() {
    const users = auth().currentUser;

    if (users) {
      const token = await messaging().getToken();
      console.log(token);
      await messaging().requestPermission()
        .then((token) => messaging().getToken())
        .then(token => console.log(token))
        .catch(error => console.log(error));

      messaging().onMessage(async remoteMessage => {
        console.log(remoteMessage);
        ToastAndroid.show('New task for you!', ToastAndroid.LONG);
      });

      messaging().onNotificationOpenedApp(async remoteMessage => {
        console.log('onNotificationOpenedApp() ' + JSON.stringify(remoteMessage));
      });

      messaging().getInitialNotification().then(async remoteMessage => {
        if (remoteMessage) {
          console.log('getInitialNotification() ' + JSON.stringify(remoteMessage));
        }
      });

      messaging().hasPermission().then(enabled => {
        if (enabled) {
          console.log('user has permission');
        } else {
          console.log('user has not permission');
          messaging().requestPermission().then(() => console.log('Permission granted')).catch(error => console.log(error));
        }
      })
    }
  }

  // sendMessage = async () => {
  //   try {
  //     const token = await messaging().getToken();
  //     console.log(token);

  //     let response = await fetch('https://fcm.googleapis.com/fcm/send', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': 'key=AAAAdh5gGg0:APA91bHPwRpqzF-EwBnXdAZCLOXTRFPHYbh5ATlVlVI4aDirpSgdjsEtgK9qr-XYO2if982N53PXroBYcMNH8uGX9gE19ApO468gXkxNPp4rE-N0f9ro7FOyFlKXZSbtLHRd62K-X7JA'
  //       },
  //       body: JSON.stringify({
  //         'registration_ids': [token],
  //         'notification': {
  //           'title': 'First send message',
  //           'body': 'hai',
  //           'vibrate': 1,
  //           'sound': 1,
  //           'show_in_foreground': true,
  //           'priority': 'high',
  //           'content_available': true
  //         },
  //         data: {},
  //         direct_boot_ok: true
  //       })
  //     });

  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <StatusBar hidden={true}/>
          <Stack.Navigator initialRouteName="splash" mode="modal">
            <Stack.Screen name="splash" component={Splash} options={{animationEnabled: true, headerShown: false}} />
            <Stack.Screen name="login" component={Login} options={{animationEnabled: true, headerShown: false}} />
            <Stack.Screen name="register" component={Register} options={{animationEnabled: true, headerShown: false}} />
            <Stack.Screen name="landing" component={Landing} options={{animationEnabled: true, headerShown: false}} />
            <Stack.Screen name="task" component={Task} options={{animationEnabled: true, headerShown: false}} />
            <Stack.Screen name="detail" component={Detail} options={{animationEnabled: true, headerShown: false}} />
            <Stack.Screen name="profile" component={Profile} options={{animationEnabled: true, headerShown: false}} />
            <Stack.Screen name="addTask" component={AddTask} options={{animationEnabled: true, headerShown: false}} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
};

export default App;
