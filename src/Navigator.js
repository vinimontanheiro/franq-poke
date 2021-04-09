import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SCREEN} from './constants';
import {AuthContext} from './services/context';
import useAuth from './modules/hooks/useAuth';
import SignInScreen from './modules/SignIn/SignInScreen';
import ShowRoom from './modules/Home/ShowRoom';
import SignUpScreen from './modules/SignIn/SignUpScreen';

const Stack = createStackNavigator();

const Navigator = () => {
  const [authContext, {token, isSignOut}] = useAuth();

  return (
    <NavigationContainer>
      <AuthContext.Provider value={authContext}>
        {!token || isSignOut ? (
          <Stack.Navigator
            initialRouteName={SCREEN.SIGN_IN}
            headerMode="screen"
            screenOptions={{headerShown: false}}>
            <Stack.Screen name={SCREEN.SIGN_IN} component={SignInScreen} />
            <Stack.Screen name={SCREEN.SIGN_UP} component={SignUpScreen} />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator initialRouteName={SCREEN.SHOW_ROOM} headerMode="screen">
            <Stack.Screen
              screenOptions={{
                headerStyle: {
                  elevation: 0,
                  shadowOpacity: 0,
                  shadowOffset: {
                    height: 0,
                  },
                  shadowRadius: 0,
                },
              }}
              name={SCREEN.SHOW_ROOM}
              component={ShowRoom}
            />
          </Stack.Navigator>
        )}
      </AuthContext.Provider>
    </NavigationContainer>
  );
};

export default Navigator;
