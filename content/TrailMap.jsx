import { useState, useLayoutEffect } from 'react';
import { useAssets, Asset } from 'expo-asset';
import { WebView } from 'react-native-webview';

export default TrailMap = () => {
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
		onMessage: handleListener,
	};

	return <WebView {...props} />;
};
