import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import { readAsStringAsync } from 'expo-file-system';
import { useAssets } from 'expo-asset';

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
			console.warn('You found a bug!');
			shouldRemount(!mount);
			setControlLock('auto');
		},
	};

	const IndexHTML = require('../assets/sketch/index.html');
	const [index, indexLoadingError] = useAssets(IndexHTML);

	const [html, setHtml] = useState('');

	if (index) {
		readAsStringAsync(index[0].localUri).then(data => {
			setHtml(data);
		});
	}

	const webViewProps = {
		bounces: false,
		scrollEnabled: false,
		overScrollMode: 'never',
		javaScriptEnabled: true,
		setBuiltInZoomControls: false,
		androidLayerType: 'hardware',

		originWhitelist: ['*'],
		allowFileAccess: true,
		domStorageEnabled: true,
		mixedContentMode: 'always',
		allowUniversalAccessFromFileURLs: true,

		key: shouldRemount,
		source: { html },
	};

	return (
		<View style={{ flex: 1 }} {...resolveControlProps}>
			<View style={{ flex: 1 }} {...manageControlProps}>
				<WebView
					style={{ backgroundColor: '#2f3542' }}
					{...webViewProps}
				/>
			</View>
		</View>
	);
};
