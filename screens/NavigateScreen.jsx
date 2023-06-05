import { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import TrailMap from '../content/TrailMap';
import SearchBar from '../include/SearchBar';

export default NavigateScreen = ({onBuildingClicked}) => {
	const [mount, shouldRemount] = useState(false);
	const [controlLock, setControlLock] = useState('auto');

	let touchCount;
	let prevTouchTimestamp = 3;
	let currTouchTimestamp = 3;

	const resolveControlProps = {
		key: mount,

		onTouchStart: evt => {
			if (controlLock == 'none') {
				touchCount = evt.nativeEvent.touches.length;
				currTouchTimestamp = evt.nativeEvent.timestamp;

				const timeDifference =
					(currTouchTimestamp - prevTouchTimestamp) / 100;

				if (timeDifference > 3 && touchCount < 3) {
					setControlLock('auto');
					evt.preventDefault();
				}
			}
			prevTouchTimestamp = currTouchTimestamp;
		},
	};

	const manageControlProps = {
		pointerEvents: controlLock,

		onStartShouldSetResponderCapture: evt => {
			touchCount = evt.nativeEvent.touches.length;
			if (touchCount > 3) {
				setControlLock('none');
				evt.preventDefault();
			}
		},

		onTouchCancel: evt => {
			console.warn('A secret has been opened..');
			shouldRemount(!mount);
			setControlLock('auto');
		},
	};

	return (
		<View style={{ flex: 1, position: 'relative' }} {...manageControlProps}>
			<TrailMap onBuildingClicked={onBuildingClicked} />
			<View style={styles.searchBarContainer}>
			<SearchBar />
		</View>
	  </View>
	);
};

const styles = StyleSheet.create({
	searchBarContainer: {
	  position: 'absolute',
	  top: 45,
	  left: 10,
	  right: 10,
	  zIndex: 1, // Ensure the search bar appears on top of other elements

	},
  });
  
