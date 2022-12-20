import 'package:flutter/material.dart';

Widget profileTab() {
  return LayoutBuilder(
      builder: (BuildContext context, BoxConstraints constraints) {
    return Container(
      height: constraints.maxHeight - 80,
      width: constraints.maxWidth,
      decoration: const BoxDecoration(
        color: Colors.green,
      ),
      child: const Text("My Awesome Border"),
    );
  });
}
