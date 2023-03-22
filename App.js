import React, { useEffect } from 'react';
import { View, Text, Alert, Button } from 'react-native'
import messaging from '@react-native-firebase/messaging';
import sendSingleDeviceNotification from './NotificationService'


const App = () => {

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }


  useEffect(() => {
    if (requestUserPermission()) {
      messaging().getToken().then(token => {
        console.log("token :", token)
      })
    } else {
      console.log("Failed token status", authStatus)
    }

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });

    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });

    // Register background handler

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      // messaging().onNotificationOpenedApp(async rem=>console.log(rem))
    });

    return unsubscribe;


  }, [])

  const sendNotification = async () => {
    let notificationData = {
      title: "First Notofication",
      body: "Notification body",
      token: "fpdMa4MMRvmdl0af8gFLd7:APA91bFsZZU5Xc0o8_dT-LDdDZUX3MI05FA2jlpgBIFBs7_eqtS6nMmX1oWHftznAkeuCHRLMeimxMDxM4646OHgVSwuVyd-hlEQ8a95uhscz1Kvkz-cO7BEz3dxy8F_PzVfCMYkkL0K"
    }
    await sendSingleDeviceNotification(notificationData)
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notification</Text>
      <Button title='Send Notification' onPress={() => sendNotification()} />
    </View>
  )
}


export default App