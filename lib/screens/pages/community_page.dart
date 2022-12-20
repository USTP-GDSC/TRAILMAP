import 'package:flutter/material.dart';

Widget communityPage() {
  return LayoutBuilder(
      builder: (BuildContext context, BoxConstraints constraints) {
    return Container(
      height: constraints.maxHeight - 80,
      width: constraints.maxWidth,
      decoration: const BoxDecoration(
        color: Colors.white,
      ),
      child: const Text("My Awesome Border"),
    );
  });
}
