import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SplashScreen from './SplashScreen';
import HomeScreen from './HomeScreen';
import SearchScreen from './SearchScreen';
import DetailsScreen from './DetailsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Search" component={SearchScreen} />
  </Tab.Navigator>
);

export default function App() {
  const [isSplashDone, setIsSplashDone] = useState(false);

  // Navigate after a delay to simulate splash screen duration
  useEffect(() => {
    setTimeout(() => {
      setIsSplashDone(true);
    }, 3000); // Show splash for 3 seconds
  }, []);

  if (!isSplashDone) {
    return <SplashScreen />; // Show SplashScreen while isSplashDone is false
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
