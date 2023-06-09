import { useState, useLayoutEffect, useEffect } from 'react';
import { StyleSheet, Text, View, Keyboard, KeyboardAvoidingView } from 'react-native';
import { useAssets, Asset } from 'expo-asset';
import { WebView } from 'react-native-webview';
import { useIsFocused } from '@react-navigation/native';

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
	const [isDropdownShown, setDropdownShown] = useState(false);
	// const [isKeyboardVisible, setKeyboardVisible] = useState(false);


	const isFocused = useIsFocused();

	useEffect(() => {
	  if (!isFocused) {
		// Perform actions when the NavigateScreen is no longer focused
		console.log('NavigateScreen is no longer focused');
  
		// Example actions:
		// - Reset some state
		// - Clear search results
  
		// To reset state or clear search results, update the state or perform any desired action
		// setControlLock('auto');
		// setSearchResults([]);
	  }
	}, [isFocused]);

	

	// handle search results to dropdown
	const handleSearchResults = (results) => {
		if (results.length > 0) 
			setDropdownShown(true);
		setSearchResults(results);
	};

	// handle when search is cleared
	const handleSearchCleared = () => {
		setSearchResults([]);
		setDropdownShown(false);
	}

	// handle when search is focused
	const handleSearchFocused = () => {
		console.log('yow na click ang search');
		if (searchResults.length > 0) 
			setDropdownShown(true);
	}

	// handle when webview is focused
	const handleWebviewTouch = () => {
		// Perform actions when clicking outside the search bar and search dropdown
		console.log('Clicked outside');

		// Example actions:
		// - Hide the search dropdown
		// - Dismiss the keyboard
	
		// To hide the search dropdown, update the state or perform any desired action
		if (isDropdownShown)	
			setDropdownShown(false);

		// To dismiss the keyboard, you can use the Keyboard.dismiss() method from 'react-native'
		if (Keyboard.isVisible()) 
			Keyboard.dismiss();
	}


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
		<KeyboardAvoidingView style={styles.container} behavior="height">
			<View style={styles.webviewContainer}>
				<WebView {...webViewProps} onTouchStart={handleWebviewTouch} 
				
				injectedJavaScript={`
							// JavaScript code that will be executed in the WebView
							// You can use window.ReactNativeWebView.postMessage() to send messages back to React Native
						`}
				/>
			</View>

			<View style={styles.searchBarContainer}>
				<SearchBar
				_DATA={jsondata}
				onSearchResults={handleSearchResults}
				onSearchCleared={handleSearchCleared}
				onSearchFocused={handleSearchFocused}
				/>

				{isDropdownShown && <SearchDropdown _RESULTS={searchResults} />}
			</View>
    	</KeyboardAvoidingView>

	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	webviewContainer: {
		flex: 1,
		backgroundColor: '#D5D9E6',
	},
	searchBarContainer: {
	  position: 'absolute',
	  top: 45,
	  left: 10,
	  right: 10,
	  zIndex: 1, // Ensure the search bar appears on top of other elements
	},
});
  
