import 'package:flutter/material.dart';

class NavigateTab extends StatelessWidget {
  const NavigateTab({super.key});

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
        builder: (BuildContext context, BoxConstraints constraints) {
      return Container(
        height: constraints.maxHeight - 85,
        width: double.infinity,
        decoration: const BoxDecoration(
          color: Colors.deepPurple,
        ),
        child: const Text("My Awesome Border"),
      );
    });
  }
}
