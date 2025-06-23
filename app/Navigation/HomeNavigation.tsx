import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '@/app/screens/HomeScreen/HomeScreen';
import BusinessListByCategoryScreen from '@/app/screens/BusinessListbyCategory/BusinessListByCategoryScreen'
import BusinessDetailsScreen from '@/app/screens/BusinessDetailsScreen/BusinessDetailsScreen';

const Stack = createStackNavigator();
const HomeNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{
        headerShown: false
    }}>
        <Stack.Screen name='home' component={HomeScreen}/>
        <Stack.Screen name='business-list' component={BusinessListByCategoryScreen}/>
        <Stack.Screen name='business-detail'component={BusinessDetailsScreen}/>
    </Stack.Navigator>
  )
}

export default HomeNavigation;