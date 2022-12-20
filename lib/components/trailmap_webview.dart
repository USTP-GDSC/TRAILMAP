import 'dart:io'; // Add this import.
import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

class TrailMap extends StatefulWidget {
  const TrailMap({super.key});

  @override
  State<TrailMap> createState() => _TrailMapState();
}

class _TrailMapState extends State<TrailMap> {
  @override
  void initState() {
    if (Platform.isAndroid) {
      WebView.platform = SurfaceAndroidWebView();
    }
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return const WebView(
      initialUrl: 'https://flutter.dev',
      javascriptMode: JavascriptMode.unrestricted,
    );
  }
}
