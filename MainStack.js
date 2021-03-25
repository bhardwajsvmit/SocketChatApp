import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import Join from './Join';
import Chat from './Chat';


const Stack = createStackNavigator();


const MainStack = () => {
    return (
        <Stack.Navigator>
        <Stack.Screen name="Join" component={Join} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    )
}


export default MainStack
