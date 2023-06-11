import { useState, useLayoutEffect, useEffect, forwardRef } from 'react';
import { StyleSheet, Text, View, Button, Keyboard, KeyboardAvoidingView } from 'react-native';
import { useAssets, Asset } from 'expo-asset';
import { WebView } from 'react-native-webview';
import { useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import jsondata from '../assets/data.json';
import SearchBar from '../include/SearchBar';
import SearchDropdown from '../include/SearchDropdown';


export default NavigateScreen = forwardRef(({ onBuildingClicked }, ref) => {



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

	
	const SheetBuildingInfo = (name, bldgno) => {
		
		const infoStyle = StyleSheet.create({
		  container: {
			backgroundColor: '#D2EEFF',
			paddingVertical: 10,
			paddingHorizontal: 15,
			flexDirection: 'row',
			alignItems: 'center',
			borderRadius: 12,
			height: 80,
		  },
		  supheader: {
			fontSize: 12,
			color: 'grey',
		  },
		  header: {
			fontSize: 15,
			fontWeight: 'bold',
		  },
		  iconBody: {
			backgroundColor: '#3182CE',
			borderRadius: 45,
			width: 45,
			height: 45,
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
		  },
		  information: {
			marginLeft: 12,
			// borderWidth: 2,
			// borderColor: 'green',
			flex: 1,
			justifyContent: 'center',
		  },
		  textContainer: {
			justifyContent: 'center',
			flex: 1,
		  },
		});
	  
		return (
		  <View style={infoStyle.container}>
			<View style={infoStyle.iconBody}>
			  <Icon name="map-pin" size={24} color="#ffffff" />
			</View>
			<View style={infoStyle.information}>
			  <View style={infoStyle.textContainer}>
				{
					bldgno !== undefined &&
					<Text style={infoStyle.supheader}>Building {bldgno}</Text>
				}
				<Text style={infoStyle.header} numberOfLines={2}>
				  {name}
				</Text>
			  </View>
			</View>
		  </View>
		);
	};

	const SheetRoomInfo = (rooms) => {
		const infoStyle = StyleSheet.create({
		  container: {
			backgroundColor: '#D2EEFF',
			padding: 20,
			borderRadius: 12,
			marginTop: 20,
		  },
		  supheader: {
			fontSize: 12,
			color: 'grey',
		  },
		  header: {
			fontSize: 15,
			fontWeight: 'bold',
		  },
		  iconBody: {
			backgroundColor: '#38A169',
			borderRadius: 45,
			width: 45,
			height: 45,
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
		  },
		  information: {
			marginLeft: 12,
			flex: 1,
			justifyContent: 'center',
		  },
		  textContainer: {
			justifyContent: 'center',
			flex: 1,
		  },
		  floorHeader: {
			fontSize: 17,
			fontWeight: 'bold',
			marginBottom: 5,
		  },
		  roomName: {
			fontSize: 12,
			marginBottom: 2,
		  },
		});

		const floorIdToNameMap = {
			f1: '1st Floor',
			f2: '2nd Floor',
			f3: '3rd Floor',
			f4: '4th Floor',
			f5: '5th Floor',
			f6: '6th Floor',
			f7: '7th Floor',
			f8: '8th Floor',
			f9: '9th Floor',
		};
	  
		return (
		  <View>
			{Object.keys(rooms).map(floor => (
			  <View key={floor} style={infoStyle.container}>
				<Text style={infoStyle.floorHeader}>{floorIdToNameMap[floor]}</Text>
				{rooms[floor].map(room => (
					<Text key={room} style={infoStyle.roomName}>{room}</Text>
				))}
			  </View>
			))}
		  </View>
		);
	  };
	  
	const handleWebviewMessage = event => {	  	  

		if (event.nativeEvent.data.startsWith("onBuildingClick")) {

			const key = event.nativeEvent.data.substr(17);
			const name = jsondata[key].name.replace(/\[.*?\]/g, '').trim();
			const bldgno = jsondata[key].no;
			const rooms = jsondata[key].rooms;

			(rooms === undefined) 
				? onBuildingClicked(SheetBuildingInfo(name, bldgno))
				: onBuildingClicked(SheetBuildingInfo(name, bldgno), SheetRoomInfo(rooms));
		}
	};

	// handle when webview is focused
	const handleWebviewTouch = () => {
		// Perform actions when clicking outside the search bar and search dropdown

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

		ref,
		source: { html },
		onMessage: handleWebviewMessage,		
		onTouchStart: handleWebviewTouch
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
		// console.log('NavigateScreen is no longer focused');
  
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
		if (searchResults.length > 0) 
			setDropdownShown(true);
	}

	// handle when dropdown item clicked
	const handleItemClicked = (keyid) => {
		if (ref.current) {
			ref.current.injectJavaScript(
				`control.setLookAt(..._Coordinates["${keyid}"], true);`);
			
			onBuildingClicked(SheetBuildingInfo(keyid));

			if (isDropdownShown)	
				setDropdownShown(false);

			if (Keyboard.isVisible()) 
				Keyboard.dismiss();
		}
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
			// console.warn('A secret has been opened..');
			shouldRemount(!mount);
			setControlLock('auto');
		},
	};

	return (
		<KeyboardAvoidingView style={styles.container} behavior="height">
		

			<View style={styles.webviewContainer}>
				<WebView {...webViewProps} />
			</View>


			<View style={styles.searchBarContainer}>

				<SearchBar
				_DATA={jsondata}
				onSearchResults={handleSearchResults}
				onSearchCleared={handleSearchCleared}
				onSearchFocused={handleSearchFocused}
				/>

				{isDropdownShown && <SearchDropdown _RESULTS={searchResults} onItemClicked={handleItemClicked} />}
			</View>

			
    	</KeyboardAvoidingView>

	);
});

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
  
