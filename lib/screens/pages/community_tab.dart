import 'package:flutter/material.dart';

Widget communityTab() {
  return LayoutBuilder(
      builder: (BuildContext context, BoxConstraints constraints) {
    return Container(
      height: constraints.maxHeight - 80,
      width: constraints.maxWidth,
      decoration: const BoxDecoration(
        color: Colors.orange,
      ),
      child: const Text("My Awesome Border"),
    );
  });
}
