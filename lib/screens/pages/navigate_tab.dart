import 'package:flutter/material.dart';

Widget navigateTab() {
  return LayoutBuilder(
      builder: (BuildContext context, BoxConstraints constraints) {
    return Container(
      height: constraints.maxHeight - 80,
      width: constraints.maxWidth,
      decoration: BoxDecoration(
        color: Colors.deepPurple,
      ),
      child: const Text("My Awesome Border"),
    );
  });
}
