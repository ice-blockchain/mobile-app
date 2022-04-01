import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Intro from 'src/screens/KYC/Intro';
import CheckEmail from 'src/screens/KYC/CheckEmail';
import ClaimNickname from 'src/screens/KYC/ClaimNickname';
import Invite from 'src/screens/KYC/Invite';
import Welcome from 'src/screens/KYC/Welcome';
// import WebView from 'src/screens/WebView';
import KYCGetInitialScreen from 'src/utils/KYCGetInitialScreen';

const Stack = createStackNavigator();

const screenOptions = {
  headerShown: false,
  cardStyle: {
    backgroundColor: 'white',
  },
  ...TransitionPresets.SlideFromRightIOS,
};

function Signup() {
  const initial = KYCGetInitialScreen();
  return (
    <Stack.Navigator screenOptions={screenOptions} initialRouteName={initial}>
      <Stack.Screen name="Intro" component={Intro} />
      <Stack.Screen name="CheckEmail" component={CheckEmail} />
      <Stack.Screen name="ClaimNickname" component={ClaimNickname} />
      <Stack.Screen name="Invite" component={Invite} />
      <Stack.Screen name="Welcome" component={Welcome} />
    </Stack.Navigator>
  );
}

export default function KYC() {
  return (
    <Stack.Navigator
      screenOptions={{
        ...screenOptions,
        ...TransitionPresets.ModalSlideFromBottomIOS,
      }}>
      <Stack.Screen name="Signup" component={Signup} />
      {/* <Stack.Screen name="WebView" component={WebView} /> */}
    </Stack.Navigator>
  );
}
