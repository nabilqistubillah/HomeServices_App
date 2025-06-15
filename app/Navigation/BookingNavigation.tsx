import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import BookingScreen from '../screens/BookingScreen/BookingScreen';
import BusinessDetailsScreen from '../screens/BusinessDetailsScreen/BusinessDetailsScreen';

const Stack = createStackNavigator();

export default function BookingNavigation() {
  return (
    <Stack.Navigator screenOptions={{
        headerShown: false
    }}>
        <Stack.Screen name='booking' component={BookingScreen}/>

        <Stack.Screen name='business-detail' component={BusinessDetailsScreen}/>
    </Stack.Navigator>
)}
