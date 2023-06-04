import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import TabBar from './TabBar';
import DemoScreen from '../screens/DemoScreen';
import NavigateScreen from '../screens/NavigateScreen';
import { FadeInView } from './TabTransition';

let prevSelectedTab = 0;
let currSelectedTab = 0;

const Tab = createBottomTabNavigator();

const tabCollection = [
	{ key: 'map-pin', screen: NavigateScreen},
	{ key: 'settings', screen: DemoScreen },
	// { key: 'home', screen: DemoScreen },
	// { key: 'map', screen: DemoScreen },
	// { key: 'map-pin', screen: NavigateScreen},
	// { key: 'bookmark', screen: DemoScreen },
	// { key: 'user', screen: DemoScreen },
];

const handleScreenSwitch = ({ route }) => {
	currSelectedTab = tabCollection.findIndex(obj => obj.key == route.name);
	return handleScreenTransition(
		tabCollection[currSelectedTab].screen({ name: route.name })
	);
};

const handleScreenTransition = Screen => {
	/* use direction for slide transitions */
	// const transitionDirection =
	//     currSelectedTab > prevSelectedTab ? FadeInRight : FadeInLeft;

	prevSelectedTab = currSelectedTab;
	return <FadeInView>{Screen}</FadeInView>;
};

export default function TabWrapper() {
	const screenOptions = {
		unmountOnBlur: false,
		headerShown: false,
	};
	const sceneContainerStyle = {
		backgroundColor: '#D5D9E6',
	};
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<NavigationContainer>
				<BottomSheetModalProvider>
					<Tab.Navigator
						{...{ screenOptions, sceneContainerStyle }}
						initialRouteName={tabCollection[currSelectedTab].key}
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
}
