import 'dart:async';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_inappwebview/flutter_inappwebview.dart';
import 'package:url_launcher/url_launcher.dart';

// class TrailMap extends StatefulWidget {
//   const TrailMap({super.key});

//   @override
//   State<TrailMap> createState() => _TrailMapState();
// }

// class _TrailMapState extends State<TrailMap> {
//   InAppWebViewSettings settings = InAppWebViewSettings(

//       // // Keeping these off is less critical but still a good idea, especially if your app is not
//       // // using file:// or content:// URLs.
//       // allowFileAccess: false,
//       // allowContentAccess: false,

//       supportZoom: false,
//       builtInZoomControls: false,
//       verticalScrollBarEnabled: false,
//       horizontalScrollBarEnabled: false,
//       useHybridComposition: true,
//       hardwareAcceleration: true,

//       // Basic WebViewAssetLoader with custom domain
//       webViewAssetLoader: WebViewAssetLoader(
//           httpAllowed: true,
//           domain: "my.custom.domain.com",
//           pathHandlers: [AssetsPathHandler(path: '/assets/')]));

//   @override
//   Widget build(BuildContext context) {
//     return Expanded(
//         child: InAppWebView(
//       initialUrlRequest: URLRequest(
//           url: WebUri(
//               "https://my.custom.domain.com/assets/flutter_assets/assets/test.html")),
//       initialSettings: settings,
//     ));
//   }
// }

class TrailMap extends StatefulWidget {
  const TrailMap({super.key});

  @override
  State<TrailMap> createState() => _TrailMapState();
}

class _TrailMapState extends State<TrailMap> {
  InAppWebViewSettings settings = InAppWebViewSettings(
    supportZoom: false,
    builtInZoomControls: false,
    verticalScrollBarEnabled: false,
    horizontalScrollBarEnabled: false,
    useHybridComposition: true,
    hardwareAcceleration: true,
  );

  @override
  Widget build(BuildContext context) {
    return InAppWebView(
      initialUrlRequest:
          URLRequest(url: WebUri("http://localhost:8080/trailmap.html")),
      initialSettings: settings,
      onWebViewCreated: (controller) {},
      onLoadStart: (controller, url) {},
      onLoadStop: (controller, url) {},
    );
  }
}
