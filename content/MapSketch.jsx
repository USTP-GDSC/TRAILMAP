import { useState, useLayoutEffect } from 'react';
import { useAssets, Asset } from 'expo-asset';
import { WebView } from 'react-native-webview';

export default MapSketch = () => {
	const [sketch, loadSketch] = useState(``);

	const [assets] = useAssets([require(`../assets/sketch/model/world.gltf`)]);

	const [scripts] = useAssets([
		require(`../assets/sketch/library/Three.jsr`),
		require(`../assets/sketch/library/Control.jsr`),
		require(`../assets/sketch/library/Loader.jsr`),
		require(`../assets/sketch/Sketch.jsr`),
	]);

	useLayoutEffect(() => {
		if (sketch || !scripts || !assets) return;

		loadSketch(
			`
			<!DOCTYPE html>
			<html>
			<head>
				<meta charset="UTF-8" />
				<meta http-equiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</head>
			<body>
				<script>
					_ASSETS = {
						WORLD: '${assets[0].localUri}',
					}

					window.addEventListener('touchstart', () => {
						window.ReactNativeWebView.postMessage('hello');
					});
					
				</script>
				${scripts
					.map(
						info =>
							`<script type="text/javascript" src="${info.localUri}"></script>`
					)
					.join('\n')}
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

		source: { html: sketch },
		onMessage: handleListener,
	};

	return <WebView {...props} />;
};
