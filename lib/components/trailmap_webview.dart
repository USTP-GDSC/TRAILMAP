import 'dart:io';
import 'package:flutter/material.dart';
import 'package:webview_flutter_plus/webview_flutter_plus.dart';

class TrailMap extends StatefulWidget {
  const TrailMap({super.key});

  @override
  State<TrailMap> createState() => _TrailMapState();
}

class _TrailMapState extends State<TrailMap> {
  @override
  void initState() {
    if (Platform.isAndroid) {
      WebViewPlus.platform = SurfaceAndroidWebView();
    }
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return const WebViewPlus(
      initialUrl: 'assets/sketch/trailmap.html',
      javascriptMode: JavascriptMode.unrestricted,
    );
  }
}
