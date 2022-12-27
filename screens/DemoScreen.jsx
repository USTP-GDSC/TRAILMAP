import { StyleSheet, Text, View } from 'react-native';

export default DemoScreen = ({ name }) => {
	return (
		<View style={styles.screen}>
			<Text style={styles.text}>{name}</Text>
		</View>
	);
};

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
