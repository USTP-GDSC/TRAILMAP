import { useState, useLayoutEffect, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Keyboard } from 'react-native';
import { useAssets, Asset } from 'expo-asset';
import { WebView } from 'react-native-webview';

import jsondata from '../assets/data.json';
import SearchBar from '../include/SearchBar';
import SearchDropdown from '../include/SearchDropdown';

export default NavigateScreen = ({onBuildingClicked}) => {



	/*manage webview*/
	const [html, loadHTML] = useState(``);

	const [scripts] = useAssets([
		require(`../assets/sketch/library/Three.jsr`),
		require(`../assets/sketch/library/Control.jsr`),
		require(`../assets/sketch/library/Loader.jsr`),
		require(`../assets/sketch/_preload.jsr`),
		require(`../assets/sketch/_initialize.jsr`),
		require(`../assets/sketch/_animate.jsr`),
	]);

		useLayoutEffect(() => {
		if (html || !scripts) return;

		loadHTML(
			`
			<!DOCTYPE html>
			<html>
			<head>
				<meta charset="utf-8" />
				<meta 
					name="viewport" 
					content="width=device-width, 
							initial-scale=1.0" />
				<style>
					html,
					body {
						margin: 0;
						padding: 0;
						position: fixed;
					}
				</style>
			</head>
			<body>
				${scripts.map(
					(o) => `<script type="text/javascript" src="${o.localUri}"></script>`)
					.join('\n')
				}
			</body>
			</html>
			`
		);
	});

	const handleListener = event => {
		if (event.nativeEvent.data.startsWith("onBuildingClick")) {
			onBuildingClicked(<Text>{event.nativeEvent.data.substr(17)}</Text>);
		}
	};

	const webViewProps = {
		style: { backgroundColor: '#D5D9E6' },

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

		source: { html },
		onMessage: handleListener,		
	};




	/*manage this screen*/
	const [mount, shouldRemount] = useState(false);
	const [controlLock, setControlLock] = useState('auto');
	const [searchResults, setSearchResults] = useState([]);
	// const [isDropdowShown, setDropdownShown] = useState(false);
	// const [isKeyboardVisible, setKeyboardVisible] = useState(false);

	
	
	


	// handle search results to dropdown
	const handleSearchResults = (results) => {
		// if (results.length > 0) setDropdownShown(true);
		setSearchResults(results);
	};

	// handle when search is cleared
	const handleSearchCleared = () => {
		setSearchResults([]);
		setDropdownShown(false);
	}

	// handle when search is focused
	// const handleSearchFocused = () => {
	// 	if (searchResults.length !== 0) setDropdownShown(true);
	// 	console.log('saghalskgjlkjsdfk');
	// }

	// handle when webview is focused
	// const handleWebviewTouch = () => {
	// 	console.log('webview was clicked');

	// 	if (isDropdowShown) setDropdownShown(false);
	// 	// if (isKeyboardVisible) Keyboard.dismiss();
	// }

	// useEffect(() => {
	// 	const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
	// 	  setKeyboardVisible(true);
	// 	});
	// 	const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
	// 	  setKeyboardVisible(false);
	// 	});
	  
	// 	return () => {
	// 	  keyboardDidShowListener.remove();
	// 	  keyboardDidHideListener.remove();
	// 	};
	//   }, []);

	// handle buggy touch cancel
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
		<View style={{ flex: 1, position: 'relative' }} /*{ ...manageControlProps }*/ >
			<WebView {...webViewProps} 
			// onTouchStart={handleWebviewTouch}
				injectedJavaScript={`
					// JavaScript code that will be executed in the WebView
					// You can use window.ReactNativeWebView.postMessage() to send messages back to React Native
				`}
			/>
			
			<View style={styles.searchBarContainer}>
				<SearchBar 
					_DATA={jsondata} 
					onSearchResults={handleSearchResults}
					onSearchCleared={handleSearchCleared}
					// onSearchFocused={handleSearchFocused}
				/>

				{searchResults.length !== 0 ? (
					<SearchDropdown _RESULTS={searchResults} />
				): <></>}
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
  
