import React from 'react';
import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';

export const TabButton = ({ iconName, isCurrent }) => {
	return (
		<View
			style={{
				height: '100%',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Feather
				name={iconName}
				size={25}
				style={{ color: isCurrent ? '#2b6cb0' : '#777777' }}
			/>
		</View>
	);
};
