import React, { useRef } from 'react';
import { StyleSheet, Text, View, Dimensions, Layout } from 'react-native';
import Animated, { FadeInLeft, FadeInRight } from 'react-native-reanimated';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { TabBar } from './TabBar';

const tabs = ['home', 'map', 'map-pin', 'bookmark', 'user'];
let prevSelectedTab = 0;

const DemoScreen = ({ route }) => {
	const styles = StyleSheet.create({
		screen: {
			width: '100%',
			height: '100%',
			flex: 6,
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: 'whitesmoke',
		},
		text: { color: '#222' },
	});

	const currSelectedTab = tabs.indexOf(route.name);

	const transitionDirection =
		currSelectedTab > prevSelectedTab ? FadeInRight : FadeInLeft;

	prevSelectedTab = currSelectedTab;

	return (
		<Animated.View style={styles.screen} entering={transitionDirection}>
			<Text style={styles.text}>{route.name}</Text>
		</Animated.View>
	);
};

const screenOptions = {
	unmountOnBlur: true,
	headerShown: false,
};

const sceneContainerStyle = {
	backgroundColor: 'whitesmoke',
};

export const TabWrapper = () => {
	const Tab = createBottomTabNavigator();
	return (
		<NavigationContainer>
			<View style={{ flex: 1, position: 'relative' }}>
				<Tab.Navigator
					{...{ screenOptions, sceneContainerStyle }}
					tabBar={props => <TabBar {...props} />}
				>
					<Tab.Screen name={tabs[0]} component={DemoScreen} />
					<Tab.Screen name={tabs[1]} component={DemoScreen} />
					<Tab.Screen name={tabs[2]} component={DemoScreen} />
					<Tab.Screen name={tabs[3]} component={DemoScreen} />
					<Tab.Screen name={tabs[4]} component={DemoScreen} />
				</Tab.Navigator>
			</View>
		</NavigationContainer>
	);
};
