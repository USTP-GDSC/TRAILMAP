import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabBar } from './TabBar';

const styles = StyleSheet.create({
	screen: {
		width: '100%',
		height: '100%',
		flex: 6,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#2f3542',
	},
	text: { color: 'white' },
});

const DemoScreen = ({ route }) => (
	<View style={styles.screen}>
		<Text style={styles.text}>{route.name}</Text>
	</View>
);

export const TabWrapper = () => {
	const Tab = createBottomTabNavigator();
	return (
		<NavigationContainer>
			<View style={{ flex: 1, position: 'relative' }}>
				<Tab.Navigator tabBar={props => <TabBar {...props} />}>
					<Tab.Screen name="home" component={DemoScreen} />
					<Tab.Screen name="map" component={DemoScreen} />
					<Tab.Screen name="map-pin" component={DemoScreen} />
					<Tab.Screen name="bookmark" component={DemoScreen} />
					<Tab.Screen name="user" component={DemoScreen} />
				</Tab.Navigator>
			</View>
		</NavigationContainer>
	);
};
