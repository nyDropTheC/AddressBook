import React from 'react';
import { StyleSheet, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeDisplay from './screens/HomeDisplay';
import MapDisplay from './screens/MapDisplay';

const stack = createNativeStackNavigator ( );

export default function App() {
	return (
		<NavigationContainer>
			<stack.Navigator>
				<stack.Screen name='My Places' component={ HomeDisplay }/>
				<stack.Screen name='Map View' component={ MapDisplay }/>
			</stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	},
});
