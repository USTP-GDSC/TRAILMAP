import Animated, { FadeInLeft, FadeInRight } from 'react-native-reanimated';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import TabBar from './TabBar';
import DemoScreen from '../screens/DemoScreen';

const tabKeys = ['home', 'map', 'map-pin', 'bookmark', 'user'];
let prevSelectedTab = 0;
let currSelectedTab = 2;

const screenOptions = {
	unmountOnBlur: true,
	headerShown: false,
};

const sceneContainerStyle = {
	backgroundColor: '#2f3542',
};

const handleScreenSwitch = index => (currSelectedTab = index);

const handleScreenTransition = () => {
	const transitionDirection =
		currSelectedTab > prevSelectedTab ? FadeInRight : FadeInLeft;

	prevSelectedTab = currSelectedTab;

	return (
		<Animated.View entering={transitionDirection} style={{ flex: 1 }}>
			<DemoScreen name={tabKeys[currSelectedTab]} />
		</Animated.View>
	);
};

export default TabWrapper = () => {
	const Tab = createBottomTabNavigator();
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<NavigationContainer>
				<BottomSheetModalProvider>
					<Tab.Navigator
						{...{ screenOptions, sceneContainerStyle }}
						initialRouteName={tabKeys[currSelectedTab]}
						tabBar={props => (
							<TabBar
								{...props}
								handleScreen={handleScreenSwitch}
							/>
						)}
					>
						{tabKeys.map(tabKey => (
							<Tab.Screen
								key={tabKey}
								name={tabKey}
								component={handleScreenTransition}
							/>
						))}
					</Tab.Navigator>
				</BottomSheetModalProvider>
			</NavigationContainer>
		</GestureHandlerRootView>
	);
};
