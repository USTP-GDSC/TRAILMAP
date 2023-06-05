import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	Dimensions,
	Animated,
	StyleSheet,
} from 'react-native';

import TabSheet from './TabSheet';
import TabButton from './TabButton';

export default TabBar = ({ state, descriptors, navigation, sheetbody}) => {
	const [translateValue] = useState(new Animated.Value(0));
	const totalWidth = Dimensions.get('window').width;
	const tabWidth = totalWidth / state.routes.length;

	const animateSlider = index => {
		Animated.spring(translateValue, {
			toValue: index * tabWidth,
			velocity: 10,
			useNativeDriver: true,
		}).start();
	};

	useEffect(() => {
		animateSlider(state.index);
	}, [state.index]);

	return (
		<>
			<TabSheet>{sheetbody}</TabSheet>
			<View style={[style.tabContainer, { width: totalWidth }]}>
				<View style={{ flexDirection: 'row' }}>
					<Animated.View
						style={[
							style.slider,
							{
								transform: [{ translateX: translateValue }],
								width: tabWidth,
							},
						]}
					/>

					{state.routes.map((route, index) => {
						const { options } = descriptors[route.key];
						const label =
							options.tabBarLabel !== undefined
								? options.tabBarLabel
								: options.title !== undefined
								? options.title
								: route.name;

						const isFocused = state.index === index;

						const onPress = () => {
							const event = navigation.emit({
								type: 'tabPress',
								target: route.key,
								canPreventDefault: true,
							});

							if (!isFocused && !event.defaultPrevented) {
								navigation.navigate(route.name);
							}

							animateSlider(index);
						};

						return (
							<TouchableOpacity
								accessibilityRole="button"
								accessibilityStates={
									isFocused ? ['selected'] : []
								}
								accessibilityLabel={
									options.tabBarAccessibilityLabel
								}
								testID={options.tabBarTestID}
								onPress={onPress}
								style={{ flex: 1 }}
								key={index}
							>
								<TabButton
									iconName={label.toString()}
									isCurrent={isFocused}
								/>
							</TouchableOpacity>
						);
					})}
				</View>
			</View>
		</>
	);
};

const style = StyleSheet.create({
	tabContainer: {
		backgroundColor: 'whitesmoke',
		borderTopLeftRadius: 12,
		borderTopRightRadius: 12,
		position: 'absolute',
		bottom: 0,
		height: 80,

		shadowOpacity: 0.1,
		shadowRadius: 4.0,
		elevation: 10,
		shadowOffset: {
			width: 0,
			height: -1,
		},
	},
	slider: {
		height: 4,
		borderRadius: 10,
		backgroundColor: '#2b6cb0',
		position: 'absolute',
		bottom: 0,
	},
});
