import 'package:flutter/material.dart';
import '../../components/trailmap_webview.dart';

Widget navigatePage() {
  return LayoutBuilder(
      builder: (BuildContext context, BoxConstraints constraints) {
    return Container(
      height: constraints.maxHeight - 80,
      width: constraints.maxWidth,
      decoration: const BoxDecoration(
        color: Colors.white,
      ),
      child: const TrailMap(),
    );
  });
}
