import { useState } from 'react';
import { View } from 'react-native';

import MapSketch from '../content/MapSketch';

export default NavigateScreen = () => {
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
		<View style={{ flex: 1 }} {...resolveControlProps}>
			<View style={{ flex: 1 }} {...manageControlProps}>
				<MapSketch />
			</View>
		</View>
	);
};
