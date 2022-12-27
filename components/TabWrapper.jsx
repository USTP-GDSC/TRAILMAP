import Animated, { FadeInLeft, FadeInRight } from 'react-native-reanimated';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import TabBar from './TabBar';
import DemoScreen from '../screens/DemoScreen';
import NavigateScreen from '../screens/NavigateScreen';

let prevSelectedTab = 0;
let currSelectedTab = 2;

const tabCollection = [
	{ key: 'home', screen: DemoScreen },
	{ key: 'map', screen: DemoScreen },
	{ key: 'map-pin', screen: NavigateScreen },
	{ key: 'bookmark', screen: DemoScreen },
	{ key: 'user', screen: DemoScreen },
];

const handleScreenSwitch = ({ route }) => {
	currSelectedTab = tabCollection.findIndex(obj => obj.key == route.name);
	return handleScreenTransition(
		tabCollection[currSelectedTab].screen({ name: route.name })
	);
};

const handleScreenTransition = Screen => {
	const transitionDirection =
		currSelectedTab > prevSelectedTab ? FadeInRight : FadeInLeft;

	prevSelectedTab = currSelectedTab;

	return (
		<Animated.View entering={transitionDirection} style={{ flex: 1 }}>
			{Screen}
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
						initialRouteName={tabCollection.keys[currSelectedTab]}
						tabBar={props => <TabBar {...props} />}
					>
						{tabCollection.map(obj => (
							<Tab.Screen
								key={obj.key}
								name={obj.key}
								component={handleScreenSwitch}
							/>
						))}
					</Tab.Navigator>
				</BottomSheetModalProvider>
			</NavigationContainer>
		</GestureHandlerRootView>
	);
};

const screenOptions = {
	unmountOnBlur: false,
	headerShown: false,
};

const sceneContainerStyle = {
	backgroundColor: '#2f3542',
};
