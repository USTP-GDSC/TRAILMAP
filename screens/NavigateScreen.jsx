import { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default NavigateScreen = ({ name }) => {
	const [myText, setMyText] = useState(name);

	return (
		<View style={styles.screen}>
			<Text style={styles.text}>{myText}</Text>
			<Button
				onPress={() => setMyText('bruh')}
				title="Learn More"
				color="#841584"
				accessibilityLabel="Learn more about this purple button"
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#2f3542',
	},
	text: { color: 'white' },
});
