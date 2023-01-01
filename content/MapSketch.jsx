import { useState } from 'react';
import { useAssets, Asset } from 'expo-asset';
import { WebView } from 'react-native-webview';

export default MapSketch = () => {
	const [html, loadHTML] = useState('');
	const [isMount, setMount] = useState(false);

	const componentDidMount = async () => {
		if (!isMount) setMount(true);
		else return;

		const assets = {
			world: 'wip',
		};

		const scripts = [
			require('../assets/sketch/library/Three.jsr'),
			require('../assets/sketch/library/Control.jsr'),
			require('../assets/sketch/library/Loader.jsr'),
			require('../assets/sketch/Map.jsr'),
		];

		let bundle = '';
		for await (let value of scripts) {
			value = Asset.fromModule(value);
			value = await fetch(value.uri);
			value = await value.text();

			bundle += value;
		}

		loadHTML(
			`
			<!DOCTYPE html>
			<html>
				<head>
					<meta charset="utf-8" />
					<meta
						name="viewport"
						content="width=device-width, 
						user-scalable=no, 
						minimum-scale=1.0, 
						maximum-scale=1.0"
					/>
					<style>
						body {
							padding: 0;
							margin: 0;
							position: fixed;
						}
					</style>
				</head>
				
				<script type="module">
					const _ASSETS = ${JSON.stringify(assets)};

					window.addEventListener('touchstart', () => {
						window.ReactNativeWebView.postMessage('hello');
					});

					${bundle}
				</script>
			</html>
			`
		);
	};

	const handleListener = event => {
		console.log(event.nativeEvent.data);
	};

	const props = {
		style: { backgroundColor: '#2f3542' },

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
		onLoad: componentDidMount,
		onMessage: handleListener,
	};

	return <WebView {...props} />;
};
